
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
    date: "2025-09-10", 
    author: "Ahmed Sulaimon",
    content:`

Building an AI-powered system to automate GitHub pull request reviews gave me a deep dive into distributed systems, API integration, and testing at scale. This post outlines how I designed and implemented the **Auto PR Review Assistant**, covering the vision, architecture, testing, challenges, and key learnings.

---

### 1. The Vision

The goal was simple: reduce the friction in code reviews by having an assistant that can:

- **Automatically analyze pull requests** when opened or updated  
- **Generate AI-powered feedback** on style, complexity, and maintainability  
- **Post inline comments** directly on GitHub PRs, just like a human reviewer  
- Provide a **developer-facing CLI dashboard** to inspect review status and trigger rechecks  

The idea was not to replace human reviewers, but to provide a first pass that saves engineering teams valuable time.

---

### 2. System Architecture

To keep things modular and scalable, I used a **microservices-based design** with Redis as the central job queue:

- **Webhook Listener (FastAPI)**  
  - Receives GitHub webhook events  
  - Validates signatures (x-hub-signature-256)  
  - Queues jobs into Redis  

- **Review Engine (Python worker)**  
  - Dequeues jobs from Redis  
  - Uses GitHub GraphQL + REST APIs to fetch PR metadata and diffs  
  - Passes changes to the OpenAI API for analysis  
  - Posts structured inline comments back to GitHub  

- **CLI Dashboard (Python CLI)**  
  - **list-prs** to view recent PRs  
  - **show-pr <id>** to inspect AI-generated comments  
  - **recheck-pr <id>** to trigger a re-review  

**High-Level Flow:**  

GitHub → Webhook Listener → Redis Queue → Review Engine → GitHub Comments  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↳ CLI Dashboard for developer interaction  

All services were containerized with **Docker** and orchestrated via **docker-compose**, making it easy to spin up the entire system locally.

---

### 3. Testing & CI/CD

Quality was a major focus for this project:

- **Unit Testing with Pytest**  
  - Webhook Listener tested with mocked signatures and fake Redis  
  - Review Engine tested with mocked GitHub API + OpenAI outputs  
- **Automation via GitHub Actions**  
  - Every push/PR triggered linting and pytest runs  
  - Secrets (GitHub tokens, OpenAI API key) injected for integration-like tests  

This ensured confidence in core logic while keeping external dependencies mocked during CI.

---

### 4. Challenges Faced

- **Data shape variability** – OpenAI responses weren’t always in the expected JSON structure. I had to implement a flexible parser and error handling.  
- **Commit-specific commenting** – GitHub PR comments require a valid commit SHA, file path, and line number. Handling edge cases (renamed/deleted lines) was tricky.  
- **Async Redis clients** – Different Redis client libraries had quirks with Python 3.12, leading me to settle on the maintained **redis-py** package.  
- **Action replays** – Re-queuing PRs for recheck required storing repo metadata alongside PR IDs.  

Each roadblock sharpened my debugging skills and forced me to think about failure handling in distributed workflows.

---

### 5. Technical Decisions & Trade-offs

#### Why Redis for Queues?

I chose Redis because:  
- Simple and fast for queue operations (**LPUSH**, **BRPOP**)  
- Already battle-tested in distributed systems  
- Easy to containerize and reset during dev/testing  

#### Why Split into Services Instead of One App?

- Clear **separation of concerns** (event handling vs. AI review logic)  
- Easier debugging and scaling (engine workers can be scaled independently)  
- More realistic for production, mimicking CI/CD pipeline architectures  

#### Why AI Reviews Instead of Rule-Based Linters?

While linters catch syntax issues, AI can provide **contextual suggestions** (readability, refactoring hints, complexity). The trade-off was unpredictability of responses, which I mitigated with structured prompting and JSON enforcement.

---

### 6. What I’d Improve

- **Web UI Dashboard** – A lightweight frontend (React/Next.js) could make browsing PR reviews more intuitive than the CLI.  
- **Configurable Checks** – Letting repo owners enable/disable checks (style, complexity, security) via YAML configs.  
- **Better Diff Parsing** – Handling multi-line hunks and complex patches more gracefully.  
- **Caching** – Avoid re-fetching unchanged diffs when re-checking PRs.  

---

### 7. Lessons Learned

This project reinforced several engineering principles:

- The importance of **structured error handling** when working with AI outputs  
- How to integrate multiple APIs (GitHub GraphQL, REST, OpenAI) into one workflow  
- The value of **unit + integration tests** for distributed systems  
- How to design a project that feels like a **real-world developer tool** rather than a toy script  

---

### 8. Final Reflections

What started as a curiosity—“can I automate PR reviews with AI?”—grew into a full-fledged distributed system. It combined backend APIs, async job queues, AI prompt engineering, and developer tooling into one coherent application.

I walked away with stronger skills in **Python microservices, API integration, containerization, and automated testing**, along with a much deeper appreciation for how developer experience tools are built.

---
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
