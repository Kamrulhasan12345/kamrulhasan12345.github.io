---
title: "Why llama.cpp was slow on my phone"
description: "Threads burned up to 5× more instructions spin-waiting on each other. Picking the right cores made decode 2.2–2.6× faster with up to 3.3× less energy."
publishDate: 2026-10-16
tags: ["llm", "android", "performance"]
draft: true
---

<!-- Outline only. Facts are from the LITTLETai README and resume; write the prose yourself. -->

## The setup

- Arm Create AI Optimization Challenge; phones with mixed big and small CPU cores (big.LITTLE).
- Baseline: llama.cpp defaults, all 8 cores.

## What the counters showed

- With all 8 cores busy, threads burned up to 5× more CPU instructions spin-waiting on each other.
- llama.cpp's core-pinning flag silently did nothing on Android.

## The fix

- Pick the right cores and thread counts per phone.
- Result: decode 2.2–2.6× faster with 2.6–3.3× less energy (8.5–11× on Arm's KleidiAI build).

## Making the numbers trustworthy

- Thermal cooldowns, randomized run order, energy and CPU-counter logging, 209 test assertions.
- Device: Helio G81 (2× Cortex-A75 + 6× Cortex-A55), Qwen2 1B Q4_0. One phone; say so.
- Tools: simpleperf, Perfetto.

## What I'd do next
