---
title: "Lexical analysis: the compiler's first gate"
description: "Before a compiler can understand your program, it has to stop seeing characters and start seeing tokens. On lexers, finite automata, and why maximal munch bites."
publishDate: 2026-05-14
tags: ["compilers", "theory"]
draft: false
---

A compiler never actually reads your code the way you do. The first thing it
does is destroy the text.

## From characters to tokens

The lexer's job is to take a flat stream of characters and group them into
**tokens** — the atoms of the language. Given:

```c
int count = 42;
```

the lexer emits something like:

```text
KEYWORD(int)  IDENT(count)  ASSIGN  INT_LIT(42)  SEMI
```

Whitespace and comments vanish here. The parser downstream never sees them. This
is why formatting doesn't matter to the machine — it was gone before parsing
even began.

## Regular languages under the hood

Token patterns are regular languages, which means every lexer is secretly a
finite automaton. The classic pipeline: write token rules as regexes, convert to
an NFA (Thompson's construction), determinize to a DFA (subset construction),
then minimize. Tools like `flex` automate the whole chain; handwritten lexers
just encode the DFA as a switch on the current character.

## Maximal munch, and where it bites

Lexers follow the *maximal munch* rule: always take the longest match. `>=` is
one token, not `>` then `=`. Usually this is what you want. Sometimes it
famously isn't — early C++ couldn't parse `vector<vector<int>>` because `>>`
lexed as the shift operator. The language spec eventually had to special-case
it.

That's the fun part of lexing: it's the simplest phase of a compiler, and it
still leaks design decisions into the language you use every day.

## Try it yourself

The best way to internalize this is to write a lexer for a toy language by hand
— no generator. A few hundred lines of C gets you keywords, identifiers,
numbers, and operators, and forever changes how you read error messages like
`unexpected token`.
