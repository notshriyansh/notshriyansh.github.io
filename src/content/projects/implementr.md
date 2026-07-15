---
title: Implementr
description: Architecture-aware research reproduction platform that analyzes papers and repositories to generate implementation blueprints.
status: Active Development
featured: true
tags:
  - ai
  - software-engineering
  - developer-tools
  - architecture
---

## Overview

Research papers explain what should exist.

Repositories show what already exists.

The difficult part is determining what is missing between the two.

When engineers attempt to reproduce ideas from research papers inside real-world codebases, they face questions that traditional paper summarization tools and repository chatbots cannot answer:

- Which files should be modified?
- Which repository abstractions already implement parts of the paper?
- What concepts from the paper are already present?
- What architectural gaps still exist?
- Where should implementation actually begin?

Implementr is an architecture-aware research reproduction platform designed to answer those questions.

Instead of treating papers and repositories as isolated sources of information, Implementr analyzes both, extracts concepts from each, identifies overlaps and gaps, reasons about repository architecture, and generates implementation blueprints grounded in the actual codebase.

The goal is not automatic code generation.

The goal is to help engineers move from:

**Research Idea → Engineering Plan**

with significantly more context than a traditional Retrieval-Augmented Generation (RAG) workflow.

## Architecture

```text
Research Paper
        |
        v
Paper Understanding
        |
        v
Paper Concepts
        |
        |
        |
Repository
        |
        v
Repository Understanding
        |
        v
Repository Concepts
        |
        v
Concept Matching
        |
        v
Gap Analysis
        |
        v
Architecture Reasoning
        |
        v
Modification Targets
        |
        v
Implementation Blueprint
```

### Research Understanding

Research papers are downloaded, parsed, chunked, embedded, and indexed.

The platform supports:

- Paper ingestion
- Semantic retrieval
- Research Q&A
- Methodology analysis
- Engineering challenge extraction
- Research reproduction planning

### Repository Understanding

Repositories are scanned and indexed to build a structural understanding of the codebase.

Current capabilities include:

- Repository ingestion
- Code chunking
- Symbol extraction
- Semantic code retrieval
- Repository structure analysis
- Import graph construction
- Function and class indexing

### Concept Engine

The Concept Engine is the foundation of Implementr's reproduction workflow.

Concepts are extracted from:

- Research papers
- Repository symbols
- Repository structure

These concepts are then matched using semantic similarity and repository context.

Example:

```text
Paper Concept
"retrieval"

Repository Concept
"RetrievalService"

Match
0.91 similarity
```

This allows the system to identify which research ideas already exist inside the repository.

### Gap Analysis

After concept matching, Implementr identifies architectural gaps.

Example:

```text
Paper Concepts

- retriever
- generator
- memory

Repository Concepts

- retrieval
- vector
- search

Missing

- generator
- memory
```

These gaps become candidates for implementation work.

### Architecture Reasoning

Gap analysis alone is insufficient.

The system also reasons about:

- Relevant files
- Relevant symbols
- Execution flow
- Dependency relationships
- Modification points

This allows implementation recommendations to be grounded in actual repository structure rather than isolated code snippets.

### Research Reproduction Engine

The Research Reproduction Engine combines:

- Paper context
- Repository context
- Architecture context
- Concept mappings
- Architecture gaps

to answer:

> Can this paper be reproduced inside this repository, and what would need to change?

The output includes:

- Repository targets
- Required changes
- Training changes
- Evaluation changes
- Success criteria
- Risks
- Modification targets

### Blueprint Engine

The Blueprint Engine converts reproduction plans into implementation blueprints.

Each blueprint step contains:

- Target file
- Target symbol
- Change type
- Reason for modification
- Implementation steps
- Validation steps
- Expected outcome

The result is a repository-aware engineering plan that developers can directly execute.

## Technical Decisions

### Symbol-Aware Repository Understanding

Rather than treating repositories as collections of text chunks, Implementr extracts and indexes repository symbols.

Examples include:

- Classes
- Functions
- Methods

This enables retrieval at the architectural level rather than only the document level.

**Reasoning**

Implementation work happens around abstractions, not chunks of text. Symbol-level understanding provides significantly better grounding for engineering tasks.

### Concept Matching Instead of Pure Retrieval

Most repository assistants rely exclusively on retrieval.

Implementr introduces a concept layer between papers and repositories.

