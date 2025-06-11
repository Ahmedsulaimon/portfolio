
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "microservices-and-ml",
    title: "Building an application with Microservices and Machine Learning",
    date: "2025-05-07",
    author: "Ahmed Sulaimon",
    content: `
Developing a production-grade application that combines **microservices architecture** with **machine learning** was both a challenge and a rewarding learning experience.

### 1. The Vision

The goal was to build a real-time grocery price comparison tool. Users should be able to:
- Track price trends
- Get intelligent buying suggestions
- View predictions for future price drops

### 2. System Architecture

The app was divided into several microservices:
- **Scraping Service** – Python + Selenium for dynamic scraping
- **Price Analysis Service** – Python ML model for price forecasting
- **API Gateway** – Flask to route between services
- **Frontend** – Built with Flutter, responsive for mobile/desktop

### 3. Machine Learning Component

The ML model used a **weighted moving average** to forecast future prices and confidence levels. Data was cleaned and normalized to ensure consistency across products and stores.

### 4. Challenges

- Coordinating data across services
- Ensuring each microservice could fail independently
- Maintaining performance while scraping large datasets

### 5. Lessons Learned

This project taught me:
- The importance of versioned APIs between services
- How to build resilient CI/CD pipelines
- Real-world ML deployment is very different from notebook prototyping

### 6. Final Thoughts

This project pushed me technically and helped improve my problem-solving skills. It gave me the confidence to pursue backend-heavy roles that involve both **data** and **distributed systems**.
`.trim()
  }
];
