# Echo Chat

A real-time web chat application structured as a monorepo with a **Next.js** client (following Feature-Sliced Design) and an **Express + WebSocket + PostgreSQL** backend.

&lt;!-- Optional badges: add build status, license, or live demo badges here --&gt;

## Features

- **Real-time messaging:** Send, edit, and delete messages over WebSocket (`/ws`), backed by cursor-based message history pagination.
- **Presence & live indicators:** Online/offline status tracking, last-seen timestamps, typing indicators (`typing`), and automatic heartbeat monitoring (ping/pong every 30 seconds).
- **Authentication & security:** Registration and login with `argon2` password hashing (+ pepper), JWT sessions (`accessToken` and `refreshToken`) stored in HTTP-only cookies, automatic token refresh via Next.js middleware, single-session and all-session logout, and account deletion.
- **User profiles:** Editable profile fields (first name, last name, username, email, phone number, bio), avatar uploads via Vercel Blob, and auto-generated fallback avatars.
- **Interface & privacy settings:** Theme switching (persisted in cookies), chat sound controls, pinned message alerts, online status visibility, and Do Not Disturb mode.
- **Help center & AI assistant:** Searchable FAQ section and an integrated Google Gemini (`@google/genai`) assistant for answering application-related questions.

&lt;!-- Screenshots: add images to docs/screenshots/ and embed them here with standard Markdown syntax, e.g.  --&gt;

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend (`client`)** | Next.js 16 (App Router, React Compiler), React 19, TypeScript, Zustand, SCSS Modules, Tailwind CSS v4, Zod, `next-safe-action`, Lucide React, Vercel Blob |
| **Backend (`server`)** | Node.js, Express 5, TypeScript, `ws` (WebSocket), Drizzle ORM, PostgreSQL (`pg` / `postgres`), Argon2, JWT (`jsonwebtoken`), Zod, `tsx`, `tsup` |
| **AI Integration** | Google GenAI SDK (`@google/genai`, Gemini) |
| **Infrastructure** | Docker Compose (PostgreSQL), Drizzle Kit (migrations and Studio) |

## Project Structure

```text
online-chat/
├── client/                     # Client application (Next.js, FSD)
│   ├── src/
│   │   ├── app/                # App Router pages & Route Handlers (/api/v1/assistant, /api/v1/auth)
│   │   ├── widgets/            # Composite UI blocks (Chat, Sidebar, Settings, Profile, Auth)
│   │   ├── features/           # User workflows (ChatInput, Auth, ChangeTheme, UploadAvatar, AskQuestion)
│   │   ├── entities/           # Domain entities (message, user, settings, question)
│   │   ├── shared/             # UI kit, API clients, WebSocket hook, providers, utilities
│   │   └── middleware.ts       # Route protection and automatic JWT refresh
│   ├── .env.example
│   └── package.json
├── server/                     # Server application (Express + WebSocket)
│   ├── src/
│   │   ├── db/                 # PostgreSQL connection, schema, relations, migrations, message seeder
│   │   ├── middleware/         # Cookie/JWT verification, Zod validation, error handler
│   │   ├── modules/            # REST API modules: auth, user, message, settings
│   │   ├── ws/                 # WebSocket server, connection manager, event handlers
│   │   ├── app.ts              # Express app and CORS configuration
│   │   └── server.ts           # HTTP server and WebSocket initialization
│   ├── compose.yml             # Docker Compose config for PostgreSQL (port 4100 -> 5432)
│   ├── drizzle.config.ts       # Drizzle Kit configuration
│   ├── .env.example
│   └── package.json
└── package.json                # Root scripts for running client and server
```

## Database Schema

PostgreSQL is managed via Drizzle ORM (`server/src/db/schema.ts`) and consists of four core tables:

| Table | Purpose |
| :--- | :--- |
| `users` | User accounts, roles (`user`, `admin`), password hash, profile details, avatar URL, and last-online timestamp |
| `sessions` | Active refresh tokens and expiration metadata |
| `messages` | Chat message history linked to authors with timestamps |
| `settings` | Per-user preferences (`chat_sounds`, `pinned_message_alerts`, `show_online_status`, `do_not_distract`) |

## Prerequisites

- **Node.js** 20+ and **npm**
- **Docker** and **Docker Compose** (or a local PostgreSQL 15+ instance)
- **Google Gemini API key** (for the help center AI assistant)
- **Vercel Blob token** (for user avatar uploads)

## Getting Started

