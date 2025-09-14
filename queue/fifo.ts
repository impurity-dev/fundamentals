import type { Comparator } from '@core/mod.ts';
import { type IBoundedQueue, type IQueue, QueueOverflowError } from './queue.ts';
import type { Sorter } from '@core/mod.ts';

export class FifoQueue<T> implements IQueue<T> {
    protected queue: Array<T> = [];

    enqueue(item: T): void {
        this.queue.push(item);
    }

    dequeue(): T | undefined {
        return this.queue.shift();
    }

    peek(): T | undefined {
        return this.queue[0];
    }

    back(): T | undefined {
        return this.queue[this.queue.length - 1];
    }

    size(): number {
        return this.queue.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    clear(): void {
        this.queue = [];
    }

    toArray(): T[] {
        return [...this];
    }

    toArrayReverse(): T[] {
        return [...this];
    }

    *[Symbol.iterator](): IterableIterator<T> {
        for (const item of this.queue) {
            yield item;
        }
    }

    *reverse(): IterableIterator<T> {
        for (let i = this.queue.length - 1; i >= 0; i--) {
            yield this.queue[i];
        }
    }

    toString(): string {
        return [...this].toString();
    }
}

export class BoundedFifoQueue<T> extends FifoQueue<T> implements IBoundedQueue<T> {
    constructor(private readonly maxSize: number) {
        super();
    }

    override enqueue(item: T): void {
        if (this.isFull()) {
            throw new QueueOverflowError('The queue is at max capacity. Capacity=' + this.maxSize);
        }
        super.enqueue(item);
    }

    capacity(): number {
        return this.maxSize;
    }

    isFull(): boolean {
        return this.queue.length === this.maxSize;
    }
}
