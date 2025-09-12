import type { Comparator } from '@core/mod.ts';
import type { IQueue } from './queue.ts';
import type { Sorter } from '@core/mod.ts';

export class PriorityQueue<T> implements IQueue<T> {
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
    contains(item: T, comparator?: Comparator<T> | undefined): boolean {
        throw new Error('Method not implemented.');
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
    map<U>(fn: (value: T, index: number) => U): IQueue<U> {
        throw new Error('Method not implemented.');
    }
    mapReverse<U>(fn: (value: T, index: number) => U): IQueue<U> {
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
    toArray(): T[] {
        throw new Error('Method not implemented.');
    }
    toArrayReverse(): T[] {
        throw new Error('Method not implemented.');
    }
    clone(): this {
        throw new Error('Method not implemented.');
    }
    reverse(): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
    toString(): string {
        throw new Error('Method not implemented.');
    }
    [Symbol.iterator](): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }
}
