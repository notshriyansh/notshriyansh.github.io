---
title: Why I Started Building Implementr

description: Research papers explain what to build. Repositories show what already exists. The hard part is figuring out what is missing.

date: 2026-07-15

tags:
  - ai
  - software-engineering
  - architecture
  - implementr

draft: false
---

I have always enjoyed reading research papers.

The problem starts after the paper.

A paper might explain a new architecture, retrieval strategy, training technique, or optimization. Understanding the idea is one challenge. Figuring out how to implement that idea inside an existing codebase is a completely different problem.

Most AI tools help with retrieval.

They can search documents, answer questions about papers, or summarize repositories. But when I tried to move from research to implementation, I found myself asking questions that those tools could not answer:

- Which files would need to change?
- Which parts of the architecture are already present?
- What concepts from the paper already exist in the repository?
- What is missing?
- Where should implementation actually begin?

Those questions are less about information retrieval and more about engineering reasoning.

## The Original Idea

Initially, Implementr was much simpler.

Paper → RAG → Repository → Suggestions

The goal was to connect research papers with repositories and generate implementation recommendations.

At first, that seemed sufficient.

In practice, it was not.

The suggestions were often generic because the system lacked a deeper understanding of the repository itself.

## What Changed

The interesting problem is not retrieval.

The interesting problem is reasoning about codebases.

A repository is more than a collection of files. It contains architecture, execution flow, abstractions, dependencies, and engineering decisions that have evolved over time.

Understanding those relationships is far more valuable than simply retrieving code snippets.

That realization shifted the direction of the project.

Instead of asking:

> What information is relevant?

I started asking:

> What is already implemented, what is missing, and what needs to change?

## The Vision Behind Implementr

Implementr now attempts to bridge research and production engineering.

The system analyzes a research paper, analyzes a repository, extracts concepts from both, identifies overlaps and gaps, reasons about architecture, and produces implementation guidance grounded in the actual codebase.

The goal is not to automatically generate large amounts of code.

The goal is to help engineers answer a much more practical question:

> If I wanted to reproduce this research inside this repository, what exactly would need to change?

That question sits at the center of the project.

Everything else retrieval, concept matching, architecture reasoning, gap analysis, and blueprint generation exists to support that workflow.

## The Current Direction

Today, I think about Implementr as a pipeline:

Research Paper  
↓  
Repository Understanding  
↓  
Concept Matching  
↓  
Gap Analysis  
↓  
Implementation Blueprint

Research papers explain what should exist.

Repositories show what already exists.

The interesting work happens in the space between those two things.

That gap is what Implementr is trying to understand.

## Looking Ahead

The project is still evolving, but the vision has become much clearer.

I am less interested in building another AI chat interface and more interested in building tools that help engineers move from research ideas to production systems.

Bridging the gap between research and implementation is a problem I find genuinely exciting, and Implementr is my attempt to explore it.