**Reasoning**

The most important question is often not:

> What is relevant?

but:

> What already exists and what is missing?

Concept matching enables that distinction.

### Architecture-Grounded Reasoning

Repository retrieval alone frequently misses relationships between files.

Implementr expands context using:

- Import relationships
- Execution paths
- Symbol relationships
- Repository graphs

**Reasoning**

Implementation decisions are architectural decisions. Architectural context is often more important than individual code snippets.

## Evaluation Framework

Implementr includes evaluation systems for measuring retrieval quality, architecture reasoning quality, and blueprint generation quality.

Current evaluation capabilities include:

- Retrieval Evaluation
- RAG Evaluation
- Architecture Evaluation
- Benchmark Runner
- Blueprint Evaluation

Blueprint evaluation measures:

- Target file correctness
- Target symbol correctness
- Gap coverage
- Implementation completeness
- Risk coverage

This allows blueprint quality to be measured rather than treated as a purely subjective output.

## Tradeoffs

### Precision Over Simplicity

The system performs multiple analysis stages before producing recommendations:

- Concept extraction
- Concept matching
- Gap analysis
- Architecture reasoning
- Blueprint generation

This increases latency but produces more grounded implementation guidance.

### Engineering Guidance Over Code Generation

Implementr focuses on helping engineers understand what should change rather than generating large volumes of code automatically.

This makes the system more useful for complex repositories where architectural decisions matter.

## Lessons Learned

### Retrieval Is Not Enough

Early versions of the project relied heavily on retrieval.

The results were often generic because the system lacked a deeper understanding of repository structure.

The biggest improvement came from introducing:

- Concept extraction
- Concept matching
- Architecture reasoning

rather than improving retrieval quality alone.

### The Hard Problem Is Identifying What Is Missing

Research papers describe desired behavior.

Repositories describe existing behavior.

The gap between those two states contains most of the engineering work.

That observation eventually became the core idea behind Implementr.

## Current Features

### Research Layer

- Paper Search
- PDF Ingestion
- Semantic Retrieval
- Research Q&A

### Repository Layer

- Repository Ingestion
- Repository Search
- Repository Structure Analysis
- Repository File Viewer
- Secure File Access API
- Symbol Extraction
- Symbol Retrieval

### Concept Layer

- Concept Extraction
- Concept Indexing
- Concept Matching
- Concept Debugging APIs

### Architecture Layer

- Repository Graph Construction
- Execution Flow Analysis
- Context Expansion
- Architecture Reasoning
- Architecture Evaluation

### Reproduction Layer

- Research Reproduction Planning
- Concept Mapping
- Gap Analysis
- Modification Target Generation
- Risk Analysis
- Success Criteria Generation

### Blueprint Layer

- Symbol-Aware Blueprint Generation
- File-Level Change Planning
- Validation Planning
- Expected Outcome Generation
- Blueprint Evaluation

### Evaluation Layer

- Retrieval Benchmarks
- RAG Benchmarks
- Architecture Evaluation
- Blueprint Evaluation
- Benchmark Runner

## Current Product Flow

```text
Research Paper
        +
Repository
        |
        v
Concept Extraction
        |
        v
Concept Matching
        |
        v
Gap Analysis
        |
        v
Architecture Reasoning
        |
        v
Research Reproduction Plan
        |
        v
Implementation Blueprint
        |
        v
Evaluation
```

## Future Work

### Blueprint Benchmarking

Build benchmark datasets for measuring:

- File targeting accuracy
- Symbol targeting accuracy
- Gap coverage
- Blueprint quality

### Symbol Navigation

Add symbol-level repository navigation so blueprint targets can jump directly to implementation locations inside the repository viewer.

### Blueprint-to-Code Workflows

Extend blueprints into implementation workflows with repository-aware code generation assistance.

### Research Reproduction Benchmarks

Create evaluation datasets that measure:

- Concept matching accuracy
- Gap detection quality
- Reproduction planning quality

### Architecture Benchmarks

Expand architecture evaluation with curated repositories and expected execution-flow datasets.

## Vision

Most AI coding systems answer questions.

Implementr is designed to answer a different one:

> Given a research paper and a repository, what exactly must change to reproduce the paper here?

The long-term goal is to make research reproduction significantly more accessible by helping engineers understand not only what a paper proposes, but how those ideas fit into a real software system.
