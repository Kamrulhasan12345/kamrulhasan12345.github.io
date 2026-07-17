---
title: "Running Arch on 6GB of RAM without suffering"
description: "Constraints are a feature. How zram, a lean window manager, and terminal-first tooling turn a modest laptop into a perfectly good systems-programming machine."
publishDate: 2026-03-08
tags: ["linux", "workflow"]
draft: false
---

My daily driver has 6GB of RAM. In 2026 that's supposed to be unusable. It
isn't — but only because Linux lets you choose what your machine spends memory
on.

## zram first

The single highest-impact change: compressed swap in RAM. With zram, pages get
compressed (typically 3:1 with zstd) instead of hitting disk. The practical
effect is that 6GB behaves closer to 10, and swap-in latency stays in
microseconds instead of milliseconds.

```ini
# /etc/systemd/zram-generator.conf
[zram0]
zram-size = ram / 2
compression-algorithm = zstd
```

Pair it with a small disk swapfile if you want hibernate — zram alone can't
hibernate, since its contents *are* RAM.

## Spend RAM where it thinks

A browser will happily eat 3GB. So the discipline is: the browser gets a tab
budget, and everything else lives in the terminal — Neovim instead of an IDE,
`tmux` instead of window sprawl. Language servers are the honest cost:
Intelephense indexing WooCommerce or clangd on a big C++ tree is where the real
memory goes, and that's fine. That's the machine doing actual work instead of
drawing chrome.

## The constraint is the curriculum

Here's the part I didn't expect: a small machine makes you a better systems
programmer. You learn what `smem` and `ps_mem` actually measure, why RSS lies,
what the OOM killer's scoring means, how page cache and available memory relate.
None of that sticks when you have 32GB and never feel pressure.

The machine you have is enough to learn almost everything worth learning. The
fancy hardware can come later — by then you'll actually know what to do with it.
