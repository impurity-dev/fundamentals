import { assertEquals } from '@std/assert/equals';
import { SinglyLinkedList } from './singly.ts';
import fc from 'fast-check';
import { assertThrows } from '@std/assert/throws';

const verbose = true;

const safeAny = fc.oneof(
    fc.string(),
    fc.boolean(),
    fc.constant(null),
    fc.constant(undefined),
    fc.integer(),
    fc.float().filter((n) => !Number.isNaN(n)),
    fc.object({ maxDepth: 2 }),
    fc.array(fc.string(), { maxLength: 5 }),
);
type SafeAny = string | boolean | null | undefined | number | string[] | Record<string, unknown>;
const maxLength = 50;

Deno.test('SinglyLinkedList', async (t) => {
    await t.step('should initialize', () => {
        fc.assert(
            fc.property(fc.array(safeAny, { maxLength }), (items) => {
                const actual = new SinglyLinkedList<SafeAny>(items);

                const expected = [...items];
                assertAll(actual, expected);
            }),
            { verbose },
        );
    });

    await t.step('should insert at head', () => {
        fc.assert(
            fc.property(fc.array(safeAny, { maxLength }), fc.array(safeAny, { maxLength }), (inputs, initial) => {
                const actual = new SinglyLinkedList<SafeAny>(initial);

                inputs.forEach((input) => actual.insertAtHead(input));

                const expected = [...[...initial].reverse(), ...inputs].reverse();
                assertAll(actual, expected);
            }),
            { verbose },
        );
    });

    await t.step('should insert at tail', () => {
        fc.assert(
            fc.property(fc.array(safeAny, { maxLength }), fc.array(safeAny, { maxLength }), (inputs, initial) => {
                const actual = new SinglyLinkedList<SafeAny>(initial);

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
                fc.array(safeAny, { maxLength }),
                fc.integer(),
                safeAny,
                (initial, index, value) => {
                    const actual = new SinglyLinkedList<SafeAny>(initial);
                    const expected = [...initial];
                    if (index < 0 || index > expected.length) {
                        assertThrows(() => actual.insertAt(index, value), 'insertAt did not throw when out of bounds');
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
            fc.property(fc.array(safeAny, { maxLength }), fc.integer({ min: 1, max: 25 }), (initial, numberOfRemoves) => {
                const actual = new SinglyLinkedList<SafeAny>(initial);

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
            fc.property(fc.array(safeAny, { maxLength }), fc.integer({ min: 1, max: 25 }), (initial, numberOfRemoves) => {
                const actual = new SinglyLinkedList<SafeAny>(initial);

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

const assertAll = (actual: SinglyLinkedList<SafeAny>, expected: Array<SafeAny>) => {
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
};
