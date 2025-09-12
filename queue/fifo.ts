import type { Comparator } from '@core/mod.ts';
import { type IBoundedQueue, type IQueue, QueueOverflowError } from './queue.ts';
import type { IIterable, Sorter } from '@core/mod.ts';

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

    contains(item: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        return this.queue.some((value) => comparator(value, item));
    }

    containsReverse(value: T, comparator?: Comparator<T> | undefined): boolean {
        throw new Error('Method not implemented.');
    }
    sort(sorter?: Sorter<T> | undefined): void {
        throw new Error('Method not implemented.');
    }
    sortReverse(sorter?: Sorter<T> | undefined): void {
        throw new Error('Method not implemented.');
    }
    sorted(sorter?: Sorter<T> | undefined): this {
        throw new Error('Method not implemented.');
    }
    sortedReverse(sorter?: Sorter<T> | undefined): this {
        throw new Error('Method not implemented.');
    }
    values(): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
    valuesReverse(): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
    keys(): IterableIterator<number> {
        throw new Error('Method not implemented.');
    }
    keysReverse(): IterableIterator<number> {
        throw new Error('Method not implemented.');
    }
    entries(): IterableIterator<[number, T]> {
        throw new Error('Method not implemented.');
    }
    entriesReverse(): IterableIterator<[number, T]> {
        throw new Error('Method not implemented.');
    }
    forEach(fn: (value: T, index: number) => void): void {
        throw new Error('Method not implemented.');
    }
    forEachReverse(fn: (value: T, index: number) => void): void {
        throw new Error('Method not implemented.');
    }
    map<U>(fn: (value: T, index: number) => U): FifoQueue<U> {
        const fifo = new FifoQueue<U>();
        for (const [i, v] of this.entries()) {
            fifo.enqueue(fn(v, i));
        }
        return fifo;
    }
    mapReverse<U>(fn: (value: T, index: number) => U): IIterable<U, number> {
        throw new Error('Method not implemented.');
    }
    reduce<U>(fn: (acc: U, value: T, index: number) => U, init: U): U {
        throw new Error('Method not implemented.');
    }
    reduceReverse<U>(fn: (acc: U, value: T, index: number) => U, init: U): U {
        throw new Error('Method not implemented.');
    }
    filter(fn: (value: T, index: number) => boolean): this {
        throw new Error('Method not implemented.');
    }
    filterReverse(fn: (value: T, index: number) => boolean): this {
        throw new Error('Method not implemented.');
    }
    take(n: number): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
    takeReverse(n: number): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
    drop(n: number): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
    dropReverse(n: number): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
    find(fn: (value: T, index: number) => boolean): T | undefined {
        throw new Error('Method not implemented.');
    }
    findReverse(fn: (value: T, index: number) => boolean): T | undefined {
        throw new Error('Method not implemented.');
    }
    every(fn: (value: T, index: number) => boolean): boolean {
        throw new Error('Method not implemented.');
    }
    everyReverse(fn: (value: T, index: number) => boolean): boolean {
        throw new Error('Method not implemented.');
    }
    some(fn: (value: T, index: number) => boolean): boolean {
        throw new Error('Method not implemented.');
    }
    someReverse(fn: (value: T, index: number) => boolean): boolean {
        throw new Error('Method not implemented.');
    }
    clone(): IQueue<T> {
        throw new Error('Method not implemented.');
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
        return `FIFOQueue { ${this.queue.join(', ')} }`;
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
