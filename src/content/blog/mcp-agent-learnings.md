---
title: Lessons From Building an MCP Agent

description: Building an AI agent is easy. Building one you can actually govern is much harder.

date: 2026-07-15

tags:
  - ai
  - ai-agents
  - mcp
  - software-engineering
  - guardrails

draft: false
---

When I first started building this project, I thought the interesting part would be the agent.

I was wrong.

The interesting part turned out to be everything around the agent.

Modern language models are already capable of deciding when to use tools, generating arguments, and interacting with external systems. Getting an agent to call a calculator, retrieve weather information, or query a repository is no longer particularly difficult.

The moment an agent gains access to tools, however, a different set of problems appears.

Questions like:

- Should the agent be allowed to execute this tool?
- Who decides whether a tool invocation is safe?
- How do you approve sensitive actions?
- How do you audit what happened after the fact?
- What happens if a model makes a bad decision?

Those questions pushed the project in a direction I did not originally expect.

## The Original Goal

Initially, I wanted to build a simple MCP-enabled agent.

User Prompt  
↓  
LLM  
↓  
MCP Tool  
↓  
Response

The goal was straightforward.

Connect an LLM to a set of MCP servers and allow it to discover and invoke tools dynamically.

At the time, that felt like the interesting engineering challenge.

It wasn't.

## The First Realization

Tool execution is where the real complexity begins.

A language model can decide to call a tool, but that does not mean it should be allowed to.

Consider a seemingly simple request:

> What's the weather in Delhi?

The model reasons that it should use a weather tool.

That sounds harmless.

But what if the tool was a filesystem tool?

Or a deployment tool?

Or a GitHub write operation?

The architecture suddenly needs something more than reasoning.

It needs governance.

That realization led to one of the biggest design decisions in the project.

## Reasoning and Governance Should Be Separate

My initial instinct was to let the model decide whether actions were safe.

After experimenting with the architecture, that approach felt wrong.

A model should suggest actions.

A separate system should decide whether those actions are permitted.

The project evolved into a graph with explicit stages:

Planner  
↓  
Memory Retrieval  
↓  
Reasoning  
↓  
Policy Evaluation  
↓  
Tool Execution  
↓  
Response Generation

Separating policy enforcement from reasoning made the entire system easier to understand and audit.

Instead of asking:

> Why did the model think this was safe?

I could ask:

> What policy decision was made?

Those are very different questions.

## Approval Workflows Are Surprisingly Hard

One of the earliest governance features I added was human approval.

Certain tools should not execute automatically.

The weather tool became my test case.

The flow seemed simple:

Agent Requests Tool  
↓  
Approval Required  
↓  
Human Approves  
↓  
Tool Executes

In practice, implementing that workflow exposed an entirely different problem.

The system now needed to remember unfinished actions.

A pending approval is not just a UI state.

It represents an incomplete execution that may continue minutes later.

That meant introducing:

- Approval stores
- Pending execution tracking
- Approval identifiers
- Execution resumption

Something that looked like a small feature ended up introducing an entirely new category of state management.

## Observability Matters More Than Intelligence

One lesson kept appearing throughout development.

Understanding what the agent did was often more valuable than making it slightly smarter.

Without visibility, debugging agent behavior becomes extremely difficult.

When something goes wrong, questions immediately appear:

- Which tool was selected?
- What arguments were generated?
- Which policy was evaluated?
- Why was execution blocked?
- Was approval requested?
- What happened after approval?

Answering those questions required building logging and observability into the system from the beginning.

The dashboard eventually became one of the most useful parts of the project.

Not because it made the agent smarter.

Because it made the agent understandable.

## MCP Changed How I Think About Tools

Before building this project, I mostly thought about tools as functions attached directly to an agent.

MCP encourages a different model.

Tools become external capabilities that can be discovered dynamically.

The agent does not necessarily know ahead of time what tools exist.

That flexibility is powerful.

It also introduces new governance challenges.

Every new tool becomes a potential security and policy surface.

The more extensible the system becomes, the more important runtime controls become.

Extensibility and governance end up growing together.

## State Is the Hidden Complexity

The most surprising lesson was how much state accumulates around an agent.

The actual LLM call is often the simplest part.

The surrounding system quickly starts collecting information:

- Conversation history
- Retrieved memories
- Tool decisions
- Policy decisions
- Approval requests
- Pending executions
- Audit logs

At first, everything lived in memory.

That worked during development.

Eventually it became obvious that a restart would erase critical information.

The project gradually moved from being a collection of functions to becoming a system that manages state over time.

That shift changed how I think about agent engineering.

## What I Would Build Differently

If I started again, I would think about governance much earlier.

My initial focus was on getting tools to work.

Today I would start by asking:

- What actions should be allowed?
- What actions require approval?
- How will decisions be audited?
- How will policies evolve over time?

Those questions shape the architecture far more than tool implementations themselves.

The agent is only one component.

The control plane around the agent is where much of the interesting engineering lives.

## Looking Ahead

Building this project changed how I think about AI agents.

I no longer view them primarily as reasoning systems.

I increasingly view them as distributed systems that happen to contain language models.

Reasoning is important.

But reasoning alone is not enough.

As agents gain access to more tools and more powerful capabilities, governance, observability, approvals, and policy enforcement become first-class engineering concerns.

Building an MCP agent taught me that the hardest problem is not getting the model to take actions.

The harder problem is deciding which actions it should be allowed to take.
