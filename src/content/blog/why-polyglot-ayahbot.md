---
title: "Why AyahBot v4 went polyglot"
description: "Rewriting a Qur'an verse bot as Rust and TypeScript services around a PostgreSQL queue — when a language boundary is a real architectural win and when it's just résumé-driven complexity."
publishDate: 2026-07-10
tags: ["architecture", "rust", "postgres"]
draft: true
---

AyahBot's job is small: deliver Qur'an verses with translations, on schedule,
reliably. Version 4 rebuilt it as a polyglot system — a TypeScript gateway, two
Rust services, and a PostgreSQL job queue. This is the honest argument for why,
including the parts where "use the right tool" shades into "use the tool I
wanted to practice."

> Draft — this is drawn from the real v4 architecture but still being edited.

## The temptation to keep it monolithic

A single-language service is the correct default. One runtime, one dependency
tree, one deploy, one mental model. You reach for more only when a boundary in
the problem is *already* there and the languages fall naturally on either side.

:::warning
"Polyglot architecture" is one of the easiest ways to turn a side project into
an operations burden. Every language you add is another toolchain, another set
of CVEs to track, and another way for the deploy to fail. Justify each one.
:::

## Where the seams actually were

The v4 split, and why each piece is where it is:

- **Natiq** — a TypeScript gateway on the delivery surface, where the ecosystem
  for the delivery targets already lives.
- **Katib** — a Rust gRPC node for the heavier request path, where predictable
  latency and tight memory behavior matter.
- **Barid** — a Rust worker draining the job queue.

The queue itself is the part I'm happiest with: a plain PostgreSQL table drained
with `SELECT … FOR UPDATE SKIP LOCKED`.

```sql
SELECT id, payload
FROM jobs
WHERE status = 'pending'
ORDER BY created_at
FOR UPDATE SKIP LOCKED
LIMIT 1;
```

`SKIP LOCKED` lets many workers pull from the same table without stepping on
each other — no broker, no extra moving part, just a property of the database I
already have.

## The rule I held myself to

A new language has to remove more complexity from one side of a boundary than
the boundary itself adds. Natiq and the Rust services pass that test because the
boundaries were real before the rewrite. If the only reason a component were in
a second language was "I wanted to," it would collapse back into its neighbor.

That's the whole test, and it's worth applying before the first `git init`, not
after.
