import type { Comparator, Sorter } from '@core/utils.ts';
import type { LinkedList } from './linked-list.ts';

export class SinglyNode<T> {
    public readonly value: T;
    public next: SinglyNode<T> | undefined;
    constructor(opts: { value: T; next?: SinglyNode<T> }) {
        const { value, next } = opts;
        this.value = value;
        this.next = next;
    }
}

export class SinglyLinkedList<T> implements LinkedList<T, SinglyNode<T>> {
    protected _head: SinglyNode<T> | undefined;
    protected _tail: SinglyNode<T> | undefined;
    protected _length: number = 0;

    constructor(items: Array<T> = []) {
        items.forEach((i) => this.insertAtTail(i));
    }

    get head(): SinglyNode<T> | undefined {
        return this._head;
    }

    protected set head(value: SinglyNode<T> | undefined) {
        this._head = value;
    }

    get tail(): SinglyNode<T> | undefined {
        return this._tail;
    }

    protected set tail(value: SinglyNode<T> | undefined) {
        this._tail = value;
    }

    get length(): number {
        return this._length;
    }

    protected set length(value: number) {
        this._length = value;
    }

    isEmpty(): boolean {
        return this.length === 0;
    }

    insertAtHead(value: T): void {
        const node = new SinglyNode({ value, next: this.head });
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        this.length++;
    }

    insertAtTail(value: T): void {
        const node = new SinglyNode({ value, next: undefined });
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail!.next = node;
            this.tail = node;
        }
        this.length++;
    }

    insertAt(index: number, value: T): void {
        if (index < 0 || index > this.length) {
            throw new RangeError('Index out of bounds');
        }
        if (index === 0) {
            this.insertAtHead(value);
            return;
        }
        if (index === this.length) {
            this.insertAtTail(value);
            return;
        }
        let current = this.head!;
        for (let i = 0; i < index - 1; i++) {
            current = current.next!;
        }
        current.next = new SinglyNode({ value, next: current.next });
        this.length++;
    }

    removeAtHead(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        const { value } = this.head;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = undefined;
        }
        this.length--;
        return value;
    }

    removeAtTail(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        if (this.head === this.tail) {
            const { value } = this.head;
            this.head = this.tail = undefined;
            this.length = 0;
            return value;
        }
        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next!;
        }
        const { value } = this.tail!;
        current.next = undefined;
        this.tail = current;
        this.length--;
        return value;
    }

    removeAt(index: number): T | undefined {
        if (index < 0 || index >= this.length) throw new RangeError('Index out of bounds');
        if (index === 0) return this.removeAtHead();
        if (index === this.length - 1) return this.removeAtTail();

        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current!.next;
        }
        const { value } = current!.next!;
        current!.next = current!.next!.next;
        this.length--;
        return value;
    }

    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) throw new RangeError('Index out of bounds');

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current!.next;
        }
        return current!.value;
    }

    sort(comparator: Sorter<T> = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): void {
        const values = [...this];
        this.clear();
        values.sort(comparator).forEach((v) => this.insertAtTail(v));
    }

    sorted(comparator: Sorter<T> = (a: T, b: T) => a < b ? -1 : a > b ? 1 : 0): SinglyLinkedList<T> {
        const list = this.clone();
        list.sort(comparator);
        return list;
    }

    clear(): void {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    clone(): SinglyLinkedList<T> {
        return new SinglyLinkedList<T>(this.toArray());
    }

    *entries(): IterableIterator<[number, T]> {
        let i = 0;
        for (const v of this) yield [i++, v];
    }

    map<U>(fn: (value: T, index: number) => U): SinglyLinkedList<U> {
        const list = new SinglyLinkedList<U>();
        for (const [i, v] of this.entries()) {
            list.insertAtTail(fn(v, i));
        }
        return list;
    }

    filter(fn: (value: T, index: number) => boolean): SinglyLinkedList<T> {
        const list = new SinglyLinkedList<T>();
        for (const [i, v] of this.entries()) {
            if (fn(v, i)) list.insertAtTail(v);
        }
        return list;
    }

    *values(): IterableIterator<T> {
        for (const value of this) {
            yield value;
        }
    }

    *keys(): IterableIterator<number> {
        for (const [key, _] of this.entries()) {
            yield key;
        }
    }

    forEach(fn: (value: T, index: number) => void): void {
        for (const [i, v] of this.entries()) {
            fn(v, i);
        }
    }

    reduce<U>(fn: (acc: U, value: T, index: number) => U, init: U): U {
        let acc = init;
        for (const [i, v] of this.entries()) {
            acc = fn(acc, v, i);
        }
        return acc;
    }

    *take(n: number): IterableIterator<T> {
        for (const [i, v] of this.entries()) {
            if (i >= n) continue;
            yield v;
        }
    }

    *drop(n: number): IterableIterator<T> {
        for (const [i, v] of this.entries()) {
            if (i < n) continue;
            yield v;
        }
    }

    find(fn: (value: T, index: number) => boolean): T | undefined {
        for (const [i, v] of this.entries()) {
            if (fn(v, i)) return v;
        }
        return undefined;
    }

    every(fn: (value: T, index: number) => boolean): boolean {
        for (const [i, v] of this.entries()) {
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

    contains(value: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        for (const v of this) {
            if (comparator(v, value)) {
                return true;
            }
        }
        return false;
    }

    *[Symbol.iterator](): IterableIterator<T> {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }

    *reverse(): IterableIterator<T> {
        const values: T[] = this.toArray();
        for (let i = values.length - 1; i >= 0; i--) {
            yield values[i];
        }
    }

    toArray(): T[] {
        return [...this];
    }
}
