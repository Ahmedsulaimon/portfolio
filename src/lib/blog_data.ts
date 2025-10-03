
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "auto-pr-review-assistant",
    title: "Automating Code Reviews with AI and Distributed Systems",
    date: "2025-10-03", 
    author: "Ahmed Sulaimon",
    content:`

# Auto PR Review Assistant — design, deployment, and lessons (first-person)

I built the **Auto PR Review Assistant** to automate the first-pass review of GitHub pull requests. The project grew from a single-process prototype into a multi-tenant microservice stack with deployment, packaging, and production-hardening workstreams. Below I describe the core problem I hit, the design I implemented, operational choices, and what I learned.

---

## TL;DR

- I moved from a single shared Redis queue to namespaced keys by **installation_id** (**pr-review-queue:<id>**, **pr-review-history:<id>**) to eliminate data leakage and make per-tenant retention/pruning simple.  
- I implemented a small **“wake”** keep-alive pattern to help keep worker instances alive on hosts that aggressively spin down idle services.  
- The system is split into a FastAPI webhook listener, a review worker, and a CLI. The CLI is packaged for PyPI and publishing is automated via GitHub Actions + OIDC.

---

## The problem I started with

At first I used global Redis keys:

- **pr-review-queue**  
- **pr-review-history**

That worked locally but failed as the app gained multiple installations:

1. **Cross-tenant data leakage** — jobs and histories from different GitHub App installations mixed together, exposing other users’ reviews.  
2. **Operational scale & hygiene** — a single global list made pruning, debugging, and per-tenant policies hard.

Also, hosting a continuously running worker on free managed platforms proved unreliable: instances would spin down when idle and new jobs would sit unprocessed.

---

## My solution: namespaced Redis + microservices

The fix was straightforward: namespace Redis keys by GitHub App **installation_id**.

**Key patterns**

- Queue: **pr-review-queue:<installation_id>**  
- History: **pr-review-history:<installation_id>**

**Request flow**

1. GitHub → FastAPI webhook listener (validates signature).  
2. Listener extracts **installation.id** and **LPUSH**es a job into **pr-review-queue:<installation_id>**.  
3. Review worker BRPOP(s) the installation-specific queue, fetches PR metadata/diffs, calls the LLM, posts comments, and appends history to **pr-review-history:<installation_id>**.

**Benefits**

- Strong tenant isolation — no mixed history.  
- Easier pruning and per-installation retention.  
- Clearer logs and easier troubleshooting (keys map directly to an installation).

---

## Hosting & the worker keep-alive pattern

To run a worker on free tiers (that don’t offer persistent background workers) I used a pragmatic approach:

- Deploy the review engine as a FastAPI web service (binds a port so it’s allowed by hosts).  
- Launch the worker loop as an async background task on FastAPI startup.  
- Add a small **wake**/keep-alive endpoint. The webhook listener calls or pings this endpoint after enqueueing a job so the service receives traffic and stays alive long enough to process jobs.

This is a cost-conscious trade-off — it works well enough for demos and low usage, but for production I recommend a host that supports long-running workers or a paid worker plan.

---

## GitHub App auth: JWTs and installation tokens

GitHub App auth required care:

- The App private key must be PEM-formatted. When stored in env vars I convert **\n** sequences back into real newlines before using PyJWT.  
- I generate a short-lived JWT (≤10m) for the App, then exchange it for an **installation access token** per installation.  
- Installation tokens expire, so I refresh tokens and retry on 401 responses.

Add logging and retries around token creation and API calls — that made the workflow much more robust.

---

## LLM integration: prompting and parsing

AI is the interesting part, but it’s also noisy. My approach:

- Prompt the model to return **JSON-only** in a concrete schema (file, line, comment).  
- Use a resilient parser that accepts a few JSON shapes and safely no-ops on malformed output.  
- Split large PR diffs into smaller chunks and rate-limit requests to control quota usage.

This makes downstream processing predictable and reduces failure modes from unexpected model output.

---

## CLI & packaging

The CLI offers these commands:

- **pr-review list-prs** — list recent analyzed PRs (per installation).  
- **pr-review show-pr <id>** — show details and AI comments.  
- **pr-review recheck-pr <id>** — requeue a PR for re-review.

I store **API_URL** and **installation_id** in **~/.pr-review/config.json** for a frictionless UX. The CLI is packaged and the release workflow uses GitHub Actions + OIDC to publish to PyPI securely (no long-lived PyPI tokens in the repo).

---

## Testing, CI/CD & observability

- **Unit tests** (pytest) with mocks for Redis, GitHub, and the LLM keep tests fast and deterministic.  
- **CI** uses GitHub Actions to run tests and packaging steps.  
- **Observability**: services expose **/health** and emit structured logs; adding metrics or Sentry would be a straightforward next step.

---

## Small but important engineering bits

- Fixed PEM encoding issues for private keys stored in envs.  
- Recheck logic reuses the **installation_id** from history so users don’t need to supply it again.  
- Interactive CLI setup lets users save **installation_id** to the config file during first run.  
- Namespacing is a light-weight multi-tenant model that can be upgraded to stronger isolation (separate Redis DBs or instances) if needed.

---

## What I’d improve next

- Protect the query API with authentication so only installation owners can access their history.  
- Add a compact web dashboard for browsing reviews (better UX than CLI alone).  
- Explore Redis Streams or consumer groups for robust horizontal scaling.  
- Harden posting-idempotency and backoff to avoid duplicate comments.

---

## Closing thoughts

Small design choices can have big outcomes. Namespacing Redis keys by **installation_id** fixed security and scaling issues early. Operational realities (free-host spin-down) forced pragmatic trade-offs — the wake endpoint is one such pattern that kept things usable at low cost. Finally, integrating APIs and LLMs taught me the value of strict output contracts, defensive parsing, and strong observability.

If you want to try the GitHub App, install it here:  
https://github.com/apps/auto-pr-review-assistant/installations/new

    `.trim(),
  },
  {
    slug: "microservices-and-ml",
    title: "Building an application with Microservices and Machine Learning",
    date: "2025-05-07",
    author: "Ahmed Sulaimon",
    content: `
Developing a production-grade application that combines microservices architecture with machine learning was both a technical challenge and a rewarding learning experience. This post outlines my process of designing and implementing a real-time grocery price comparison tool covering the vision, system architecture, ML integration, CI/CD & DevOps, challenges, Technical Decisions & Trade-offs, What I’d Improve and key takeaways.

---

### 1. The Vision

The goal was to build a platform that empowers users to make smarter grocery decisions by:

- Tracking historical and real-time price trends  
- Offering predictive insights into future price drops  
- Recommending the best times to buy products based on statistical confidence  

This tool aims to bring **dynamic pricing awareness** to everyday grocery shoppers, something typically reserved for large-scale retailers or marketplaces.

---

### 2. System Architecture

To ensure scalability and maintainability, I adopted a microservices-based architecture with clear service separation:

- **Scraping Service** – Python + Selenium used for dynamic scraping across UK retailers (Sainsbury’s, Aldi, Iceland, Morrisons).  
- **Price Analysis Service** – Python-based service with embedded ML models to forecast prices and compute confidence scores.  
- **API Gateway** – A central Flask-based service to route traffic and orchestrate communication between services.  
- **Frontend** – Built with Flutter for responsive, cross-platform UI. Features include voice search and accessibility enhancements.

**Architecture Overview:**


       Frontend (Flutter) → API Gateway (Flask) → [Scraping Service] ↔ [Price Analysis Service(ML)]

All services were dockerized for modular deployment and fault isolation.

---

### 3. Machine Learning Component

At the heart of the system lies a **Weighted Moving Average (WMA)** model used to predict near-future price movements. The ML pipeline included:

- **Unit normalization** (e.g., pence → pounds, standardizing pack sizes)  
- **Smoothing short-term volatility** to prevent overfitting  
- **Confidence scoring** (range: 0–1) to reflect prediction reliability  
- Output translated into **natural-language recommendations**, such as:  
  > Good time to buy — £0.20 drop detected, 85% confidence

---

### 4. CI/CD & DevOps

To maintain smooth development and safe deployments, I implemented:

- **Docker-based workflows** for consistent builds across environments  
- **Basic health checks** and **logging** for every service  

This allowed the testing of services independently without disrupting the entire system; a major advantage of the microservices model.

---

### 5. Challenges Faced

As with any real-world system, the project presented several hurdles:

- **Service coordination** – Ensuring that loosely coupled services remained in sync  
- **Scraping at scale** – Managing session headers, delay timers, and rate limits to avoid detection  
- **Data inconsistency** – Handling missing units, mislabelled products, and naming discrepancies  
- **Performance trade-offs** – Balancing prediction accuracy with low-latency responses, especially for mobile users

---

### 6. Technical Decisions & Trade-offs

#### Why Weighted Moving Average (WMA) Over ARIMA or LSTM?

Although I considered ARIMA and LSTM, I chose WMA because:

- **Faster inference time** — ideal for user-facing mobile apps  
- **Lower computational cost** — suitable for containerized services  
- **Smaller dataset requirement** — more advanced models didn’t add value given limited historical data

This trade-off struck the right balance between simplicity and practical performance.

#### Why Flask for the API Gateway Instead of FastAPI or Express?

Despite FastAPI's modern async features, I chose Flask due to:

- A **familiar ecosystem** that allowed quicker setup  
- The gateway's limited role of **routing and proxying**, which didn’t demand asynchronous capabilities  
- Flask’s mature middleware support for **logging, debugging, and request validation**

#### Why Selenium for Scraping?

I used **headless Selenium** because:

- DOM interaction and cookie/session handling were essential  
- Selenium provided flexibility for **lazy loading**, form interactions, and dynamic content parsing


**Bot detection mitigation included:**

- Rotating user agents and randomized headers  
- Simulating human-like delays  
- Running Chromium in headless containers to resemble real browsers

#### Why Microservices Instead of a Monolith?

Although microservices introduced some complexity, they were the better choice for:

- **Independent development** and deployment of each module  
- **Resilience and fault isolation** across services  
- Mimicking real-world distributed system designs; important for my long-term career path

---

### 7. What I’d Improve

#### Replace WMA with Adaptive Forecasting

While WMA was effective, it lacks the ability to model **non-linear patterns** and **seasonality**. In the future, I’d explore:

- **Facebook Prophet** or **XGBoost regressors**  
- **Online learning algorithms** that adapt with each new data point

#### Move Scraping to Serverless or Queue-Based Infrastructure

Currently, scraping runs on a fixed schedule within a container. A better approach would be:

- Deploying scraping tasks via **AWS Lambda** or **Cloud Functions**  
- Using **queues or cron triggers** for event-driven execution  
- Adding **observability tools** like Prometheus and Grafana for monitoring

#### Improve API Gateway Security

The current setup lacks critical security layers. Future upgrades would include:

- **JWT-based authentication**, **rate limiting**, and **CORS enforcement**  
- **Centralized logging**, **error alerts**, and **audit trails**

#### Add Internationalization and More Retailers

To scale globally, the system should support:

- **Multi-currency** and **multi-language** capabilities  
- A modular scraping logic to onboard more retailers from different regions

---

### 8. Lessons Learned

This project helped reinforce key software engineering principles:

- The importance of **versioned APIs** to avoid downstream breakage  
- How to design and manage **resilient CI/CD pipelines**  
- The gap between **notebook-based ML prototypes** and **production-ready models**  
- How to build systems that can **fail gracefully** without affecting user experience

---

### 9. Final Reflections

What began as an ambitious stack experiment turned into a robust, deployable platform. It challenged me to think like both a **systems architect** and a **data engineer**; skills that are increasingly in demand.

I now feel significantly more confident tackling roles that involve **distributed architecture**, **data pipelines**, and **machine learning integration**.

---
`.trim()
  },
  {
  slug: "freight-train-tracker",
  title: "Building a Real-Time Freight Train Tracker with MERN and Socket.IO",
  date: "2024-12-07",
  author: "Ahmed Sulaimon",
  content: `
In this project, I led the development of a **real-time train tracking application** using the **MERN stack**, **Leaflet.js**, and **Socket.IO**. The goal was to provide users with live updates of train journeys on a map of the UK rail network, allowing them to search, view, and interact with rich data such as journey status, delays, and timing breakdowns.

---

## Tech Stack Overview

- **MongoDB** – Storing structured API responses for train routes and history  
- **Express.js** – API middleware for routing and authentication  
- **React** – Frontend UI for user interaction and dynamic state updates  
- **Node.js** – Backend runtime to power the server  
- **Socket.IO** – Real-time communication for live train location updates  
- **Leaflet.js** – Geospatial visualization on an interactive map  
- **Train Data API** – External API providing UK freight train schedules and live data

---

## Core Features

-  **Searchable Map Interface** – Users can search by location (TIPLOC codes)  
-  **Live Train Tracking** – Polylines represent each train’s journey in real-time  
-  **Colour-Coded Statuses** – Blue (Active), Green (Terminated), Red (Cancelled)  
-  **Train Journey Popups** – Timeline data displayed with headers  
-  **Real-Time Updates** – Map updates without requiring a refresh  
-  **Accessibility First** – Lighthouse scores pushed to 100%

---

## The Development Process

We followed an **Agile methodology** with **Kanban** for planning and weekly stand-ups. As Scrum Master, I was responsible for:

- Writing **project specifications** and **user stories**  
- Leading **API integration** and environment variable security  
- Implementing core features like **polyline rendering** and **search filters**

We also used the **SHU development process**, applying techniques like:

- Persona creation  
- MoSCoW prioritization  
- Iterative sprint cycles with client feedback

---

## Technical Highlights

### 1. Integrating Leaflet.js with MERN

We used Leaflet.js to visualize live train routes on a schematic map. Real-time data was streamed from the backend using Socket.IO and rendered using polylines.

\`\`\`js
L.polyline(trainCoords, {
  color: getPolylineColor(train.status)
}).addTo(map);
\`\`\`

### 2. Secure API Access with Environment Variables

API keys were managed securely using \`.env\` files and ignored in Git using \`.gitignore\`, preventing accidental exposure.

### 3. Data Validation & UI Feedback

Robust handling of inconsistent API responses (e.g., missing fields) ensured the app remained stable. Popups were dynamically populated and adapted for incomplete journeys.

---

## Feedback & Iteration

During the client demonstration, the following areas for improvement were identified:

- Render only **one train at a time** per location to reduce visual clutter  
- Move the **timeline** into a sidebar instead of a popup  
- Enhance search by allowing filtering by **date, origin, operator, or head code**  
- Add a **legend** for polyline color meanings

We created a post-demo **action plan** to address these items in the next sprint.

---

## What I’d Improve

If I were to approach this again, I’d:

- Add a proper **user feedback system** for live support  
- Integrate more **analytics** for admin insights on usage patterns  
- Automate testing using tools like **Jest** or **Cypress**  
- Consider **serverless architecture** for scaling real-time features more efficiently

---

## What I Learned

This project helped sharpen both my technical and soft skills:

-  Gained hands-on experience with **Socket.IO** and **Leaflet.js**  
-  Learned how to securely handle **external APIs**  
-  Enhanced my **project leadership and communication skills**  
-  Understood how to balance **real-time UI/UX** with performance

---

## Conclusion

The freight train tracker was a rich, collaborative project that tackled real-world challenges—like live data handling, security, and responsive UI. By combining modern tools and structured agile development, we delivered a functional and well-received application.
`.trim()
}

];
