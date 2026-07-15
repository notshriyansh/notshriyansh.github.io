---
title: Orchestrate
description: Interactive system architecture and workflow visualization platform for designing distributed systems through a drag-and-drop canvas.
status: Completed
featured: true
github: https://github.com/notshriyansh/orchestrate
tags:
  - system-design
  - architecture
  - workflow
  - react-flow
  - distributed-systems
---

## Overview

Most system designs exist as static diagrams.

Architectures are typically created in tools like Excalidraw, Figma, or Lucidchart, making them useful for communication but limited for exploration, simulation, and experimentation.

Orchestrate is a visual system architecture and workflow design platform that enables developers to build distributed systems through an interactive drag-and-drop canvas. Users can model APIs, load balancers, caches, databases, queues, workers, AI services, and infrastructure components while visualizing how requests move across a system.

The project combines architecture design, workflow modeling, reusable templates, and execution simulation into a single environment.

Current capabilities include:

- Interactive architecture canvas
- Drag-and-drop infrastructure components
- System design template library
- Workflow persistence
- Postman collection imports
- PNG / GIF / MP4 exports
- Authentication and user management
- Execution simulation and replay

The long-term goal is to evolve Orchestrate from a visualization platform into a full workflow orchestration and debugging environment.

## Architecture

```text
                    +--------------------+
                    |      Frontend      |
                    | React + TypeScript |
                    |    React Flow      |
                    +---------+----------+
                              |
                              | REST API
                              v
                    +--------------------+
                    |   Express Backend  |
                    | Workflow Services  |
                    +---------+----------+
                              |
                 +------------+------------+
                 |                         |
                 v                         v
      +-------------------+     +-------------------+
      |    Firebase Auth  |     | PostgreSQL        |
      | Authentication    |     | (NeonDB)          |
      +-------------------+     +-------------------+
                              |
                              v
                    +-------------------+
                    | Workflow Engine   |
                    | DFS Simulation    |
                    | Execution Replay  |
                    +-------------------+
```

### Architecture Flow

1. Users authenticate through Firebase Authentication.
2. Workflows are created visually using the React Flow canvas.
3. Node and edge configurations are persisted through the Express backend.
4. Workflow state is stored in PostgreSQL (NeonDB).
5. Users can import external workflows through Postman collections.
6. Workflows can be simulated and replayed through the execution engine.
7. Architectures can be exported as images, GIFs, or MP4 recordings.

## Technical Decisions

### React Flow for Visual Architecture Modeling

React Flow powers the canvas layer and provides the foundation for node-based architecture design.

Benefits include:

- Custom infrastructure nodes
- Interactive edge connections
- Zoom and pan support
- Large graph rendering
- Execution visualization

This allowed the project to focus on workflow behavior rather than low-level graph rendering.

### PostgreSQL for Workflow Persistence

Workflow definitions are stored in PostgreSQL using NeonDB.

Benefits include:

- Reliable persistence
- Structured workflow storage
- Query flexibility
- Cloud-hosted deployment
- Easy future expansion

Each workflow consists of node definitions, edge relationships, metadata, and execution state.

### Firebase Authentication

Authentication is handled through Firebase.

Benefits include:

- Secure authentication flows
- Session persistence
- Email/password authentication
- Google Sign-In support
- Minimal backend complexity

This allowed user management to be implemented without building a custom authentication system.

### JSON-Based Workflow Representation

Architectures are stored as collections of nodes and edges rather than proprietary formats.

Benefits include:

- Easy serialization
- Version control friendliness
- Database compatibility
- API portability
- Future execution engine support

The same workflow definition can later be consumed by a dedicated orchestration engine.

## Execution Simulation

The current execution engine uses graph traversal to simulate workflow execution.

When a workflow is executed:

1. Execution begins at the entry node.
2. Connected nodes are traversed through the workflow graph.
3. Node states transition visually on the canvas.
4. Edge activity is highlighted.
5. Execution history is recorded.
6. Previous executions can be replayed.

While the current implementation uses a DFS-based traversal strategy, it establishes the foundation for future execution and debugging capabilities.

## System Design Templates

Orchestrate ships with a growing library of architecture templates including:

- API Processing Pipelines
- Event-Driven Architectures
- Microservice Systems
- AI Inference Pipelines
- CDN Edge Architectures
- Queue-Based Worker Systems
- Large Distributed Service Architectures

These templates help users quickly explore common distributed system patterns without starting from an empty canvas.

## Workflow Import & Export

### Postman Collection Import

Developers can import Postman collections and convert them into visual workflows.

This provides a bridge between API development and architecture visualization.

### Export Support

Workflows can be exported as:

- PNG Images
- Animated GIFs
- MP4 Videos

This makes it easier to share architectures, create documentation, and showcase workflow designs.

## Lessons Learned

### Graph Editors Become Complex Quickly

Managing node state, edge state, selection state, execution state, replay animations, imports, exports, and persistence introduces significant complexity.

Building clean abstractions around workflow state proved essential as the editor evolved.

### Architecture Visualization Has Untapped Potential

Traditional architecture diagrams are static.

By treating architectures as interactive graphs rather than images, new possibilities emerge around simulation, debugging, education, and observability.

### Developer Experience Matters

Features such as templates, imports, exports, replay functionality, and authentication significantly improve usability even before a sophisticated execution engine exists.

A great user experience can make a technical tool far more accessible.

## Current Features

- React Flow architecture canvas
- Custom infrastructure nodes
- Animated workflow connections
- Workflow persistence
- PostgreSQL (NeonDB) storage
- Firebase Authentication
- Google Sign-In
- Postman collection imports
- PNG export
- GIF export
- MP4 export
- Workflow replay
- Template library
- Execution simulation
- Responsive dashboard
- Modern system-design focused UI

## Future Work

### Production Workflow Execution Engine

Replace the current DFS simulation with a dedicated execution engine capable of:

- Parallel execution
- Conditional branching
- Retry policies
- Failure recovery
- Dependency management

### Visual Debugging

Add developer tooling for:

- Step-by-step execution
- Failure tracing
- Node inspection
- Runtime logs
- State visualization

### Real Infrastructure Integrations

Allow workflows to connect to:

- HTTP APIs
- Queues
- Databases
- External services
- Cloud infrastructure

This would transform workflows from simulations into executable architectures.

### Collaborative Editing

Introduce:

- Multi-user collaboration
- Shared workspaces
- Comments
- Architecture reviews

for team-based system design.

### Auto Layout & Architecture Generation

Add support for:

- Automatic graph layout
- AI-assisted architecture generation
- Architecture recommendations
- System design templates generated from prompts

to accelerate workflow creation.
