import type { Comparator } from '../shared/utils.ts';
import type { ILinkedList } from './shared.ts';

export abstract class LinkedList<T> implements ILinkedList<T> {
    abstract insertAtHead(value: T): void;
    abstract insertAtTail(value: T): void;
    abstract insertAt(index: number, value: T): void;
    abstract removeAtHead(): T | undefined;
    abstract removeAtTail(): T | undefined;
    abstract removeAt(index: number): T | undefined;
    abstract get(index: number): T | undefined;
    abstract contains(value: T, comparator?: Comparator<T> | undefined): boolean;
    abstract isEmpty(): boolean;
    abstract size(): number;
    abstract values(): IterableIterator<T>;
    abstract keys(): IterableIterator<number>;
    abstract entries(): IterableIterator<[number, T]>;
    abstract forEach(fn: (value: T, index: number) => void): void;
    abstract map<U>(fn: (value: T, index: number) => U): IterableIterator<U>;
    abstract flatMap<U>(fn: (value: T, index: number) => Iterable<U>): IterableIterator<U>;
    abstract reduce<U>(fn: (acc: U, value: T, index: number) => U, init: U): U;
    abstract filter(fn: (value: T, index: number) => boolean): IterableIterator<T>;
    abstract take(n: number): IterableIterator<T>;
    abstract drop(n: number): IterableIterator<T>;
    abstract find(fn: (value: T, index: number) => boolean): T | undefined;
    abstract every(fn: (value: T, index: number) => boolean): boolean;
    abstract some(fn: (value: T, index: number) => boolean): boolean;
    abstract toArray(): T[];
    abstract clone(): ILinkedList<T>;
    abstract reverse(): IterableIterator<T>;
    abstract [Symbol.iterator](): IterableIterator<T>;
}
