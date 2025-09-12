import type { IIterable } from '@core/mod.ts';

export interface IQueue<T> extends IIterable<T, number> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T | undefined;
    back(): T | undefined;
}

export interface IBoundedQueue<T> extends IQueue<T> {
    capacity(): number;
    isFull(): boolean;
}

export class QueueOverflowError extends Error {}
