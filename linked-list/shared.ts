import type { Comparator } from '../shared/utils.ts';

/**
 * Represents a generic linked list data structure.
 *
 * @typeParam T - The type of elements stored in the linked list.
 *
 * @remarks
 * This interface defines the basic operations for a singly or doubly linked list.
 * Implementations may vary in their internal structure and performance characteristics.
 */
export interface ILinkedList<T> extends Iterable<T> {
    /**
     * Inserts a value at the head (beginning) of the linked list.
     * @param value - The value to insert.
     */
    insertAtHead(value: T): void;

    /**
     * Inserts a value at the tail (end) of the linked list.
     * @param value - The value to insert.
     */
    insertAtTail(value: T): void;

    /**
     * Inserts a value at the specified index in the linked list.
     * @param index - The position at which to insert the value.
     * @param value - The value to insert.
     */
    insertAt(index: number, value: T): void;

    /**
     * Removes and returns the value at the head (beginning) of the linked list.
     * @returns The removed value, or undefined if the list is empty.
     */
    removeAtHead(): T | undefined;

    /**
     * Removes and returns the value at the tail (end) of the linked list.
     * @returns The removed value, or undefined if the list is empty.
     */
    removeAtTail(): T | undefined;

    /**
     * Removes and returns the value at the specified index in the linked list.
     * @param index - The position from which to remove the value.
     * @returns The removed value, or undefined if the index is out of bounds.
     */
    removeAt(index: number): T | undefined;

    /**
     * Retrieves the value at the specified index in the linked list.
     * @param index - The position of the value to retrieve.
     * @returns The value at the specified index, or undefined if the index is out of bounds.
     */
    get(index: number): T | undefined;

    /**
     * Checks if the linked list contains the specified value.
     * @param value - The value to search for.
     * @returns True if the value is found, otherwise false.
     */
    contains(value: T, comparator?: Comparator<T>): boolean;

    /**
     * Checks if the linked list is empty.
     * @returns True if the list is empty, otherwise false.
     */
    isEmpty(): boolean;

    /**
     * Returns the number of elements in the linked list.
     * @returns The size of the linked list.
     */
    size(): number;

    /**
     * Converts the linked list to an array.
     * @returns An array containing all elements of the linked list.
     */
    toArray(): T[];

    /**
     * Returns an iterator for iterating over the elements of the linked list in forward order.
     * @returns An iterator for the linked list.
     */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an iterator for iterating over the elements of the linked list in reverse order.
     * @returns An iterable iterator for the linked list in reverse order.
     */
    reverseIterator(): IterableIterator<T>;
}
