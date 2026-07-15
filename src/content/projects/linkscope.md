---
title: LinkScope
description: Edge-native URL shortener with real-time analytics powered by Cloudflare Workers, Durable Objects, and D1.
status: Completed
featured: true
github: https://github.com/notshriyansh/linkscope
tags:
  - cloudflare
  - edge-computing
  - durable-objects
  - analytics
  - serverless
---

## Overview

LinkScope is an edge-native URL shortening and analytics platform built on Cloudflare's serverless stack. Users can create shortened links through a secure dashboard, while redirect requests are served globally through Cloudflare Workers for low-latency performance.

Beyond simple redirects, LinkScope captures click analytics such as device type, geographic location, and timestamps. To avoid excessive database writes under traffic spikes, analytics events are first buffered through Durable Objects before being persisted to D1.

The project was built primarily as an exploration of Cloudflare's edge ecosystem, including Workers, Durable Objects, D1, and globally distributed serverless applications.

## Architecture

The system separates redirect serving from analytics persistence.

```text
+-------------+
|   Browser   |
+------+------+
       |
       | Create Link / Dashboard Requests
       v
+------+------------------+
| Next.js Dashboard       |
| (Vercel + Clerk Auth)   |
+------+------------------+
       |
       | JWT Authenticated Requests
       v
+------+------------------+
| Cloudflare Worker API   |
| (Hono + TypeScript)     |
+------+------------------+
       |
       | Stores Links
       v
+------+------------------+
| D1 Database             |
| links table             |
+------+------------------+
       ^
       |
       | Redirect Lookup
       |
+------+------------------+
| Cloudflare Worker API   |
+------+------------------+
       |
       | Analytics Event
       v
+------+------------------+
| Durable Object          |
| Analytics Buffer        |
+------+------------------+
       |
       | Batched Writes
       v
+------+------------------+
| D1 Database             |
| clicks table            |
+-------------------------+
```

### Request Flow

#### Link Creation

1. User signs in using Clerk authentication.
2. Frontend retrieves a JWT and sends it to the Worker API.
3. Worker validates the token.
4. A unique short code is generated.
5. Link metadata is stored in D1.
6. Short URL is returned to the client.

#### Redirect Handling

1. User visits a short URL.
2. Worker looks up the short code in D1.
3. Original URL is retrieved.
4. Redirect response is returned immediately.
5. Analytics event is sent to a Durable Object.
6. Durable Object buffers events and periodically flushes them into D1.

## Technical Decisions

### Durable Objects for Analytics Buffering

Instead of writing every click directly into D1:

```text
Request -> Database Write
```

analytics events are first sent to a Durable Object:

```text
Request -> Durable Object -> Batched Database Writes
```

#### Reasoning

Writing every click directly to the database increases latency and creates unnecessary write pressure during traffic bursts.

Durable Objects provide:

- Stateful edge compute
- In-memory buffering
- Event batching
- Reduced database write frequency

This keeps redirects fast while still capturing analytics.

---

### D1 for Persistent Storage

D1 serves as the primary datastore for:

- Short links
- Click events

Schema:

```sql
links
------
id
user_id
short_code
original_url
expires_at
created_at

clicks
-------
id
link_id
country
device
created_at
```

#### Reasoning

D1 integrates directly with Workers and provides a lightweight serverless SQL database without needing to manage infrastructure.

---

### Clerk Authentication

Authentication is handled through Clerk.

The frontend:

- Authenticates users
- Generates JWTs

The Worker:

- Verifies JWT signatures
- Extracts user identity
- Associates links with the authenticated user

This enables secure API access without maintaining a custom authentication system.

## Tradeoffs

### D1 vs Traditional PostgreSQL

A traditional Postgres deployment would provide:

- More advanced querying
- Mature tooling
- Stronger scalability characteristics

However, D1 offered:

- Simpler deployment
- Native Worker integration
- Serverless operational model

For the scale of this project, D1 was the better tradeoff.

---

### Buffered Analytics vs Immediate Persistence

Buffered analytics introduce the possibility of losing a small number of events if a Durable Object instance terminates before flushing.

In exchange, the system gains:

- Faster redirect responses
- Lower database load
- Better scalability characteristics

## Challenges Encountered

### Clerk JWT Verification

One of the more challenging issues involved Clerk authentication between the Next.js frontend and Cloudflare Workers.

Symptoms included:

- 500 Internal Server Errors
- JWT verification failures
- JWKS key mismatches

Root causes:

- Incorrect environment variable configuration
- JWT template mismatch
- Missing Authorization headers

The issue was resolved by:

- Verifying JWT templates
- Correctly configuring Clerk environment variables
- Updating frontend token generation
- Validating tokens inside Workers

---

### Local vs Production D1 Databases

During deployment, link creation succeeded locally but failed remotely with:

```text
D1_ERROR: no such table: links
```

The root cause was that the schema existed only in the local development database.

The fix involved:

- Running remote D1 migrations
- Creating production tables
- Verifying deployment environments

This highlighted the importance of treating local and remote databases as separate systems.

## Lessons Learned

### Edge Computing Changes Backend Design

Traditional applications assume a centralized server.

With Workers:

- Compute runs near users
- Latency decreases significantly
- Stateless design becomes important

Understanding this shift changed how backend architecture decisions were made.

---

### Durable Objects Solve Stateful Problems

Most serverless systems are stateless.

Durable Objects introduce:

- Consistent state ownership
- Coordination primitives
- Event buffering capabilities

This makes them useful for analytics pipelines, rate limiting, collaborative applications, and real-time systems.

---

### Deployment Complexity Exists Even in Serverless Systems

While serverless removes infrastructure management, challenges still exist around:

- Authentication
- Environment variables
- CORS
- Database migrations
- Production debugging

## Future Work

- Real-time analytics dashboard using WebSockets
- Custom domains for shortened URLs
- Link expiration and scheduled cleanup jobs
- Rate limiting and abuse prevention
- QR code generation
- Geographic analytics visualizations
- Event streaming pipeline using Durable Objects and external processing services
