
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { sort } from "./mod.ts";

Deno.test("sort() should sort populated", () => {
  const actual = sort([1,0,2]);
  assertEquals(actual, [0,1,2])
});

Deno.test("sort() should sort empty", () => {
  const actual = sort([]);
  assertEquals(actual, [])
});

Deno.test("sort() should use custom comparator", () => {
  class Item {
    constructor(public readonly value: number) {}
  }
  const actual =  sort<Item>([new Item(1),new Item(0),new Item(2)], (a, b) => a.value > b.value ? 1 : 0);
  assertEquals(actual.map(({ value }) => value), [0, 1, 2])
});