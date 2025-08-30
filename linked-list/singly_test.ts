import { assertEquals } from '@std/assert/equals';
import { SinglyLinkedList } from './singly.ts';
import fc from 'fast-check';

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
                const list = new SinglyLinkedList<SafeAny>(items);

                assertEquals(list.size(), items.length, 'size does not match');
                assertEquals(list.isEmpty(), list.size() === 0, 'isEmpty does not match');
                assertEquals(list.toArray().length, items.length, 'toArray does not match');
                assertEquals(Array.from([...list]), items, 'iterator does not match');
                assertEquals(Array.from([...list.reverseIterator()]), [...items].reverse(), 'reverseIterator does not match');
                items.forEach((item, index) => {
                    assertEquals(list.contains(item), true, 'contains does not match');
                    assertEquals(list.get(index), item, 'get does not match');
                });
            }),
            { verbose },
        );
    });

    await t.step('should insert at head', () => {
        fc.assert(
            fc.property(fc.array(safeAny, { maxLength }), fc.array(safeAny, { maxLength }), (inputs, initial) => {
                const list = new SinglyLinkedList<SafeAny>(initial);

                inputs.forEach((input) => list.insertAtHead(input));

                const expected = [...[...initial].reverse(), ...inputs];
                assertEquals(list.size(), expected.length, 'size does not match');
                assertEquals(list.isEmpty(), list.size() === 0, 'isEmpty does not match');
                assertEquals(list.toArray().length, expected.length, 'toArray does not match');
                assertEquals(Array.from([...list]), [...expected].reverse(), 'iterator does not match');
                assertEquals(Array.from([...list.reverseIterator()]), expected, 'reverseIterator does not match');
                [...expected].reverse().forEach((item, index) => {
                    assertEquals(list.contains(item), true, 'contains does not match');
                    assertEquals(list.get(index), item, 'get does not match');
                });
            }),
            { verbose },
        );
    });

    await t.step('should insert at tail', () => {
        fc.assert(
            fc.property(fc.array(safeAny, { maxLength }), fc.array(safeAny, { maxLength }), (inputs, initial) => {
                const list = new SinglyLinkedList<SafeAny>(initial);

                inputs.forEach((input) => list.insertAtTail(input));

                const expected = [...initial, ...inputs];

                assertEquals(list.size(), expected.length, 'size does not match');
                assertEquals(list.isEmpty(), list.size() === 0, 'isEmpty does not match');
                assertEquals(list.toArray().length, expected.length, 'toArray does not match');
                assertEquals(Array.from([...list]), expected, 'iterator does not match');
                assertEquals(Array.from([...list.reverseIterator()]), [...expected].reverse(), 'reverseIterator does not match');
                expected.forEach((item, index) => {
                    assertEquals(list.contains(item), true, 'contains does not match');
                    assertEquals(list.get(index), item, 'get does not match');
                });
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
                    const list = new SinglyLinkedList<SafeAny>(initial);
                    const expected = [...initial];

                    if (index < 0 || index > expected.length) {
                        // Out-of-bounds should throw
                        let threw = false;
                        try {
                            list.insertAt(index, value);
                        } catch {
                            threw = true;
                        }
                        assertEquals(threw, true, 'insertAt did not throw when out of bounds');
                    } else {
                        // Insert at index
                        list.insertAt(index, value);
                        expected.splice(index, 0, value);

                        // Forward iteration matches expected array
                        assertEquals(list.size(), expected.length, 'size does not match');
                        assertEquals(list.isEmpty(), list.size() === 0, 'isEmpty does not match');
                        assertEquals(list.toArray().length, expected.length, 'toArray does not match');
                        assertEquals(Array.from([...list]), expected, 'iterator does not match');
                        assertEquals(Array.from([...list.reverseIterator()]), [...expected].reverse(), 'reverseIterator does not match');
                        expected.forEach((item, index) => {
                            assertEquals(list.contains(item), true, 'contains does not match');
                            assertEquals(list.get(index), item, 'get does not match');
                        });
                    }
                },
            ),
            { verbose },
        );
    });

    // await t.step('should remove at head', () => {
    //     fc.assert(
    //         fc.property(fc.array(fc.anything(), { maxLength }), (initial) => {
    //             const list = new SinglyLinkedList<unknown>(initial);

    //             items.forEach((item) => list.insertAtHead(item));

    //             assertEquals(list.size(), items.length, 'size does not match');
    //             assertEquals(list.isEmpty(), list.size() === 0, 'isEmpty does not match');
    //             assertEquals(list.toArray().length, items.length, 'toArray does not match');
    //             assertEquals(Array.from([...list]), [...items].reverse(), 'iterator does not match');
    //             assertEquals(Array.from([...list.reverseIterator()]), items, 'reverseIterator does not match');
    //             [...items].reverse().forEach((item, index) => {
    //                 assertEquals(list.contains(item), true, 'contains does not match');
    //                 assertEquals(list.get(index), item, 'get does not match');
    //             });
    //         }),
    //         { verbose },
    //     );
    // });
});
