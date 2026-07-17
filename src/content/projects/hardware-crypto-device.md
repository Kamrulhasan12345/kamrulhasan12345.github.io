---
title: "Hardware crypto device"
summary: "An ESP32-S3 + ATECC608B secure-element device, built specifically to be attacked — the end goal is fault-injection and power-analysis side-channel experiments against my own hardware."
year: "2026"
category: "hardware"
badge: "WIP"
stack: ["ESP32-S3", "ATECC608B", "Embedded C", "Side channels"]
links: {}
featured: true
order: 4
---

An ESP32-S3 paired with an ATECC608B secure element, so private keys live in
tamper-resistant hardware rather than flash. The twist: it's designed as a
target, not a product.

The end goal is running fault-injection and power-analysis side-channel
experiments against hardware I fully control — the practical half of a longer
hardware-security roadmap. Currently at the schematic and threat-model stage;
build log will land on the blog.

<!-- TODO: expand with threat model and design notes as the project progresses -->
