import type { Comparator, Sorter } from '@core/utils.ts';

/**
 * Represents a generic, indexable, and iterable linked list with support for forward and reverse operations.
 *
 * @typeParam T - Type of elements stored in the linked list.
 * @typeParam K - Type used as the key or index for nodes.
 */
export interface ILinkedList<T, K extends { value: T } = { value: T }> extends Iterable<T> {
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
     * Gets the number of elements in the list.
     * @returns The length of the list.
     * @example
     * ```ts
     * const size = list.length;
     * ```
     */
    get length(): number;

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
     * Inserts a value at the specified reverse index (0 = tail).
     * @param index - Reverse index to insert the value at.
     * @param value - The value to insert.
     * @returns void
     * @example
     * ```ts
     * list.insertAtReverse(index, value);
     * ```
     */
    insertAtReverse(index: number, value: T): void;

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

    /**
     * Removes and returns the value at the specified reverse index (0 = tail).
     * @param index - Reverse index of the value to remove.
     * @returns The removed value, or undefined if index is out of bounds.
     * @example
     * ```ts
     * const val = list.removeAtReverse(index);
     * ```
     */
    removeAtReverse(index: number): T | undefined;

    /**
     * Returns true if the list is empty.
     * @returns True if the list contains no elements, false otherwise.
     * @example
     * ```ts
     * const empty = list.isEmpty();
     * ```
     */
    isEmpty(): boolean;

    /**
     * Removes all elements from the list.
     * @returns void
     * @example
     * ```ts
     * list.clear();
     * ```
     */
    clear(): void;

    /**
     * Retrieves the value at the specified index (0 = head).
     * @param index - Index of the value to retrieve.
     * @returns The value at the index, or undefined if out of bounds.
     * @example
     * ```ts
     * const val = list.get(index);
     * ```
     */
    get(index: number): T | undefined;

    /**
     * Retrieves the value at the specified reverse index (0 = tail).
     * @param index - Reverse index of the value to retrieve.
     * @returns The value at the reverse index, or undefined if out of bounds.
     * @example
     * ```ts
     * const val = list.getReverse(index);
     * ```
     */
    getReverse(index: number): T | undefined;

    /**
     * Checks if the list contains a value.
     * @param value - The value to search for.
     * @param comparator - Optional function to customize equality.
     * @returns True if the value exists in the list, false otherwise.
     * @example
     * ```ts
     * const exists = list.contains(value);
     * ```
     */
    contains(value: T, comparator?: Comparator<T>): boolean;

    /**
     * Checks if the list contains a value when traversed in reverse (tail → head).
     * @param value - The value to search for.
     * @param comparator - Optional function to customize equality.
     * @returns True if the value exists, false otherwise.
     * @example
     * ```ts
     * const exists = list.containsReverse(value);
     * ```
     */
    containsReverse(value: T, comparator?: Comparator<T>): boolean;

    /**
     * Sorts the list in place using an optional comparator.
     * @param comparator - Optional comparison function (a, b) => number.
     * @example
     * ```ts
     * list.sort((a, b) => a - b);
     * ```
     */
    sort(sorter?: Sorter<T>): void;

    /**
     * Sorts the list in place and reverses the order using an optional comparator.
     * @param comparator - Optional comparison function (a, b) => number.
     * @example
     * ```ts
     * list.sortReverse((a, b) => a - b);
     * ```
     */
    sortReverse(sorter?: Sorter<T>): void;

    /**
     * Sorts the list in a new linked list using an optional comparator.
     * @param comparator - Optional comparison function (a, b) => number.
     * @returns The list itself, for chaining.
     * @example
     * ```ts
     * list.sort((a, b) => a - b);
     * ```
     */
    sorted(sorter?: Sorter<T>): ILinkedList<T>;

    /**
     * Sorts the list in a new linked list using an optional comparator.
     * @param comparator - Optional comparison function (a, b) => number.
     * @returns The list itself, for chaining.
     * @example
     * ```ts
     * list.sort((a, b) => a - b);
     * ```
     */
    sortedReverse(sorter?: Sorter<T>): ILinkedList<T>;

    /** Returns an iterator over values (head → tail).
     * @example
     * ```ts
     * for (const v of list.values()) {...}
     * ```
     */
    values(): IterableIterator<T>;

    /** Returns an iterator over values (tail → head).
     * @example
     * ```ts
     * for (const v of list.valuesReverse()) {...}
     * ```
     */
    valuesReverse(): IterableIterator<T>;

    /** Returns an iterator over indices (0 → length-1).
     * @example
     * ```ts
     * for (const k of list.keys()) {...}
     * ```
     */
    keys(): IterableIterator<number>;

    /** Returns an iterator over reverse indices (length-1 → 0).
     * @example
     * ```ts
     * for (const k of list.keysReverse()) {...}
     * ```
     */
    keysReverse(): IterableIterator<number>;

    /** Returns an iterator of [index, value] pairs (head → tail).
     * @example
     * ```ts
     * for (const [i, v] of list.entries()) {...}
     * ```
     */
    entries(): IterableIterator<[number, T]>;