### 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
cd <PROJECT_DIR>
```

### 2. Install dependencies

Install packages in the root, client, and server directories:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 3. Configure environment variables

Create environment files based on `.env.example` inside `server/` and `client/`.

#### Server (`server/.env` and `server/.env.local`)

> `drizzle.config.ts` loads variables from `server/.env.local`, while `server.ts` loads `server/.env`. Ensure `DATABASE_URL` is configured in both files (or keep the same variables in both).

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `PORT` | Yes | HTTP/WebSocket server port | `4200` |
| `CLIENT_URL` | No | Allowed client origin for CORS (defaults to `http://localhost:3000`) | `http://localhost:3000` |
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@localhost:4100/postgresdb` |
| `POSTGRES_USER` | Yes (Docker) | PostgreSQL username for `compose.yml` | `postgres` |
| `POSTGRES_PASSWORD` | Yes (Docker) | PostgreSQL password for `compose.yml` | `strong_password` |
| `POSTGRES_DB` | Yes (Docker) | PostgreSQL database name for `compose.yml` | `echo_chat` |
| `JWT_ACCESS_SECRET` | Yes | Secret key for signing access tokens | `your_access_secret` |
| `JWT_REFRESH_SECRET` | Yes | Secret key for signing refresh tokens | `your_refresh_secret` |
| `JWT_ACCESS_EXPIRES_IN` | No | Access token TTL (defaults to `16m`) | `16m` |
| `JWT_REFRESH_EXPIRES_IN` | No | Refresh token TTL (defaults to `30d`) | `30d` |
| `PEPPER` | Recommended | Additional pepper secret for `argon2` password hashing | `your_pepper_secret` |
| `NODE_ENV` | No | Runtime environment (`development` / `production`) | `development` |

#### Client (`client/.env.local`)

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `SERVER_ENDPOINT` | No | Backend REST API base URL (defaults to `http://localhost:4200/api/v1`) | `http://localhost:4200/api/v1` |
| `NEXT_PUBLIC_WS_SERVER_ENDPOINT` | No | Backend WebSocket URL (defaults to `ws://localhost:4200/ws`) | `ws://localhost:4200/ws` |
| `GEMINI_API_KEY` | Yes (AI) | Google Gemini API key for the help assistant | `AIza...` |
| `BLOB_READ_WRITE_TOKEN` | Yes (Avatars) | Vercel Blob read/write token | `vercel_blob_rw_...` |

### 4. Start PostgreSQL and run migrations

Start the database container from the `server/` directory:

```bash
cd server
docker compose up -d
```

Apply Drizzle ORM migrations:

```bash
npm run db:migrate
```

Optionally seed sample messages:

```bash
npm run db:seed-mes
```

### 5. Run in development

From the repository root, start the backend and frontend in separate terminals:

```bash
# Terminal 1 — backend server (runs on PORT, e.g. 4200)
npm run dev:back

# Terminal 2 — frontend client (http://localhost:3000)
npm run dev:front
```

### 6. Production build

```bash
# Build and start backend
npm run build --prefix server
npm run start --prefix server

# Build and start frontend
npm run build --prefix client
npm run start --prefix client
```

## Available Scripts

| Directory | Command | Description |
| :--- | :--- | :--- |
| Root | `npm run dev:front` | Start Next.js in development mode |
| Root | `npm run dev:back` | Start Express/WebSocket server (`tsx watch`) |
| `client/` | `npm run dev` / `build` / `start` / `lint` | Develop, build, serve, and lint the client |
| `server/` | `npm run dev` / `build` / `start` | Develop, bundle (`tsup`), and start the server |
| `server/` | `npm run db:generate` | Generate SQL migrations from `schema.ts` |
| `server/` | `npm run db:migrate` | Apply migrations to PostgreSQL |
| `server/` | `npm run db:push` | Push schema directly to PostgreSQL |
| `server/` | `npm run db:studio` | Launch Drizzle Studio database inspector |
| `server/` | `npm run db:seed-mes` | Seed the `messages` table with sample data |

## API & WebSocket Reference

### REST API (Server, base prefix `/api/v1`)

| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/auth/register` | No | Register a new user account |
| `POST` | `/auth/login` | No | Authenticate user and set JWT cookies |
| `POST` | `/auth/refresh` | Cookie | Refresh access and refresh tokens |
| `POST` | `/auth/logout` | Yes | Revoke the current session |
| `POST` | `/auth/all-logout` | Yes | Revoke all active user sessions |
| `DELETE` | `/auth/delete` | Yes | Delete the user account |
| `GET` | `/user` | No | Get total registered user count |
| `POST` | `/user` | Yes | Update last-online timestamp |
| `GET` | `/user/me` | Yes | Get the authenticated user profile |
| `PATCH` | `/user/me` | Yes | Update the authenticated user profile |
| `GET` | `/user/:id` | Yes | Get user profile by ID |
| `POST` | `/user/avatar` | Yes | Update user avatar URL |
| `GET` | `/message?cursor=<uuid>` | Yes | Fetch messages with cursor pagination |
| `GET` | `/settings` | Yes | Get current user settings |
| `PATCH` | `/settings` | Yes | Update current user settings |
| `GET` | `/settings/:userId` | Yes | Get settings for a specific user |

### Route Handlers (Next.js Client)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/assistant` | Query the Gemini AI help assistant |
| `GET` | `/api/v1/auth` | Clear auth cookies and redirect to `/login` |

### WebSocket (`/ws`)

Connections are authenticated during the HTTP Upgrade handshake using HTTP cookies (`accessToken` / `refreshToken`).

Supported event types (`type`):

- `GET_INITIAL_INFO` — fetch initial state upon connection
- `NEW_MESSAGE` — send and broadcast a new message
- `EDIT_MESSAGE` — edit an existing message
- `DELETE_MESSAGE` — delete a message
- `USER_TYPING` / `USER_TYPING_STOP` — broadcast typing indicator state
- `USER_ONLINE` / `USER_OFFLINE` — broadcast user presence updates
- `ERROR` — report an event processing error

## License

This project is licensed under the **ISC** License (see `server/package.json`).