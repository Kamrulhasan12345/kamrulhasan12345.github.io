---
title: "Ilham"
summary: "A hadith study platform on PostgreSQL: a read-only corpus layer powering analytical queries, and a transactional user layer with triggers, procedures, and a chain_strength() function encoding classical hadith-grading methodology."
year: "2026"
category: "islamic"
stack: ["PostgreSQL", "PL/pgSQL", "Database design"]
links: {}
featured: true
order: 3
---

Ilham is a hadith study platform built around a carefully designed PostgreSQL
schema, split into two layers:

- a **read-only corpus layer** that powers analytical queries across the hadith
  collections;
- a **transactional user layer** with triggers, stored procedures, and a
  `chain_strength()` function that encodes classical isnad-grading methodology in
  SQL.

The interesting work was translating a centuries-old scholarly grading system
into something a database can compute over reliably.

<!-- TODO: add repo link -->
