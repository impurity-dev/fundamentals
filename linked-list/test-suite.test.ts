import { assertEquals } from '@std/assert/equals';
import fc from 'fast-check';
import { assertThrows } from '@std/assert/throws';
import type { LinkedList } from './linked-list.ts';

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

type TestList = LinkedList<SafeAny, { value: SafeAny }>;

const assertAll = (actual: TestList, expected: Array<SafeAny>) => {
    const reverseExpected = [...expected].reverse();
    if (actual.head) assertEquals(actual.head.value, expected[0], 'head does not match');
    if (actual.tail) assertEquals(actual.tail.value, expected[expected.length - 1], 'tail does not match');
    assertEquals(actual.length, expected.length, 'length does not match');
    assertEquals(actual.isEmpty(), expected.length === 0, 'isEmpty does not match');
    assertEquals(actual.toArray().length, expected.length, 'toArray does not match');
    assertEquals(Array.from([...actual]), expected, 'iterator does not match');
    assertEquals(Array.from([...actual.reverse()]), reverseExpected, 'reverseIterator does not match');
    expected.forEach((item, index) => {
        assertEquals(actual.contains(item), true, 'contains does not match');
        assertEquals(actual.get(index), item, 'get does not match');
    });
    assertEquals(actual, actual.clone(), 'clone does not match');
};

export const run = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    constructor(name, createList);
    insertAtHead(name, createList);
    insertAtTail(name, createList);
    insertAt(name, createList);
    removeAtHead(name, createList);
    removeAtTail(name, createList);
    removeAt(name, createList);
    get(name, createList);
    contains(name, createList);
};

const constructor = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}] new ${name}([values])`, async (t) => {
        await t.step('should initialize', () => {
            fc.assert(
                fc.property(safeArray, (items) => {
                    const actual = createList(items);

                    const expected = [...items];
                    assertAll(actual, expected);
                }),
                { verbose },
            );
        });
    });
};

const insertAtHead = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}].insertAtHead(value)`, async (t) => {
        await t.step('should insert at head when empty', () => {
            const initial: number[] = [];
            const actual = createList(initial);

            actual.insertAtHead(1);

            const expected = [1];
            assertAll(actual, expected);
        });

        await t.step('should insert at head not empty', () => {
            const initial: number[] = [1];
            const actual = createList(initial);

            actual.insertAtHead(2);

            const expected = [2, 1];
            assertAll(actual, expected);
        });

        await t.step('should insert at head', () => {
            fc.assert(
                fc.property(safeArray, safeArray, (inputs, initial) => {
                    const actual = createList(initial);

                    inputs.forEach((input) => actual.insertAtHead(input));

                    const expected = [...[...initial].reverse(), ...inputs].reverse();
                    assertAll(actual, expected);
                }),
                { verbose },
            );
        });
    });
};

const insertAtTail = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}].insertAtTail(value)`, async (t) => {
        await t.step('should insert at tail when empty', () => {
            const initial: number[] = [];
            const actual = createList(initial);

            actual.insertAtTail(1);

            const expected = [1];
            assertAll(actual, expected);
        });

        await t.step('should insert at tail not empty', () => {
            const initial: number[] = [1];
            const actual = createList(initial);

            actual.insertAtTail(2);

            const expected = [1, 2];
            assertAll(actual, expected);
        });

        await t.step('should insert at tail', () => {
            fc.assert(
                fc.property(safeArray, safeArray, (inputs, initial) => {
                    const actual = createList(initial);

                    inputs.forEach((input) => actual.insertAtTail(input));

                    const expected = [...initial, ...inputs];
                    assertAll(actual, expected);
                }),
                { verbose },
            );
        });
    });
};

const insertAt = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}].insertAt(index, value)`, async (t) => {
        await t.step('should throw if insert at index < 0', () => {
            const initial: number[] = [];
            const actual = createList(initial);

            assertThrows(() => actual.insertAt(-1, 1), 'negative index didnt throw');
        });

        await t.step('should throw if insert at index > length', () => {
            const initial: number[] = [];
            const actual = createList(initial);

            assertThrows(() => actual.insertAt(1, 1), 'overflow index didnt throw');
        });

        await t.step('should insert at head if insert at index == 0', () => {
            const initial: number[] = [];
            const actual = createList(initial);

            actual.insertAt(0, 1);

            const expected = [1];
            assertAll(actual, expected);
        });

        await t.step('should insert at tail if insert at index == length', () => {
            const initial: number[] = [1];
            const actual = createList(initial);

            actual.insertAt(1, 2);

            const expected = [1, 2];
            assertAll(actual, expected);
        });

        await t.step('should insert at', () => {
            fc.assert(
                fc.property(
                    safeArray,
                    indices,
                    safeAny,
                    (initial, index, value) => {
                        const actual = createList(initial);
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
    });
};

const removeAtHead = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}].removeAtHead()`, async (t) => {
        await t.step('should remove nothing at head when empty', () => {
            const initial: number[] = [];
            const actual = createList(initial);

            const actualRemoved = actual.removeAtHead();

            const expectedRemoved = undefined;
            const expected = [...initial];
            assertEquals(actualRemoved, expectedRemoved);
            assertAll(actual, expected);
        });

        await t.step('should remove at head if size 1', () => {
            const initial: number[] = [1];
            const actual = createList(initial);

            const actualRemoved = actual.removeAtHead();

            const expectedRemoved = 1;
            const expected: number[] = [];
            assertEquals(actualRemoved, expectedRemoved);
            assertAll(actual, expected);
        });

        await t.step('should remove at head', () => {
            fc.assert(
                fc.property(safeArray, fc.integer({ min: 1, max: 25 }), (initial, numberOfRemoves) => {
                    const actual = createList(initial);

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
    });
};

const removeAtTail = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}].removeAtTail()`, async (t) => {
        await t.step('should remove at tail', () => {
            fc.assert(
                fc.property(safeArray, fc.integer({ min: 1, max: 25 }), (initial, numberOfRemoves) => {
                    const actual = createList(initial);

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
    });
};

const removeAt = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}].removeAt(index, value)`, async (t) => {
        await t.step('should remove at', () => {
            fc.assert(
                fc.property(
                    safeArray,
                    indices,
                    (initial, index) => {
                        const actual = createList(initial);
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
    });
};

const get = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}].get(index)`, async (t) => {
        await t.step('should get', () => {
            fc.assert(
                fc.property(
                    safeArray,
                    indices,
                    (initial, index) => {
                        const actual = createList(initial);
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
    });
};

const contains = (name: string, createList: (initial: SafeAny[]) => TestList) => {
    Deno.test(`[${name}].contains(value, comparator)`, async (t) => {
        await t.step('should contains', () => {
            fc.assert(
                fc.property(
                    safeArray,
                    safeAny,
                    (initial, value) => {
                        const actual = createList(initial);
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
                        const actual = createList([...initial]);
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
};
