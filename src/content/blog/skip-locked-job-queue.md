---
title: "A job queue in pure Postgres with SKIP LOCKED"
description: "You don't always need Redis or RabbitMQ. FOR UPDATE SKIP LOCKED turns a plain table into a safe multi-worker job queue — here's the pattern and its sharp edges."
publishDate: 2026-04-02
tags: ["postgres", "backend"]
draft: false
---

Every project eventually needs background jobs, and the reflex is to add another
piece of infrastructure. But if you're already running PostgreSQL, you may
already have a perfectly good queue.

## The core trick

The problem with a naive `jobs` table is contention: two workers `SELECT` the
same row, both process it, chaos. Postgres solves this in one clause:

```sql
WITH next_job AS (
    SELECT id FROM jobs
    WHERE status = 'pending'
    ORDER BY created_at
    FOR UPDATE SKIP LOCKED
    LIMIT 1
)
UPDATE jobs
SET status = 'running', started_at = now()
FROM next_job
WHERE jobs.id = next_job.id
RETURNING jobs.*;
```

`FOR UPDATE` locks the selected row. `SKIP LOCKED` tells other transactions:
don't wait for locked rows, just skip past them and grab the next one. Each
worker atomically claims a distinct job. No double-processing, no polling storms,
no distributed-lock service.

## The sharp edges

- **Crashed workers.** A worker that dies mid-job leaves a row stuck in
  `running`. You need a reaper: a periodic query that resets jobs whose
  `started_at` is older than a timeout.
- **Retries.** Add an `attempts` counter and move jobs to a `failed` state after
  N tries, ideally with exponential backoff encoded in a `run_after` timestamp.
- **Ordering is best-effort.** SKIP LOCKED means strict FIFO is gone by design.
  If you need exact ordering per key, partition your claim query on that key.
- **Bloat.** Completed jobs pile up. Either delete them on completion or
  partition the table by day and drop old partitions.

## When to graduate

This pattern comfortably handles thousands of jobs per second on modest
hardware. You graduate to a real broker when you need fan-out to many consumers,
cross-language delivery guarantees, or throughput past what a single Postgres
primary can absorb. For everything before that point: one table, one query, zero
new infrastructure.
