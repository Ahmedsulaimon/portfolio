## Project Essence
   This application is developed to showcase my portfolio
   as a new grad software engineer

# Tech stack used for porfolio development
  This portfolio application was developed using Next.js with Typescript and tailwind css

## Project Structure
/portfolio
├── public/                 # Static assets like images, fonts, etc.
│   └── images/
├── src/
│   ├── app/                # App Router directory
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx  # Optional: specific layout for About
│   │   ├── projects/       # Projects page
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx  # Optional: specific layout for Projects
│   │   └── (components)/   # Route group for shared components
│       ├── header.tsx
│       ├── footer.tsx
│       └── ...
│   └── types/              # TypeScript type definitions
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── package.json
└── tsconfig.json           # TypeScript configuration

   