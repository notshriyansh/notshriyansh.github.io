---
title: AI Guardrails Agent
description: MCP-enabled AI agent runtime with policy enforcement, approval workflows, observability, and governance controls.
status: In development
featured: true
github: https://github.com/notshriyansh/ai-guardrails-agent
tags:
  - ai-agents
  - mcp
  - policy-engine
  - langgraph
  - governance
---

## Overview

As AI agents gain the ability to use tools, access external systems, and interact with real-world resources, controlling their behavior becomes just as important as improving their reasoning.

AI Guardrails Agent is an MCP-enabled agent runtime that introduces a governance layer between agent reasoning and tool execution. Rather than allowing the language model to directly invoke tools, every requested action is routed through a dedicated policy engine capable of blocking execution, requiring human approval, or allowing execution based on runtime rules.

The project demonstrates how to build secure AI systems where safety decisions are enforced outside the language model itself.

## Architecture

The agent is implemented as a multi-stage execution graph where reasoning, policy evaluation, tool execution, and response generation are separated into distinct nodes.

```text
+-------------+
| User Prompt |
+------+------+
       |
       v
+------+------+
|   Planner   |
+------+------+
       |
       v
+------+------+
| Memory Node |
+------+------+
       |
       v
+------+------+
| Reasoning   |
|    Node     |
+------+------+
       |
       v
+------+------+
|  Policy     |
|   Engine    |
+------+------+
       |
   +---+---+
   |       |
Denied   Approved
   |       |
   |       v
   | +-----+------+
   | | Tool Node  |
   | +-----+------+
   |       |
   |       v
   | +-----+------+
   | | MCP Server |
   | +-----+------+
   |       |
   +-------+
           |
           v
+----------+---------+
| Response Generator |
+--------------------+
```