    /** Returns an iterator of [reverseIndex, value] pairs (tail → head).
     * @example
     * ```ts
     * for (const [i, v] of list.entriesReverse()) {...}
     * ```
     */
    entriesReverse(): IterableIterator<[number, T]>;

    /** Execute a function for each element (head → tail).
     * @example
     * ```ts
     * list.forEach((v, i) => {...})
     * ```
     */
    forEach(fn: (value: T, index: number) => void): void;

    /** Executes a function for each element (tail → head).
     * @example
     * ```ts
     * list.forEachReverse((v, i) => {...})
     * ```
     */
    forEachReverse(fn: (value: T, index: number) => void): void;

    /** Maps elements to a new iterator (head → tail).
     * @example
     * ```ts
     * for (const v of list.map(v => v * 2)) {...}
     * ```
     */
    map<U>(fn: (value: T, index: number) => U): ILinkedList<U, { value: U }>;

    /** Maps elements to a new iterator (tail → head).
     * @example
     * ```ts
     * for (const v of list.mapReverse(v => v * 2)) {...}
     * ```
     */
    mapReverse<U>(fn: (value: T, index: number) => U): ILinkedList<U, { value: U }>;

    /** Reduces elements to a single value (head → tail).
     * @example
     * ```ts
     * const sum = list.reduce((acc, v) => acc + v, 0);
     * ```
     */
    reduce<U>(fn: (acc: U, value: T, index: number) => U, init: U): U;

    /** Reduces elements to a single value (tail → head).
     * @example
     * ```ts
     * const sum = list.reduceReverse((acc, v) => acc + v, 0);
     * ```
     */
    reduceReverse<U>(fn: (acc: U, value: T, index: number) => U, init: U): U;

    /** Filters elements (head → tail).
     * @returns A new list with the applied function
     * @example
     * ```ts
     * for (const v of list.filter(v => v % 2 === 0)) {...}
     * ```
     */
    filter(fn: (value: T, index: number) => boolean): ILinkedList<T, K>;

    /** Filters elements (tail → head).
     * @example
     * ```ts
     * for (const v of list.filterReverse(v => v % 2 === 0)) {...}
     * ```
     */
    filterReverse(fn: (value: T, index: number) => boolean): ILinkedList<T, K>;

    /** Takes first n elements (head → tail).
     * @example
     * ```ts
     * for (const v of list.take(3)) {...}
     * ```
     */
    take(n: number): IterableIterator<T>;

    /** Takes last n elements (tail → head).
     * @example
     * ```ts
     * for (const v of list.takeReverse(3)) {...}
     * ```
     */
    takeReverse(n: number): IterableIterator<T>;

    /** Skips first n elements (head → tail).
     * @example
     * ```ts
     * for (const v of list.drop(2)) {...}
     * ```
     */
    drop(n: number): IterableIterator<T>;

    /** Skips last n elements (tail → head).
     * @example
     * ```ts
     * for (const v of list.dropReverse(2)) {...}
     * ```
     */
    dropReverse(n: number): IterableIterator<T>;

    /** Finds first element satisfying predicate (head → tail).
     * @example
     * ```ts
     * const val = list.find(v => v > 5);
     * ```
     */
    find(fn: (value: T, index: number) => boolean): T | undefined;

    /** Finds first element satisfying predicate (tail → head).
     * @example
     * ```ts
     * const val = list.findReverse(v => v > 5);
     * ```
     */
    findReverse(fn: (value: T, index: number) => boolean): T | undefined;

    /** Checks all elements satisfy predicate (head → tail).
     * @example
     * ```ts
     * const allEven = list.every(v => v % 2 === 0);
     * ```
     */
    every(fn: (value: T, index: number) => boolean): boolean;

    /** Checks all elements satisfy predicate (tail → head).
     * @example
     * ```ts
     * const allEven = list.everyReverse(v => v % 2 === 0);
     * ```
     */
    everyReverse(fn: (value: T, index: number) => boolean): boolean;

    /** Checks any element satisfies predicate (head → tail).
     * @example
     * ```ts
     * const anyEven = list.some(v => v % 2 === 0);
     * ```
     */
    some(fn: (value: T, index: number) => boolean): boolean;

    /** Checks any element satisfies predicate (tail → head).
     * @example
     * ```ts
     * const anyEven = list.someReverse(v => v % 2 === 0);
     * ```
     */
    someReverse(fn: (value: T, index: number) => boolean): boolean;

    /** Converts to array (head → tail).
     * @example
     * ```ts
     * const arr = list.toArray();
     * ```
     */
    toArray(): T[];

    /** Converts to array (tail → head).
     * @example
     * ```ts
     * const arr = list.toArrayReverse();
     * ```
     */
    toArrayReverse(): T[];

    /** Returns a shallow clone of the list.
     * @example
     * ```ts
     * const copy = list.clone();
     * ```
     */
    clone(): ILinkedList<T, K>;

    /** Returns forward iterator (head → tail).
     * @example
     * ```ts
     * for (const v of list) {...}
     * ```
     */
    [Symbol.iterator](): IterableIterator<T>;

    /**
     * Returns reverse iterator (tail → head).
     * @example
     * ```ts
     * for (const v of list.reverse()) {...}
     * ```
     */
    reverse(): IterableIterator<T>;
}
