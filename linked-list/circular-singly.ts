import type { Comparator, Sorter } from '@core/utils.ts';
import type { ILinkedList } from './linked-list.ts';

export class CircularSinglyNode<T> {
    public readonly value: T;
    public next: CircularSinglyNode<T>;
    constructor(args: { value: T; next?: CircularSinglyNode<T> }) {
        const { value, next } = args;
        this.value = value;
        this.next = next ?? this;
    }
}

export class CircularSinglyLinkedList<T> implements ILinkedList<T, CircularSinglyNode<T>> {
    protected _head: CircularSinglyNode<T> | undefined;
    protected _tail: CircularSinglyNode<T> | undefined;
    protected _length: number = 0;

    constructor(items: Array<T> = []) {
        items.forEach((i) => this.insertAtTail(i));
    }

    get head(): CircularSinglyNode<T> | undefined {
        return this._head;
    }

    protected set head(value: CircularSinglyNode<T> | undefined) {
        this._head = value;
    }

    get tail(): CircularSinglyNode<T> | undefined {
        return this._tail;
    }

    protected set tail(value: CircularSinglyNode<T> | undefined) {
        this._tail = value;
    }

    get length(): number {
        return this._length;
    }

    protected set length(value: number) {
        this._length = value;
    }

    insertAtHead(value: T): void {
        const node = new CircularSinglyNode({ value });
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            node.next = node;
        } else {
            node.next = this.head;
            this.head = node;
            this.tail.next = this.head;
        }
        this.length++;
    }

    insertAtTail(value: T): void {
        const node = new CircularSinglyNode({ value });
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            node.next = node;
        } else {
            node.next = this.head;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    insertAt(index: number, value: T): void {
        if (index < 0 || index > this.length) {
            throw new RangeError('Index out of bounds');
        }
        if (index === 0 || !this.head) {
            this.insertAtHead(value);
            return;
        }
        if (index === this.length) {
            this.insertAtTail(value);
            return;
        }
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        current.next = new CircularSinglyNode({ value, next: current.next });
        this.length++;
    }

    insertAtReverse(index: number, value: T): void {
        this.insertAt(this.length - index, value);
    }

    removeAtHead(): T | undefined {
        if (!this.head || !this.tail) {
            return undefined;
        }
        const { value } = this.head;
        if (this.head == this.tail) {
            this.head = this.tail = undefined;
        } else {
            this.head = this.head.next;
            this.tail.next = this.head;
        }
        this.length--;
        return value;
    }

    removeAtTail(): T | undefined {
        if (!this.head || !this.tail) {
            return undefined;
        }
        const { value } = this.tail;
        if (this.head === this.tail) {
            this.head = this.tail = undefined;
            this.length = 0;
            return value;
        }
        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next;
        }
        current.next = this.head;
        this.tail = current;
        this.length--;
        return value;
    }

    removeAt(index: number): T | undefined {
        if (!this.head || !this.tail || index < 0 || index >= this.length) throw new RangeError('Index out of bounds');
        if (index === 0) return this.removeAtHead();
        if (index === this.length - 1) return this.removeAtTail();

        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        const { value } = current.next;
        current.next = current.next.next;
        this.length--;
        return value;
    }

    removeAtReverse(index: number): T | undefined {
        return this.removeAt(this.length - index);
    }

    get(index: number): T | undefined {
        if (!this.head || index < 0 || index >= this.length) throw new RangeError('Index out of bounds');
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.value;
    }

    getReverse(index: number): T | undefined {
        return this.get(this.length - index);
    }

    contains(value: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        for (const v of this) {
            if (comparator(v, value)) {
                return true;
            }
        }
        return false;
    }

    containsReverse(value: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        for (const v of this.reverse()) {
            if (comparator(v, value)) {
                return true;
            }
        }
        return false;
    }

    sort(comparator: Sorter<T> = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): void {
        this.clear();
        [...this].sort(comparator).forEach((v) => this.insertAtTail(v));
    }

    sortReverse(comparator: Sorter<T> = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): void {
        this.clear();
        [...this].sort(comparator).forEach((v) => this.insertAtTail(v));
    }

    sorted(comparator: Sorter<T> = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): CircularSinglyLinkedList<T> {
        const list = this.clone();
        list.sort(comparator);
        return list;
    }

    sortedReverse(comparator: Sorter<T> = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): CircularSinglyLinkedList<T> {
        const list = this.clone();
        list.sortReverse(comparator);
        return list;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    size(): number {
        return this.length;
    }

    toArray(): T[] {
        return [...this];
    }

    toArrayReverse(): T[] {
        return [...this.reverse()];
    }

    clear(): void {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    clone(): CircularSinglyLinkedList<T> {
        return new CircularSinglyLinkedList(this.toArray());
    }

    *values(): IterableIterator<T> {
        yield* this;
    }

    *valuesReverse(): IterableIterator<T> {
        yield* this.reverse();
    }

    *keys(): IterableIterator<number> {
        let i = 0;
        for (const _ of this) {
            yield i++;
        }
    }

    *keysReverse(): IterableIterator<number> {
        for (let i = this.length - 1; i >= 0; i--) {
            yield i;
        }
    }

    *entries(): IterableIterator<[number, T]> {
        let i = 0;
        for (const v of this) yield [i++, v];
    }

    *entriesReverse(): IterableIterator<[number, T]> {
        let i = this.length;
        for (const v of this.reverse()) yield [i--, v];
    }

    forEach(fn: (value: T, index: number) => void): void {
        for (const [i, v] of this.entries()) {
            fn(v, i);
        }
    }

    forEachReverse(fn: (value: T, index: number) => void): void {
        for (const [i, v] of this.entriesReverse()) {
            fn(v, i);
        }
    }

    map<U>(fn: (value: T, index: number) => U): CircularSinglyLinkedList<U> {
        const list = new CircularSinglyLinkedList<U>();
        for (const [i, v] of this.entries()) {
            list.insertAtTail(fn(v, i));
        }
        return list;
    }

    mapReverse<U>(fn: (value: T, index: number) => U): CircularSinglyLinkedList<U> {
        const list = new CircularSinglyLinkedList<U>();
        for (const [i, v] of this.entriesReverse()) {
            list.insertAtTail(fn(v, i));
        }
        return list;
    }

    reduce<U>(fn: (acc: U, value: T, index: number) => U, init: U): U {
        let acc = init;
        for (const [i, v] of this.entries()) {
            acc = fn(acc, v, i);
        }
        return acc;
    }

    reduceReverse<U>(fn: (acc: U, value: T, index: number) => U, init: U): U {
        let acc = init;
        for (const [i, v] of this.entriesReverse()) {
            acc = fn(acc, v, i);
        }
        return acc;
    }

    filter(fn: (value: T, index: number) => boolean): CircularSinglyLinkedList<T> {
        const list = new CircularSinglyLinkedList<T>();
        for (const [i, v] of this.entries()) {
            if (fn(v, i)) list.insertAtTail(v);
        }
        return list;
    }

    filterReverse(fn: (value: T, index: number) => boolean): CircularSinglyLinkedList<T> {
        const list = new CircularSinglyLinkedList<T>();
        for (const [i, v] of this.entriesReverse()) {
            if (fn(v, i)) list.insertAtTail(v);
        }
        return list;
    }

    *take(n: number): IterableIterator<T> {
        for (const [i, v] of this.entries()) {
            if (i >= n) break;
            yield v;
        }
    }

    *takeReverse(n: number): IterableIterator<T> {
        for (const [i, v] of this.entriesReverse()) {
            if (i >= n) break;
            yield v;
        }
    }

    *drop(n: number): IterableIterator<T> {
        for (const [i, v] of this.entries()) {
            if (i < n) continue;
            yield v;
        }
    }

    *dropReverse(n: number): IterableIterator<T> {
        for (const [i, v] of this.entriesReverse()) {
            if (i < n) continue;
            yield v;
        }
    }

    find(fn: (value: T, index: number) => boolean): T | undefined {
        for (const [i, v] of this.entries()) if (fn(v, i)) return v;
        return undefined;
    }

    findReverse(fn: (value: T, index: number) => boolean): T | undefined {
        for (const [i, v] of this.entriesReverse()) if (fn(v, i)) return v;
        return undefined;
    }

    every(fn: (value: T, index: number) => boolean): boolean {
        for (const [i, v] of this.entries()) {
            if (!fn(v, i)) return false;
        }
        return true;
    }

    everyReverse(fn: (value: T, index: number) => boolean): boolean {
        for (const [i, v] of this.entriesReverse()) {
            if (!fn(v, i)) return false;
        }
        return true;
    }

    some(fn: (value: T, index: number) => boolean): boolean {
        for (const [i, v] of this.entries()) {
            if (fn(v, i)) return true;
        }
        return false;
    }

    someReverse(fn: (value: T, index: number) => boolean): boolean {
        for (const [i, v] of this.entriesReverse()) {
            if (fn(v, i)) return true;
        }
        return false;
    }

    *[Symbol.iterator](): IterableIterator<T> {
        if (!this.head) return;
        let current = this.head;
        do {
            yield current.value;
            current = current.next;
        } while (current !== this.head);
    }

    *reverse(): IterableIterator<T> {
        const values: T[] = this.toArray();
        for (let i = values.length - 1; i >= 0; i--) {
            yield values[i];
        }
    }
}
