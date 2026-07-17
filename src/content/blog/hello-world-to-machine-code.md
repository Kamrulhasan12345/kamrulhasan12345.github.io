---
title: "What actually happens when you compile Hello World"
description: "Everyone's first program is also one of the deepest rabbit holes in computing. A tour from printf to opcodes: preprocessing, compilation, assembly, and linking."
publishDate: 2026-06-20
tags: ["compilers", "systems", "c"]
draft: false
---

Every programmer has written this:

```c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
```

Almost nobody has watched what happens next. `gcc hello.c` looks like one step.
It's four, and each one is a world of its own.

## Stage 1: Preprocessing

The preprocessor is a text-transformation machine. It inlines `stdio.h`,
expands macros, and strips comments. Run `gcc -E hello.c` and your 6-line
program becomes several hundred lines — mostly declarations pulled in from the
header.

Key insight: `#include` is literally copy-paste. That's why header guards exist.

## Stage 2: Compilation to assembly

`gcc -S hello.c` stops after translating C to assembly. On x86-64 you'll see
something like:

```asm
main:
    push   rbp
    mov    rbp, rsp
    lea    rdi, [rip + .LC0]
    call   puts
    mov    eax, 0
    pop    rbp
    ret
```

Notice two things. First, the compiler replaced `printf` with `puts` — no
format specifiers means no need for the heavier function. The optimizer is
already rewriting your program. Second, the string literal lives in a separate
read-only section (`.rodata`), referenced RIP-relative.

## Stage 3: Assembly to object code

The assembler (`gcc -c`) turns mnemonics into actual opcodes and produces an ELF
relocatable object file. Run `readelf -h hello.o` and you'll see it: sections
for `.text`, `.rodata`, symbol tables, and — crucially — *relocations*. The
object file doesn't know where `puts` lives yet. It leaves a hole and a note for
the linker.

## Stage 4: Linking

The linker resolves that hole. In a dynamically linked binary it doesn't even
patch in the real address of `puts` — it wires up a PLT/GOT indirection so the
address gets resolved at runtime by the dynamic loader. This is lazy binding,
and it's also why techniques like GOT overwrites exist in binary exploitation.

---

## Why this matters

If you only ever see `gcc hello.c && ./a.out`, the toolchain is magic. Once
you've walked the four stages, everything downstream starts making sense: why
undefined references appear at link time and not compile time, what a segfault
in `.rodata` means, why stripped binaries still expose PLT entries, how an
attacker thinks about a loaded process image.

The best debugging skill isn't knowing your language. It's knowing what your
language becomes.
