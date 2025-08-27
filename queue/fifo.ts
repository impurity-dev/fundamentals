import type { Comparator } from '../shared/mod.ts';
import { type IBoundedQueue, type IQueue, QueueOverflowError } from './shared.ts';

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
        return [...this.queue];
    }

    contains(item: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        return this.queue.some((value) => comparator(value, item));
    }

    *reverseIterator(): IterableIterator<T> {
        for (let i = this.queue.length - 1; i >= 0; i--) {
            yield this.queue[i];
        }
    }

    [Symbol.iterator](): Iterator<T> {
        let index = 0;
        const data = this.queue;
        return {
            next(): IteratorResult<T> {
                if (index < data.length) {
                    return { value: data[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
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
