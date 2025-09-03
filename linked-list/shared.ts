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
     * Returns an iterator of the values in the linked list.
     * @returns An iterator over the values in the linked list.
     */
    values(): IterableIterator<T>;

    /**
     * Returns an iterator of the indices (keys) in the linked list.
     * @returns An iterator over the indices of the linked list.
     */
    keys(): IterableIterator<number>;

    /**
     * Returns an iterator of [index, value] pairs for each element in the linked list.
     * @returns An iterator over [index, value] pairs.
     */
    entries(): IterableIterator<[number, T]>;

    /**
     * Executes a provided function once for each element in the linked list, in order.
     * @param fn - The function to execute for each element, receiving the value and its index as arguments.
     */
    forEach(fn: (value: T, index: number) => void): void;

    /**
     * Creates a new iterator by applying a mapping function to each element in the linked list.
     * @param fn - The mapping function, receiving the value and index.
     * @returns An iterator over the mapped values.
     */
    map<U>(fn: (value: T, index: number) => U): IterableIterator<U>;

    /**
     * Creates a new iterator by applying a mapping function to each element in the linked list,
     * and then flattening the result into a single sequence.
     *
     * This is similar to calling `map` followed by `flat`, but more efficient.
     * For each element in the list, the provided function is called with the value and its index,
     * and should return an iterable of zero or more elements. The resulting iterables are concatenated
     * into a single iterator.
     *
     * @param fn - The mapping function, receiving the value and index, and returning an iterable of mapped values.
     * @returns An iterator over the flattened, mapped values.
     */
    flatMap<U>(fn: (value: T, index: number) => Iterable<U>): IterableIterator<U>;

    /**
     * Reduces the linked list to a single value using the provided reducer function and initial value.
     * @param fn - The reducer function, receiving the accumulator, value, and index.
     * @param init - The initial accumulator value.
     * @returns The reduced value.
     */
    reduce<U>(fn: (acc: U, value: T, index: number) => U, init: U): U;

    /**
     * Returns an iterator of elements that satisfy the provided predicate function.
     * @param fn - The predicate function, receiving the value and index.
     * @returns An iterator over the filtered values.
     */
    filter(fn: (value: T, index: number) => boolean): IterableIterator<T>;

    /**
     * Returns an iterator of the first `n` elements in the linked list.
     * @param n - The number of elements to take.
     * @returns An iterator over the first `n` elements.
     */
    take(n: number): IterableIterator<T>;

    /**
     * Returns an iterator of the elements in the linked list after skipping the first `n` elements.
     * @param n - The number of elements to skip.
     * @returns An iterator over the remaining elements after skipping `n`.
     */
    drop(n: number): IterableIterator<T>;

    /**
     * Finds the first element that satisfies the provided predicate function.
     * @param fn - The predicate function, receiving the value and index.
     * @returns The first matching value, or undefined if none found.
     */
    find(fn: (value: T, index: number) => boolean): T | undefined;

    /**
     * Checks whether all elements satisfy the provided predicate function.
     * @param fn - The predicate function, receiving the value and index.
     * @returns True if all elements satisfy the predicate, otherwise false.
     */
    every(fn: (value: T, index: number) => boolean): boolean;

    /**
     * Checks whether at least one element satisfies the provided predicate function.
     * @param fn - The predicate function, receiving the value and index.
     * @returns True if any element satisfies the predicate, otherwise false.
     */
    some(fn: (value: T, index: number) => boolean): boolean;

    /**
     * Converts the linked list to an array.
     * @returns An array containing all elements of the linked list.
     */
    toArray(): T[];

    /**
     * Clones the linked list into a new copy.
     */
    clone(): ILinkedList<T>;

    /**
     * Returns an iterator for iterating over the elements of the linked list in forward order.
     * @returns An iterator for the linked list.
     */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns an iterator for iterating over the elements of the linked list in reverse order.
     * @returns An iterable iterator for the linked list in reverse order.
     */
    reverse(): IterableIterator<T>;
}

/**
 * Represents a linked list where each node can have its own list of child nodes,
 * enabling the creation of nested or hierarchical linked list structures.
 *
 * @typeParam T - The type of value stored in each node.
 * @typeParam K - The type representing a node in the linked list.
 *
 * Extends the {@link ILinkedList} interface to provide additional methods for managing
 * child nodes, including adding, retrieving, and removing children, as well as flattening
 * the nested structure into a single list.
 */
export interface INestedLinkedList<T, K> extends ILinkedList<K> {
    /**
     * Adds a child node with the specified value to the node at the given parent index.
     * @param parentIndex - The index of the parent node.
     * @param value - The value of the child node to add.
     */
    addChild(parentIndex: number, value: T): void;

    /**
     * Retrieves the children of the node at the specified index.
     * @param parentIndex - The index of the parent node.
     * @returns An array of child nodes, or undefined if the parent does not exist.
     */
    getChildren(parentIndex: number): K[] | undefined;

    /**
     * Removes the child node at the specified child index from the parent node at the given parent index.
     * @param parentIndex - The index of the parent node.
     * @param childIndex - The index of the child node to remove.
     * @returns The removed child node, or undefined if not found.
     */
    removeChild(parentIndex: number, childIndex: number): K | undefined;

    /**
     * Flattens the nested linked list structure into a single-level linked list.
     * This operation traverses all nodes and their children, combining them into a flat sequence.
     *
     * @returns The head node of the flattened linked list, or `undefined` if the list is empty.
     */
    flatten(): K | undefined;
}
