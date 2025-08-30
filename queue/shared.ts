import type { Comparator } from '../shared/mod.ts';

export interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    back(): T | undefined;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    toArray(): T[];
    contains(item: T, comparator?: Comparator<T>): boolean;
    [Symbol.iterator](): Iterator<T>;
    reverseIterator(): IterableIterator<T>;
    toString(): string;
}

export interface IBoundedQueue<T> extends IQueue<T> {
    capacity(): number;
    isFull(): boolean;
}

export class QueueOverflowError extends Error {}
