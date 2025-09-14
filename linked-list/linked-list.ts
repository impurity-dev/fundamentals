import type { Collection, Sorter } from '@core/utils.ts';

/**
 * Represents a generic, indexable, and iterable linked list with support for forward and reverse operations.
 *
 * @typeParam T - Type of elements stored in the linked list.
 * @typeParam K - Type used as the key or index for nodes.
 */
export interface LinkedList<T, K extends { value: T; next?: K }> extends Collection<T, number, LinkedList<unknown, { value: unknown }>> {
    /**
     * Gets the key of the head node, or `undefined` if the list is empty.
     * @returns The key of the head node, or undefined if empty.
     * @example
     * ```ts
     * const headKey = list.head;
     * ```
     */
    get head(): K | undefined;

    /**
     * Gets the key of the tail node, or `undefined` if the list is empty.
     * @returns The key of the tail node, or undefined if empty.
     * @example
     * ```ts
     * const tailKey = list.tail;
     * ```
     */
    get tail(): K | undefined;

    /**
     * Inserts a value at the head of the list.
     * @param value - The value to insert.
     * @returns void
     * @example
     * ```ts
     * list.insertAtHead(value);
     * ```
     */
    insertAtHead(value: T): void;

    /**
     * Inserts a value at the tail of the list.
     * @param value - The value to insert.
     * @returns void
     * @example
     * ```ts
     * list.insertAtTail(value);
     * ```
     */
    insertAtTail(value: T): void;

    /**
     * Inserts a value at the specified index (0 = head).
     * @param index - Index to insert the value at.
     * @param value - The value to insert.
     * @returns void
     * @example
     * ```ts
     * list.insertAt(index, value);
     * ```
     */
    insertAt(index: number, value: T): void;

    /**
     * Removes and returns the value at the head.
     * @returns The removed value, or undefined if the list is empty.
     * @example
     * ```ts
     * const val = list.removeAtHead();
     * ```
     */
    removeAtHead(): T | undefined;

    /**
     * Removes and returns the value at the tail.
     * @returns The removed value, or undefined if the list is empty.
     * @example
     * ```ts
     * const val = list.removeAtTail();
     * ```
     */
    removeAtTail(): T | undefined;

    /**
     * Removes and returns the value at the specified index (0 = head).
     * @param index - Index of the value to remove.
     * @returns The removed value, or undefined if index is out of bounds.
     * @example
     * ```ts
     * const val = list.removeAt(index);
     * ```
     */
    removeAt(index: number): T | undefined;
}
