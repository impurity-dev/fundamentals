import { assertEquals } from '@std/assert/equals';
import fc from 'fast-check';
import { assertThrows } from '@std/assert/throws';
import type { ILinkedList } from './shared.ts';
import { DoublyLinkedList } from './doubly.ts';

const verbose = true;
const maxLength = 50;

const _safeAny = fc.oneof(
    fc.string(),
    fc.boolean(),
    fc.constant(null),
    fc.constant(undefined),
    fc.integer(),
    fc.float().filter((n) => !Number.isNaN(n)),
    fc.object({ maxDepth: 2 }),
);
const safeAny = fc.oneof(
    _safeAny,
    fc.array(_safeAny, { maxLength: 5 }),
);
type _SafeAny = string | boolean | null | undefined | number | Record<string, unknown>;
type SafeAny = _SafeAny | _SafeAny[];
const comparators = [
    (a: SafeAny, b: SafeAny) => a === b, // strict equality
    (a: SafeAny, b: SafeAny) => JSON.stringify(a) === JSON.stringify(b), // deep-ish
    (a: SafeAny, b: SafeAny) => typeof a === 'number' && typeof b === 'number' && Math.abs(a - b) < 1e-6, // fuzzy numbers
];
const safeArray = fc.array(safeAny, { maxLength });
const indices = fc.integer({ min: -1, max: maxLength + 1 });

const assertAll = (actual: ILinkedList<SafeAny>, expected: Array<SafeAny>) => {
    const reverseExpected = [...expected].reverse();
    assertEquals(actual.size(), expected.length, 'size does not match');
    assertEquals(actual.isEmpty(), expected.length === 0, 'isEmpty does not match');
    assertEquals(actual.toArray().length, expected.length, 'toArray does not match');
    assertEquals(Array.from([...actual]), expected, 'iterator does not match');
    assertEquals(Array.from([...actual.reverseIterator()]), reverseExpected, 'reverseIterator does not match');
    expected.forEach((item, index) => {
        assertEquals(actual.contains(item), true, 'contains does not match');
        assertEquals(actual.get(index), item, 'get does not match');
    });
    assertEquals(actual, actual.clone());
};

