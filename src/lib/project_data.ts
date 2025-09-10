
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
      personalGoal: "My personal goal for this project was to play a key role in delivering a high-quality, real-world application while expanding my knowledge of new technologies like Leaflet.js, Socket.io, and Vite. I also aimed to strengthen my soft skills—particularly in presenting technical concepts clearly to clients, leading team collaboration as a Scrum Master, and maintaining project momentum through agile practices.",

    },
   {
  slug: "auto-pr-review-assistant",
  blogSlug: "auto-pr-review-assistant",
  title: "Auto PR Review Assistant -- MVP",
  shortDescription:
    "A distributed system that automates GitHub pull request reviews using AI, posting inline comments on code changes and providing a CLI dashboard for developers.",
  thumbnailUrl: "/images/auto_pr_review.png",
  date: "2025-09-10",
  techStack: ['Python', 'FastAPI', 'Redis', 'Docker', 'GitHub API', 'OpenAI API', 'Pytest', 'GitHub Actions'],
  fullDescription: `
The Auto PR Review Assistant is a microservice-based system designed to automate the code review process for GitHub pull requests. It integrates with GitHub webhooks, uses AI for intelligent feedback on code changes, and posts detailed inline comments directly onto pull requests.

The system consists of three main components:
- **Webhook Listener Service**: A FastAPI service that validates GitHub webhook signatures, extracts pull request events, and enqueues jobs into Redis.
- **Review Engine Service**: A worker service that dequeues jobs, fetches pull request metadata and diffs via GitHub’s GraphQL and REST APIs, generates AI-powered review feedback, and posts structured comments back to GitHub.
- **CLI Dashboard**: A developer-facing CLI tool to list recent analyzed PRs, view AI-generated comments, and trigger rechecks.

Testing and reliability were a key focus:
- **Unit testing with Pytest**: Both the webhook listener and review engine were tested in isolation, with mocked Redis, GitHub APIs, and OpenAI integrations.
- **Continuous Integration**: GitHub Actions was configured to automatically run the test suite on every push and pull request, ensuring regressions are caught early.

To bring everything together, the system was containerized with Docker and orchestrated via docker-compose for local development, enabling smooth integration between Redis, services, and the CLI.

This project strengthened my skills in distributed systems, API integrations, automated testing, and CI/CD pipelines. It also deepened my understanding of practical AI applications in developer tooling, giving me hands-on experience with building reliable, production-ready review automation.
`.trim(),

  videoUrl: "/videos/auto_pr_review_demo.mp4",
  github: "https://github.com/Ahmedsulaimon/Auto-PR-Review-Assistant",
  personalGoal: "My personal goal for this project was to explore how AI can be embedded into developer workflows, while practicing distributed system design, API integration, and test-driven development. I also aimed to solidify my DevOps skills by using Docker for containerization and GitHub Actions for continuous integration.",
},

  ];
  