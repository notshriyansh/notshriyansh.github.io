---
title: Distributed AI Platform
description: Event-driven distributed job processing platform built to explore queueing systems, worker orchestration, fault tolerance, and real-time observability.
status: In Active Development
featured: true
tags:
  - distributed-systems
  - redis
  - fastapi
  - docker
---

## Overview

Distributed AI Platform is a backend systems engineering project built to explore how modern asynchronous processing systems work under the hood.

Instead of handling requests synchronously, the platform decouples request ingestion from execution using Redis Streams and Consumer Groups. Jobs are queued, processed by a distributed worker pool, and tracked through a real-time operational dashboard powered by Redis Pub/Sub and WebSockets.

The project focuses on concepts commonly found in production infrastructure:

- Asynchronous job processing
- Event-driven architecture
- Distributed worker orchestration
- Failure recovery
- Consumer groups
- Real-time observability
- WebSocket event streaming
- Dockerized microservices

While the current implementation uses mocked inference workloads, the architecture is designed to support real AI inference services in future iterations.

## Architecture

```text
                    +------------------+
                    |     Dashboard    |
                    |  React + Vite UI |
                    +---------+--------+
                              |
                              | WebSocket
                              v
                    +------------------+
                    |     Gateway      |
                    | Fastify + TS API |
                    +-------+----------+
                            |
                            | XADD
                            v
                    +------------------+
                    |  Redis Streams   |
                    | inference-stream |
                    +-------+----------+
                            |
              Consumer Group |
                            v
          +-----------------+-----------------+
          |                                   |
          v                                   v
 +------------------+               +------------------+
 |     Worker-1     |               |     Worker-2     |
 | Python Consumer  |               | Python Consumer  |
 +--------+---------+               +---------+--------+
          |                                   |
          | Publish Events                    |
          +------------------+----------------+
                             |
                             v
                     Redis Pub/Sub
                       job-events
                             |
                             v
                          Gateway
                             |
                             v
                         Dashboard
```

### Request Flow

1. A client submits a job to the Gateway.
2. The Gateway generates a unique job ID and appends the job to a Redis Stream.
3. Redis Streams distributes jobs across workers through a Consumer Group.
4. A worker claims the job and begins processing.
5. Lifecycle events are published through Redis Pub/Sub.
6. The Gateway subscribes to these events.
7. Events are forwarded to the Dashboard through WebSockets.
8. Users can monitor processing progress in real time.

## Technical Decisions

### Redis Streams Instead of Redis Lists

The project originally used Redis Lists (`LPUSH` / `BRPOP`) as a queue.

While simple, this approach had a major limitation:

- If a worker crashed after popping a job, the job was permanently lost.

Redis Streams provide:

- Consumer Groups
- Pending Entry Lists (PEL)
- Message acknowledgements (`XACK`)
- Message replay
- Failure recovery

This allowed the platform to move from a basic queue implementation toward production-style job orchestration.

### Consumer Groups

Workers operate as members of a Redis Consumer Group.

Benefits include:

- Horizontal scalability
- Automatic work distribution
- No duplicate processing
- Shared queue consumption

This architecture mirrors patterns used in systems built on Kafka, RabbitMQ, and Redis Streams.

### Event-Driven Architecture

Workers emit lifecycle events such as:

- `job_started`
- `job_completed`

Events are published through Redis Pub/Sub and consumed independently from the job execution path.

This separation allows operational tooling and observability systems to evolve independently from worker logic.

### WebSocket-Based Observability

Rather than polling APIs for updates, the Dashboard receives events through WebSockets.

This enables:

- Real-time job monitoring
- Live operational dashboards
- Low-latency system visibility

The same pattern is commonly used in:

- Kubernetes dashboards
- Monitoring systems
- Trading platforms
- AI agent runtimes

## Fault Tolerance

One of the primary goals of the project is understanding failure recovery.

### Worker Crash Recovery

When a worker claims a message but crashes before acknowledging it:

1. The message remains in the Pending Entry List.
2. A recovery worker periodically scans idle messages.
3. Redis `XAUTOCLAIM` transfers ownership of abandoned messages.
4. Another worker completes processing.
5. The recovered message is acknowledged.

This prevents jobs from being lost during worker failures.

### At-Least-Once Delivery

The current system guarantees:

- Jobs are not lost if a worker crashes before acknowledgement.
- Messages remain recoverable through the Consumer Group.

This is a significant improvement over simple queue implementations.

## Lessons Learned

### Distributed Systems Are Mostly Failure Handling

Building the happy path is relatively straightforward.

Most engineering complexity comes from handling:

- Worker crashes
- Lost acknowledgements
- Stuck jobs
- Recovery logic
- State synchronization

### Queues Are Not Just Queues

The project started with a basic Redis queue and evolved into a durable stream-processing architecture.

The difference between:

- pushing messages
- tracking ownership
- acknowledging work
- recovering failures

is what separates toy systems from production-grade systems.

### Observability Matters Early

Real-time event streams made debugging significantly easier.

Being able to see:

- queued jobs
- running jobs
- completed jobs
- recovery actions

helped validate system behavior during development.

## Current Features

- Dockerized multi-service architecture
- Fastify API Gateway
- Redis Streams job queue
- Consumer Groups
- Distributed worker pool
- Redis Pub/Sub event bus
- WebSocket event streaming
- Real-time dashboard
- Worker crash recovery
- Message acknowledgement flow
- At-least-once delivery semantics

## Future Work

### Durable Job Metadata

Introduce PostgreSQL as the system of record for:

- Job history
- Status tracking
- Retry counts
- Execution metrics

### Retry & Dead Letter Queues

Implement:

- Retry policies
- Exponential backoff
- Dead Letter Queues (DLQ)

for permanently failing jobs.

### Metrics & Monitoring

Add:

- Prometheus
- Grafana
- Structured logging
- Distributed tracing

to improve observability.

### Kubernetes Deployment

Deploy the platform on Kubernetes with:

- Horizontal scaling
- Health probes
- ConfigMaps
- Secrets
- Autoscaling workers

### Real AI Inference

Replace mocked workloads with actual model execution through:

- Ollama
- vLLM
- OpenAI-compatible APIs

while preserving the existing distributed architecture.
