# Secret Santa

A simple Next.js Secret Santa application with a festive Christmas theme.

## Features
- Add/Remove participants
- Clear all participants with confirmation modal
- Persistent participant list (using localStorage)
- Festive Christmas theme with snowfall animation
- Mobile-responsive design
- Randomized Secret Santa pairings
- Step-by-step reveal of pairings with gift numbers
- Unique Santa favicon (🎅)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Online Mode & Persistence

The application uses **Upstash Redis** to synchronize game state across multiple devices and ensure data persistence.

### Prerequisites
1. Create a free Redis database at [Upstash](https://upstash.com/).
2. Copy the **REST URL** and **REST Token** from the Upstash console.

### Environment Variables
Create a `.env.local` file (copy from `.env.local.example`) for local development or add these to your Vercel project settings (Settings > Environment Variables):

```bash
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

> **Note:** Without these variables, the Online Mode will return a "configuration missing" error.

## Deployment on Vercel

This project is built with **Next.js**. When deploying to [Vercel](https://vercel.com/), ensure that:

1. The **Framework Preset** is set to **Next.js**.
2. The **Output Directory** should be left as default (Next.js automatically handles this). If it was previously set to `build` (for Create React App), please clear it in the Vercel Project Settings.

The build command should be:
`npm run build`
