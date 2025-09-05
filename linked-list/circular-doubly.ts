import type { Comparator, Sorter } from '../shared/utils.ts';
import type { ILinkedList } from './linked-list.ts';

export class CircularDoublyNode<T> {
    public readonly value: T;
    public next: CircularDoublyNode<T>;
    public prev: CircularDoublyNode<T>;
    constructor(args: { value: T; next?: CircularDoublyNode<T>; prev?: CircularDoublyNode<T> }) {
        const { value, next, prev } = args;
        this.value = value;
        this.next = next ?? this;
        this.prev = prev ?? this;
    }
}

export class CircularDoublyLinkedList<T> implements ILinkedList<T, CircularDoublyNode<T>> {
    private _head: CircularDoublyNode<T> | undefined = undefined;
    private _tail: CircularDoublyNode<T> | undefined = undefined;
    private _length = 0;

    constructor(items: Array<T> = []) {
        items.forEach((i) => this.insertAtTail(i));
    }

    get head(): CircularDoublyNode<T> | undefined {
        return this._head;
    }

    protected set head(value: CircularDoublyNode<T> | undefined) {
        this._head = value;
    }

    get tail(): CircularDoublyNode<T> | undefined {
        return this._tail;
    }

    protected set tail(value: CircularDoublyNode<T> | undefined) {
        this._tail = value;
    }

    get length(): number {
        return this._length;
    }

    protected set length(value: number) {
        this._length = value;
    }

    insertAtHead(value: T): void {
        const node = new CircularDoublyNode({ value });
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            node.next = node;
            node.prev = node;
        } else {
            node.next = this.head;
            node.prev = this.tail;
            this.head.prev = node;
            this.tail.next = node;
            this.head = node;
        }
        this.length++;
    }

    insertAtTail(value: T): void {
        const node = new CircularDoublyNode({ value });
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            node.next = node;
            node.prev = node;
        } else {
            node.next = this.head;
            node.prev = this.tail;
            this.head.prev = node;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    insertAt(index: number, value: T): void {
        if (index < 0 || index > this.length) throw new RangeError('Index out of bounds');
        if (index === 0 || !this.head) return this.insertAtHead(value);
        if (index === this.length || !this.tail) return this.insertAtTail(value);

        let current: CircularDoublyNode<T>;
        if (index <= this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) current = current.next;
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) current = current.prev;
        }
        const node = new CircularDoublyNode({ value, next: current, prev: current.prev });
        current.prev.next = node;
        current.prev = node;
        this.length++;
    }

    insertAtReverse(index: number, value: T): void {
        this.insertAt(this.length - 1 - index, value);
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
            this.head.prev = this.tail;
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
        if (this.head == this.tail) {
            this.head = this.tail = undefined;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = this.head;
            this.head.prev = this.tail;
        }
        this.length--;
        return value;
    }

    removeAt(index: number): T | undefined {
        if (!this.head || !this.tail || index < 0 || index >= this.length) {
            throw new RangeError('Index out of bounds');
        }
        if (index === 0) return this.removeAtHead();
        if (index === this.length - 1) return this.removeAtTail();

        let current: CircularDoublyNode<T>;
        if (index <= this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) current = current.next;
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) current = current.prev;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.length--;
        return current!.value;
    }

    removeAtReverse(index: number): T | undefined {
        return this.removeAt(this.length - 1 - index);
    }

    get(index: number): T | undefined {
        if (!this.head || !this.tail || index < 0 || index >= this.length) {
            throw new RangeError('Index out of bounds');
        }
        let current: CircularDoublyNode<T>;
        if (index < this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) current = current.next;
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) current = current.prev;
        }
        return current.value;
    }

    getReverse(index: number): T | undefined {
        return this.get(this.length - 1 - index);
    }

    contains(value: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        if (!this.head) return false;
        let current = this.head;
        do {
            if (comparator(value, current.value)) {
                return true;
            }
            current = current.next;
        } while (current !== this.head);
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

    sorted(comparator: Sorter<T> = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): CircularDoublyLinkedList<T> {
        const list = this.clone();
        list.sort(comparator);
        return list;
    }

    sortedReverse(comparator: Sorter<T> = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): CircularDoublyLinkedList<T> {
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

    clone(): CircularDoublyLinkedList<T> {
        return new CircularDoublyLinkedList(this.toArray());
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
        for (const v of this.reverse()) yield [i++, v];
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

    map<U>(fn: (value: T, index: number) => U): CircularDoublyLinkedList<U> {
        const list = new CircularDoublyLinkedList<U>();
        for (const [i, v] of this.entries()) {
            list.insertAtTail(fn(v, i));
        }
        return list;
    }

    mapReverse<U>(fn: (value: T, index: number) => U): CircularDoublyLinkedList<U> {
        const list = new CircularDoublyLinkedList<U>();
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

    filter(fn: (value: T, index: number) => boolean): CircularDoublyLinkedList<T> {
        const list = new CircularDoublyLinkedList<T>();
        for (const [i, v] of this.entries()) {
            if (fn(v, i)) list.insertAtTail(v);
        }
        return list;
    }

    filterReverse(fn: (value: T, index: number) => boolean): CircularDoublyLinkedList<T> {
        const list = new CircularDoublyLinkedList<T>();
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
        if (!this.tail) return;
        let current = this.tail;
        do {
            yield current.value;
            current = current.prev;
        } while (current !== this.tail);
    }
}
