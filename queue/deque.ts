import type { Comparator } from '../shared/utils.ts';
import type { IQueue } from './shared.ts';

export class DequeQueue<T> implements IQueue<T> {
    enqueue(item: T): void {
        throw new Error('Method not implemented.');
    }
    dequeue(): T | undefined {
        throw new Error('Method not implemented.');
    }
    peek(): T | undefined {
        throw new Error('Method not implemented.');
    }
    back(): T | undefined {
        throw new Error('Method not implemented.');
    }
    size(): number {
        throw new Error('Method not implemented.');
    }
    isEmpty(): boolean {
        throw new Error('Method not implemented.');
    }
    clear(): void {
        throw new Error('Method not implemented.');
    }
    toArray(): T[] {
        throw new Error('Method not implemented.');
    }
    contains(item: T, comparator?: Comparator<T> | undefined): boolean {
        throw new Error('Method not implemented.');
    }
    capacity(): number {
        throw new Error('Method not implemented.');
    }
    isFull(): boolean {
        throw new Error('Method not implemented.');
    }
    reverseIterator(): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
    [Symbol.iterator](): Iterator<T, any, any> {
        throw new Error('Method not implemented.');
    }
}
