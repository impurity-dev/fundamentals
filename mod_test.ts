import { assertEquals } from 'https://deno.land/std/assert/mod.ts';
import { sort } from './mod.ts';
import fc from 'fast-check';

Deno.test('sort() should sort positive', () => {
    const actual = sort([1, 0, 2]);
    assertEquals(actual, [0, 1, 2]);
});

Deno.test('sort() should sort negative', () => {
    const actual = sort([-1, 0, -2]);
    assertEquals(actual, [-2, -1, 0]);
});

Deno.test('sort() should sort duplicates', () => {
    const actual = sort([1, 1, 0, 2]);
    assertEquals(actual, [0, 1, 1, 2]);
});

Deno.test('sort() should sort empty', () => {
    const actual = sort([]);
    assertEquals(actual, []);
});

Deno.test('sort() should sort single', () => {
    const actual = sort([1]);
    assertEquals(actual, [1]);
});

Deno.test('sort() should not mutate original', () => {
    const actual = [1, 0, 2];
    sort(actual);
    assertEquals(actual, [1, 0, 2]);
});

Deno.test('sort() should use custom comparator', () => {
    const actual = sort<Record<'value', number>>([{ value: 1 }, { value: 0 }, {
        value: 2,
    }], (a, b) => a.value > b.value ? 1 : 0);
    assertEquals(actual.map(({ value }) => value), [0, 1, 2]);
});

Deno.test('property: output is always sorted', () => {
    fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
            const sorted = sort(arr);
            for (let i = 0; i < sorted.length - 1; i++) {
                if (sorted[i] > sorted[i + 1]) {
                    return false;
                }
            }
            return true;
        }),
    );
});

Deno.test('property: length is preserved', () => {
    fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
            return sort(arr).length === arr.length;
        }),
    );
});

Deno.test('property: elements are the same', () => {
    fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
            const sorted = sort(arr);
            const sortedCopy = [...sorted].sort((a, b) => a - b);
            const inputSorted = [...arr].sort((a, b) => a - b);
            return JSON.stringify(sortedCopy) === JSON.stringify(inputSorted);
        }),
    );
});

Deno.test('property: original array is unchanged', () => {
    fc.assert(
        fc.property(fc.array(fc.integer()), (arr) => {
            const original = [...arr];
            sort(arr);
            return JSON.stringify(arr) === JSON.stringify(original);
        }),
    );
});
