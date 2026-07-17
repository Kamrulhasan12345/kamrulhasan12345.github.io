---
title: "AyahBot v4"
summary: "A polyglot microservices bot: a TypeScript gateway (Natiq), a Rust gRPC node (Katib), a Rust worker (Barid), and a PostgreSQL job queue built on SELECT … FOR UPDATE SKIP LOCKED — each component with its own PRD."
year: "2025"
category: "systems"
stack: ["Rust", "TypeScript", "gRPC", "PostgreSQL"]
links: {}
featured: true
order: 2
---

AyahBot delivers Qur'an verses with translations on schedule. Version 4 is a
ground-up rebuild as a set of services, each in the language that suits its job,
communicating over well-defined boundaries:

- **Natiq** — a TypeScript gateway handling the delivery surface.
- **Katib** — a Rust gRPC node for the heavier request path.
- **Barid** — a Rust worker draining a durable job queue.

The queue is a plain PostgreSQL table using `SELECT … FOR UPDATE SKIP LOCKED`,
which gives safe concurrent draining without a broker. Every component has its
own PRD, so the boundaries were designed before any code was written — the split
had to make each side simpler, not just add languages.

<!-- TODO: add repo link -->
