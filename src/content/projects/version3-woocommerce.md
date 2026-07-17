---
title: "Version3 AI for WooCommerce"
summary: "A production WordPress plugin architected from zero: a durable dispatch queue that sidesteps WP-Cron's reliability limits, OAuth 2.0 PKCE auth, per-tenant HMAC-signed webhooks, and full architecture docs."
year: "2026"
category: "backend"
badge: "Production"
stack: ["PHP", "WooCommerce", "OAuth PKCE", "MySQL"]
links: {}
featured: false
order: 5
---

A production WordPress/WooCommerce integration built from the ground up at
Version3.ai. The core pieces:

- a **durable dispatch queue** that sidesteps WP-Cron's reliability limits;
- an **OAuth 2.0 PKCE** authentication flow;
- **per-tenant HMAC-signed webhooks**;
- full architecture documentation with locked design decisions.

The hard part in the WordPress world is reliability guarantees — WP-Cron only
fires on traffic, so anything time-sensitive needs its own durable machinery.

<!-- TODO: add a link if any part becomes public -->
