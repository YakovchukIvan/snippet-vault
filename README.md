````markdown
# Snippet Vault

A service for storing useful fragments (links, notes, commands) with tags and search.

**Stack:** Next.js (App Router) · NestJS · MongoDB · TypeScript

## Local Setup

### Requirements

- Node.js 20+
- npm 9+
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
cp .env.example .env   # fill in the variables
npm install
npm run start:dev      # http://localhost:3001
```
````

### Frontend

```bash
cd frontend
cp .env.example .env.local   # fill in the variables
npm install
npm run dev            # http://localhost:3000
```

## Environment Variables

### backend/.env.example

```dotenv
PORT=3001
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/snippet-vault
FRONTEND_URL=http://localhost:3000
```

### frontend/.env.example

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## API

Swagger UI: `http://localhost:3001/api/docs`

| Method | URL           | Description                  |
| ------ | ------------- | ---------------------------- |
| GET    | /snippets     | List with pagination/filters |
| GET    | /snippets/:id | Single snippet               |
| POST   | /snippets     | Create snippet               |
| PATCH  | /snippets/:id | Update snippet               |
| DELETE | /snippets/:id | Delete snippet               |

### Query Parameters GET /snippets

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| page      | number | Page number (default: 1)     |
| limit     | number | Items per page (default: 10) |
| q         | string | Search by title/content      |
| tag       | string | Filter by tag                |

### Request Examples

```bash
# Create
curl -X POST http://localhost:3001/snippets \
  -H "Content-Type: application/json" \
  -d '{"title":"Git reset","content":"git reset --hard HEAD","type":"command","tags":["git"]}'

# List with search
curl http://localhost:3001/snippets?q=git&page=1&limit=10

# Filter by tag
curl http://localhost:3001/snippets?tag=git
```

## Production Build

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build
npm run start
```

## Deploy

- Frontend: [Vercel](https://vercel.com)
- Backend: [AWS](https://aws.amazon.com)
