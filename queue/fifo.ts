import type { Collection, Comparator, Sorter } from '../core/utils.ts';
import { type IBoundedQueue, type IQueue, QueueOverflowError } from './queue.ts';

export class FifoQueue<T> implements IQueue<T> {
    get length(): number {
        throw new Error('Method not implemented.');
    }

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

    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) throw new RangeError('Index out of bounds');
        return this.queue[index];
    }

    contains(item: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        return this.queue.some((value) => comparator(item, value));
    }

    sort(sorter?: Sorter<T> | undefined): void {
        throw new Error('Method not implemented.');
    }

    values(): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }

    keys(): IterableIterator<number> {
        throw new Error('Method not implemented.');
    }

    entries(): IterableIterator<[number, T]> {
        throw new Error('Method not implemented.');
    }

    forEach(fn: (value: T, index: number) => void): void {
        throw new Error('Method not implemented.');
    }

    reduce<U>(fn: (acc: U, value: T, index: number) => U, init: U): U {
        throw new Error('Method not implemented.');
    }

    take(n: number): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }

    drop(n: number): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }

    find(fn: (value: T, index: number) => boolean): T | undefined {
        throw new Error('Method not implemented.');
    }

    every(fn: (value: T, index: number) => boolean): boolean {
        throw new Error('Method not implemented.');
    }

    some(fn: (value: T, index: number) => boolean): boolean {
        throw new Error('Method not implemented.');
    }

    clone() {
        throw new Error('Method not implemented.');
    }

    map<U>(fn: (value: T, index: number) => U): Collection<U, unknown, any> {
        throw new Error('Method not implemented.');
    }

    sorted(sorter?: Sorter<T> | undefined): Collection<T, number, any> {
        throw new Error('Method not implemented.');
    }

    filter(fn: (value: T, index: number) => boolean): Collection<T, number, any> {
        throw new Error('Method not implemented.');
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
