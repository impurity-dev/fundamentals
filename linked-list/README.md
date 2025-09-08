# 🟣 LinkedList TS

A **fully-typed, generic linked list library** for TypeScript and Deno. Supports **singly, doubly, and circly linked lists** with **type-safe operations** like `map`, `filter`,
`clone`, and `flatten`. Designed for modern TypeScript projects with **no `any` usage** and full subclass support.

---

## Features

- ✅ **Generic nodes and lists**: Fully type-safe with support for subclassing.
- ✅ **Singly and doubly linked lists** with shared base implementation.
- ✅ **Nested linked lists** for hierarchical data structures.
- ✅ **Immutable and mutable operations**: `map`, `clone`, `flatten`, `insertAt`, `removeAt`, etc.
- ✅ **Polymorphic `map` and `clone`** that return the correct subclass automatically.
- ✅ **Iterators**: `forEach`, `entries`, `entriesReverse`, `map`, `filter`.
- ✅ **No `any`**: strict TypeScript generics.

---

## Installation

```bash
# Deno
deno install --allow-read --allow-write https://deno.land/x/collections@v1/linked_list.ts

# Or import directly in your project
import { SinglyLinkedList, DoublyLinkedList } from "https://deno.land/x/collections@v1/linked_list.ts";
```
