# Solaric Monitoring Dashboard — Frontend

Web frontend for the **Solaric** solar-monitoring dashboard. Built with **Next.js 13** (App/pages router) + **Tailwind CSS** (daisyUI), it visualizes live and historical solar-inverter and smart-meter telemetry served by the backend API, and handles authentication via **Firebase**.

Backend API: [mobin-zaman/solaric-monitoring-dashboard-backend](https://github.com/mobin-zaman/solaric-monitoring-dashboard-backend)

## Features

- **Live & historic monitoring** — charts (Recharts) for daily energy, instantaneous power, peak power, and sun-hours for each building/project.
- **Authentication** — Firebase email/password sign-in; tokens persisted and used to authorize API requests.
- **Asset management** — UI for companies, buildings, projects, inverters, meters, and users.
- **Exports** — download monitoring data as spreadsheets via the backend export API.

## Tech Stack

- [Next.js](https://nextjs.org/) 13 + React 18
- [Tailwind CSS](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/)
- [Firebase](https://firebase.google.com/) web SDK (auth)
- [Recharts](https://recharts.org/) (charts)
- [Axios](https://axios-http.com/) (API client)
- [React Query](https://tanstack.com/query) (data fetching)

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Create your config from the template
cp .env.example .env
#    ...and fill in the Firebase web-app config values

# 3. Run the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app is configured to talk to the backend API (deployed URL — see `next.config.js` / the API base in the app code).

## Scripts

| Command       | Description                           |
| ------------- | ------------------------------------- |
| `pnpm dev`    | Start the Next.js dev server          |
| `pnpm build`  | Build for production                  |
| `pnpm start`  | Run the production build              |
| `pnpm lint`   | Run ESLint                            |

## Environment Variables

See [`.env.example`](.env.example) — all values are the **public** Firebase web-app configuration:

| Variable                             | Purpose                        |
| ------------------------------------ | ------------------------------ |
| `NEXT_PUBLIC_FIREBASE_API_KEY`        | Firebase web API key           |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`     | Firebase project id            |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket        |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender id        |
| `NEXT_PUBLIC_FIREBASE_APP_ID`         | Firebase app id                |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`    | Firebase auth domain           |

## License

UNLICENSED — private project.