Deno.test('DoublyLinkedList', async (t) => {
    await t.step('should initialize', () => {
        fc.assert(
            fc.property(safeArray, (items) => {
                const actual = new DoublyLinkedList(items);

                const expected = [...items];
                assertAll(actual, expected);
            }),
            { verbose },
        );
    });

    await t.step('should insert at head', () => {
        fc.assert(
            fc.property(safeArray, safeArray, (inputs, initial) => {
                const actual = new DoublyLinkedList(initial);

                inputs.forEach((input) => actual.insertAtHead(input));

                const expected = [...[...initial].reverse(), ...inputs].reverse();
                assertAll(actual, expected);
            }),
            { verbose },
        );
    });

    await t.step('should insert at tail', () => {
        fc.assert(
            fc.property(safeArray, safeArray, (inputs, initial) => {
                const actual = new DoublyLinkedList(initial);

                inputs.forEach((input) => actual.insertAtTail(input));

                const expected = [...initial, ...inputs];
                assertAll(actual, expected);
            }),
            { verbose },
        );
    });

    await t.step('should insert at', () => {
        fc.assert(
            fc.property(
                safeArray,
                indices,
                safeAny,
                (initial, index, value) => {
                    const actual = new DoublyLinkedList(initial);
                    const expected = [...initial];
                    if (index < 0 || index > expected.length) {
                        assertThrows(() => actual.insertAt(index, value), 'insertAt did not throw when out of bounds');
                        assertAll(actual, expected);
                    } else {
                        actual.insertAt(index, value);
                        expected.splice(index, 0, value);
                        assertAll(actual, expected);
                    }
                },
            ),
            { verbose },
        );
    });

    await t.step('should remove at head', () => {
        fc.assert(
            fc.property(safeArray, fc.integer({ min: 1, max: 25 }), (initial, numberOfRemoves) => {
                const actual = new DoublyLinkedList(initial);

                const expected: Array<SafeAny> = [...initial];
                for (let i = 0; i < numberOfRemoves; i++) {
                    if (actual.isEmpty()) {
                        const actualRemoved = actual.removeAtHead();
                        assertEquals(actualRemoved, undefined);
                        assertAll(actual, expected);
                    } else {
                        const actualRemoved = actual.removeAtHead();
                        const expectedRemoved = expected.shift();
                        assertEquals(actualRemoved, expectedRemoved);
                        assertAll(actual, expected);
                    }
                }
            }),
            { verbose },
        );
    });

    await t.step('should remove at tail', () => {
        fc.assert(
            fc.property(safeArray, fc.integer({ min: 1, max: 25 }), (initial, numberOfRemoves) => {
                const actual = new DoublyLinkedList(initial);

                const expected: Array<SafeAny> = [...initial];
                for (let i = 0; i < numberOfRemoves; i++) {
                    if (actual.isEmpty()) {
                        const actualRemoved = actual.removeAtTail();
                        assertEquals(actualRemoved, undefined);
                        assertAll(actual, expected);
                    } else {
                        const actualRemoved = actual.removeAtTail();
                        const expectedRemoved = expected.pop();
                        assertEquals(actualRemoved, expectedRemoved);
                        assertAll(actual, expected);
                    }
                }
            }),
            { verbose },
        );
    });

    await t.step('should remove at', () => {
        fc.assert(
            fc.property(
                safeArray,
                indices,
                (initial, index) => {
                    const actual = new DoublyLinkedList(initial);
                    if (index < 0 || index >= initial.length) {
                        assertThrows(() => actual.removeAt(index), 'removeAt did not throw when out of bounds');
                        assertAll(actual, initial);
                    } else {
                        const expected = [...initial].slice();
                        const actualRemoved = actual.removeAt(index);
                        const expectedRemove = expected.splice(index, 1)[0];
                        assertEquals(actualRemoved, expectedRemove);
                        assertAll(actual, expected);
                    }
                },
            ),
            { verbose },
        );
    });

    await t.step('should get', () => {
        fc.assert(
            fc.property(
                safeArray,
                indices,
                (initial, index) => {
                    const actual = new DoublyLinkedList(initial);
                    const expected = [...initial];
                    if (index < 0 || index >= expected.length) {
                        assertThrows(() => actual.get(index), 'get out of range did not throw');
                    } else {
                        const expectedGet = initial[index];
                        const actualGet = actual.get(index);
                        assertEquals(actualGet, expectedGet);
                    }
                    assertAll(actual, expected);
                },
            ),
            { verbose },
        );
    });

    await t.step('should contains', () => {
        fc.assert(
            fc.property(
                safeArray,
                safeAny,
                (initial, value) => {
                    const actual = new DoublyLinkedList(initial);
                    const expected = [...initial];
                    const expectedContains = initial.includes(value);
                    const actualContains = actual.contains(value);
                    assertEquals(actualContains, expectedContains);
                    assertAll(actual, expected);
                },
            ),
            { verbose },
        );
    });

    await t.step('should contains with custom comparator', () => {
        fc.assert(
            fc.property(
                safeArray,
                safeAny,
                fc.integer({ min: 0, max: comparators.length - 1 }),
                (initial, value, comparatorIndex) => {
                    const comparator = comparators[comparatorIndex];
                    const actual = new DoublyLinkedList([...initial]);
                    const expected = [...initial];
                    const expectedContains = initial.some((cur) => comparator(cur, value));
                    const actualContains = actual.contains(value, comparator);
                    assertEquals(actualContains, expectedContains, 'custom comparator contains not equal');
                    assertAll(actual, expected);
                },
            ),
            { verbose },
        );
    });
});
