---
title: "Why AyahBot v4 went polyglot"
description: "Rewriting a Qur'an verse bot as several services in different languages — when that's a real architectural win and when it's just résumé-driven complexity."
publishDate: 2026-07-10
tags: ["architecture", "typescript", "projects"]
draft: true
---

AyahBot's job is small: deliver Qur'an verses with translations, on schedule,
reliably. Version 4 rebuilt it as a polyglot system — multiple services, more
than one language. This post is the honest argument for why, including the parts
where "use the right tool" shades into "use the tool I wanted to practice."

> Seed post for the blog pipeline. Kamrul: this is drawn from your v4 work but
> the specifics below are placeholders — fill in the real component split before
> flipping `draft: false`.

## The temptation to keep it monolithic

A single-language service is the correct default. One runtime, one dependency
tree, one deploy, one mental model. You reach for more only when a boundary in
the problem is *already* there and the languages fall on either side of it.

:::warning
"Polyglot architecture" is one of the easiest ways to turn a weekend project
into an operations burden. Every language you add is another toolchain, another
set of CVEs to track, and another way for the deploy to fail at 2 a.m. Justify
each one.
:::

## Where the seams actually were

<!-- TODO: replace with the real v4 breakdown -->

The split that earned its keep in v4:

- **Scheduling and delivery** — the always-on part, latency-tolerant, mostly
  I/O. TypeScript, because the ecosystem for the delivery targets lives there.
- **The heavier processing path** — where a JVM's maturity and libraries paid
  off enough to be worth the second runtime.

The rule I held myself to: a new language has to remove more complexity from one
side of a boundary than the boundary itself adds.

## What I'd tell past-me

If the only reason a component is in a second language is "I wanted to," collapse
it back. The polyglot version of AyahBot is better than v3 not because it uses
more languages, but because the boundaries were already real and the split made
each side simpler to reason about.

That's the whole test, and it's worth applying before the first `git init`, not
after.
