
export interface Project {
    slug: string;
    title: string;
    shortDescription: string;
    thumbnailUrl: string;
    date: string;
    techStack: string[];
    fullDescription: string;
    videoUrl?: string;        
    screenshots?: string[];  
    github: string;
    personalGoal: string
    blogSlug?: string;
  }
  
  export const allProjects: Project[] = [
     {
  slug: "auto-pr-review-assistant",
  blogSlug: "auto-pr-review-assistant",
  title: "Auto PR Review Assistant -- MVP",
  shortDescription:
    "A distributed system that automates GitHub pull request reviews using AI, posting inline comments on code changes and providing a CLI dashboard for developers.",
  thumbnailUrl: "/images/auto_pr_review.png",
  date: "2025-10-03",
  techStack: ['Python', 'FastAPI', 'Redis', 'Docker', 'GitHub API', 'OpenAI API', 'Pytest', 'GitHub Actions'],
  fullDescription: `
The **Auto PR Review Assistant** is a microservice, multi-tenant system that automates code review for GitHub pull requests. It combines GitHub webhooks, namespaced Redis queues, and an AI review engine to produce inline, contextual feedback and persist review history **per GitHub App installation**.

## Core components

- **Webhook Listener (FastAPI)**  
  - Validates GitHub webhook signatures (x-hub-signature-256).  
  - Extracts event data and the **installation_id**.  
  - Enqueues jobs into Redis using installation namespacing (e.g. **pr-review-queue:<installation_id>**).

- **Review Engine (worker service)**  
  - Dequeues jobs scoped to a specific installation.  
  - Fetches PR metadata and diffs via GitHub GraphQL + REST APIs.  
  - Sends diffs to an LLM for review, parses structured JSON responses, and posts inline comments back to the PR.  
  - Persists review results under **pr-review-history:<installation_id>** to support listing, inspection, and rechecks.

- **CLI Dashboard**  
  - Developer-facing tool to **list-prs**, **show-pr <id>**, and **recheck-pr <id>**.  
  - Stores **API_URL** and the user’s **installation_id** in a local config file (e.g. **~/.pr-review/config.json**) for a smooth UX.

## CI/CD & Packaging

- Unit tests with **Pytest** cover webhook validation, queueing logic, worker flows, and LLM parsing (with mocks).  
- Services are containerized (Docker) and runnable locally with docker-compose.  
- CLI is packaged for PyPI and automated publishing via **GitHub Actions** using OIDC (no long-lived PyPI tokens required).

## Key design decisions

- **Tenant isolation (namespaced Redis keys)**  
  Each GitHub App installation gets its own Redis keys (**pr-review-queue:<installation_id>**, **pr-review-history:<installation_id>**). This prevents cross-tenant data leakage and enables per-installation pruning and scaling.

- **Microservice separation**  
  Splitting webhook handling and review processing improves fault isolation, allows independent scaling of workers, and simplifies testing and deployment.

- **Robust LLM handling**  
  Use structured prompting (force JSON output), tolerant parsing, and defensive error handling to cope with inconsistent LLM responses.

- **Deployment trade-offs**  
  Background workers are ideal (they continuously listen for BRPOP), but some managed platforms charge for always-on workers. Options include deploying true background workers on paid tiers, using platform scheduled wake mechanisms, or exposing a lightweight web endpoint that spins up the worker process (less ideal).

## Practical considerations surfaced by the project

- **GitHub App authentication**: Implementing JWT generation from the app private key and exchanging it for installation tokens is essential and requires careful PEM handling.  
- **Commit-level comments**: Posting inline comments requires correct commit SHA, file path and line — edge cases must be guarded (deleted/renamed files, missing patches).  
- **Multi-tenant Redis operations**: Scanning and blocking across many installation queues requires careful BRPOP usage and backoff strategies.  
- **Security & privacy**: Namespacing is the baseline requirement to prevent cross-tenant access to review data.

## Deployment & distribution

- Services are containerized and suitable for deployment to managed platforms (Render, Fly.io, Railway, Docker-hosted VMs).  
- The CLI is packaged for PyPI and can be published via GitHub Actions using OIDC or traditional token-based publishing.

## Summary

This project demonstrates a production-oriented approach to automating PR reviews: a modular design, clear tenant isolation, resilient LLM integration, and developer ergonomics via a CLI. It’s designed to be secure, testable, and deployable, and aims to augment — not replace — human reviewers by providing a fast, consistent first-pass on incoming pull requests.
`.trim(),

  videoUrl: "/videos/Auto PR Review Assistant video demo.mp4",
  github: "https://github.com/Ahmedsulaimon/Auto-PR-Review-Assistant",
  personalGoal: "My personal goal for this project was to explore how AI can be embedded into developer workflows, while practicing distributed system design, API integration, and test-driven development. I also aimed to solidify my DevOps skills by using Docker for containerization and GitHub Actions for continuous integration.",
},
    {
      slug: "automated-price-comparison-app",
      blogSlug: "microservices-and-ml",
      title: "Automated Price Comparison App",
      shortDescription:
       'A mobile app that scrapes and forecasts grocery prices across UK supermarkets using machine learning.',
      thumbnailUrl: "/images/price_comparison.png",
      date: "2025-04-10",
      techStack: ["Flutter","Flask", "Python", "FastAPI", "PostgreSQL", "Selenium","Docker"],
      fullDescription: `
  Built a cross-platform mobile application that scrapes grocery prices from major UK retailers (Sainsbury's, Aldi, Iceland, Morrisons) using headless Selenium + Python.
  
  ### Features include:
  - Unit-aware normalization (pence → pounds) and pack-size comparisons.
  - Weighted moving average price forecasting with 0-1 confidence scores.
  - Natural-language recommendations (e.g. “Good time to buy (£0.20 drop, 85% confidence)”).
  - Backend microservices (FastAPI + Flask gateway) + CI/CD.
  - Responsive Flutter UI with voice search, accessibility support, and “Best Deal” cards.
  
  For a live walk-through, see the embedded demo video.
  `.trim(),
      screenshots:['architecture.png'],
      github: 'https://github.com/Ahmedsulaimon/price-comparison-app/tree/main',
      videoUrl: '/videos/Price Prediction App.mp4', 
      personalGoal: "The main purpose of taking on this project is to learn new skills which include web scraping, intigrating machine learning algorithm in a real world application, understanding and practicing containarization & Microservices"
    },

   
    {
      slug: "freight-train-tracker",
      blogSlug: "freight-train-tracker",
      title: "Freight Train Tracker",
      shortDescription:
        "A web app that provides real time update on freight train, this includes current location, expect arrival time at different location e.t.c",
      thumbnailUrl: "/images/train_tracker.png",
      date: "2024-05-01",
      techStack: ['vite', 'React.js', 'Socket.io', 'Leafletjs', 'Typescript'],
      fullDescription: `
The Freight Train Tracker is a real-time web application that allows users to monitor the movement of freight trains across the UK. This application was developed as part of the Professional Software Development module during my second year at Sheffield Hallam University, in collaboration with 3Squared—a leading rail technology company.

As the Scrum Master of our development team, I played a pivotal role in implementing agile methodologies to keep our project organized and on track. My responsibilities included:
- Setting up and managing version control using Git.
- Writing detailed project specifications and user stories to guide development.
- Analyzing and integrating real-time data from 3Squared’s external APIs.
- Leading the development of key features such as:
  - A powerful search bar that allows users to find freight train schedules and locations based on any UK location.
  - Dynamic, colored polylines on an interactive map to visually distinguish between different train journeys.

To bring this application to life, we used the following technologies:
- **React.js** and **Vite** for a fast and responsive frontend experience.
- **Tailwind CSS** for a clean, mobile-friendly design.
- **React Leaflet.js** to render interactive maps with real-time updates.
- **Socket.io** to ensure that users receive live data without refreshing the page.
- **Express.js** for the backend server logic.

This project was not only a technical success, but also a deeply rewarding experience. It challenged us to apply software engineering principles in a real-world scenario, working directly with a client, meeting their specifications, and iterating based on feedback.

I'm particularly proud of how I facilitated teamwork, ensured consistent progress, and contributed to both the technical and organizational aspects of development. The result was a fully functional application that met the client's requirements and strengthened my skills in full-stack development, team leadership, and client communication.
`.trim(),

      videoUrl: "/videos/project demo.mp4",
      github: "https://github.com/Ahmedsulaimon/train-tracker-app",
      personalGoal: "My personal goal for this project was to play a key role in delivering a high-quality, real-world application while expanding my knowledge of new technologies like Leaflet.js, Socket.io, and Vite. I also aimed to strengthen my soft skills,particularly in presenting technical concepts clearly to clients, leading team collaboration as a Scrum Master, and maintaining project momentum through agile practices.",

    },
  

  ];
  