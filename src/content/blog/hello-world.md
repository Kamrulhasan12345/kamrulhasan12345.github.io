---
title: "Reading a stack frame by hand"
description: "A short tour of what actually sits on the stack when a C function is called on x86-64 — registers, the red zone, and why the return address is where it is."
publishDate: 2026-07-15
tags: ["systems", "x86-64", "pwn"]
draft: true
---

Before you can smash a stack you have to be able to read one. This post walks a
single function call on x86-64 System V and names every byte the CPU touches, so
that a `gdb` backtrace stops being magic.

> Draft — still being edited. Marked `draft: true`, so it won't ship until that
> flag is flipped.

## The call, in slow motion

Take a function that does almost nothing:

```c
int add(int a, int b) {
    int sum = a + b;   // local, lives in the frame (or a register)
    return sum;
}
```

When `main` calls `add`, the `call` instruction does two things atomically: it
pushes the address of the *next* instruction in `main` onto the stack, then
jumps. That pushed value is the return address — the single most interesting
eight bytes in exploitation.

## What the frame looks like

Growing downward (toward lower addresses), immediately after the callee's
prologue:

```text
higher addresses
+------------------+
|   ... caller ... |
+------------------+
|  return address  |  <- pushed by `call`
+------------------+
|  saved rbp       |  <- pushed by `push rbp`
+------------------+  <- rbp points here
|  local: sum      |
+------------------+  <- rsp
lower addresses
```

The prologue that sets this up is the same three lines you'll read a thousand
times:

```asm
add:
    push rbp
    mov  rbp, rsp
    sub  rsp, 16        ; reserve space for locals
```

:::note
`rbp`-based frames are what you get at `-O0`. Turn on optimization and the
compiler will happily drop the frame pointer (`-fomit-frame-pointer`), address
locals relative to `rsp`, and keep `sum` in a register that never touches memory
at all.
:::

## The red zone

System V hands leaf functions a gift: the 128 bytes *below* `rsp` are
guaranteed not to be clobbered by signal handlers.[^redzone] A leaf function can
use that scratch space without moving `rsp` at all:

:::tip
If you're writing a shellcode stub or a signal-safe routine, the red zone is
free real estate — but only for leaf functions. The moment you `call` something,
that region is fair game again.
:::

## A little arithmetic

Why 16-byte alignment? The ABI requires that `rsp + 8` is 16-byte aligned at the
point of a `call`, so that the callee sees `rsp` aligned. If the reserved local
space is $n$ bytes, the compiler rounds up to

$$
n_{\text{aligned}} = \left\lceil \frac{n}{16} \right\rceil \times 16
$$

which is why a single 4-byte `int` still costs you a 16-byte `sub rsp`.

## Where this goes

Once the frame is legible, the classic questions answer themselves: overflow a
local, keep writing, and you eventually reach *saved rbp* and then the *return
address*. Overwrite the latter and the `ret` at the end of the epilogue jumps
wherever you point it.[^ret] That's the whole game, and it starts with being
able to draw this box.

[^redzone]: See the System V AMD64 ABI, §3.2.2. The kernel respects it too — it's
    not just a userspace convention.

[^ret]: `ret` is literally `pop rip`: it loads whatever is at `rsp` into the
    instruction pointer and bumps `rsp`. Nothing checks that the value is a
    legitimate return address.
