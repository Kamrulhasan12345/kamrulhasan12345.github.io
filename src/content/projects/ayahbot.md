---
title: "AyahBot v4"
summary: "A Qur'an verse bot rebuilt as a polyglot architecture — each component in the language that fits its job."
role: "Author"
stack: ["TypeScript", "Java", "Polyglot services"]
links: {}
# TODO: add repo link
featured: true
order: 1
---

AyahBot delivers Qur'an verses with translations on schedule. Version 4 was a
ground-up rebuild around a polyglot architecture: instead of forcing one
language to do everything, each component runs in the language that suits it,
communicating over well-defined boundaries.

<!-- TODO: expand with the actual v4 component breakdown and design decisions -->

The interesting part wasn't the feature list — it was drawing the service
boundaries so that the polyglot split paid for itself instead of becoming
operational overhead.
