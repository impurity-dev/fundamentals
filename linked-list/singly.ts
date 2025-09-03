import type { Comparator } from '../shared/mod.ts';
import type { ILinkedList } from './shared.ts';

class Node<T> {
    public readonly value: T;
    public next: Node<T> | undefined;
    constructor(args: { value: T; next?: Node<T> }) {
        const { value, next } = args;
        this.value = value;
        this.next = next;
    }
}

export const SinglyNode = Node;

export class SinglyLinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | undefined = undefined;
    private tail: Node<T> | undefined = undefined;
    private length: number = 0;

    constructor(items: Array<T> = []) {
        items.forEach((i) => this.insertAtTail(i));
    }

    insertAtHead(value: T): void {
        const node = new Node({ value, next: this.head });
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        this.length++;
    }

    insertAtTail(value: T): void {
        const node = new Node({ value });
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
        current.next = new Node({ value, next: current.next });
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

    contains(value: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        let current = this.head;
        while (current) {
            if (comparator(value, current.value)) {
                return true;
            }
            current = current.next;
        }
        return false;
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

    clone(): SinglyLinkedList<T> {
        return new SinglyLinkedList<T>(this.toArray());
    }

    *values(): IterableIterator<T> {
        yield* this;
    }

    *keys(): IterableIterator<number> {
        let i = 0;
        for (const _ of this) yield i++;
    }

    *entries(): IterableIterator<[number, T]> {
        let i = 0;
        for (const v of this) yield [i++, v];
    }

    forEach(fn: (value: T, index: number) => void): void {
        let i = 0;
        for (const v of this) fn(v, i++);
    }

    *map<U>(fn: (value: T, index: number) => U): IterableIterator<U> {
        let i = 0;
        for (const v of this) yield fn(v, i++);
    }

    *flatMap<U>(fn: (value: T, index: number) => Iterable<U>): IterableIterator<U> {
        let i = 0;
        for (const v of this) yield* fn(v, i++);
    }

    reduce<U>(fn: (acc: U, value: T, index: number) => U, init: U): U {
        let acc = init;
        let i = 0;
        for (const v of this) acc = fn(acc, v, i++);
        return acc;
    }

    *filter(fn: (value: T, index: number) => boolean): IterableIterator<T> {
        let i = 0;
        for (const v of this) if (fn(v, i++)) yield v;
    }

    *take(n: number): IterableIterator<T> {
        let i = 0;
        for (const v of this) {
            if (i++ >= n) break;
            yield v;
        }
    }

    *drop(n: number): IterableIterator<T> {
        let i = 0;
        for (const v of this) {
            if (i++ < n) continue;
            yield v;
        }
    }

    find(fn: (value: T, index: number) => boolean): T | undefined {
        let i = 0;
        for (const v of this) if (fn(v, i++)) return v;
        return undefined;
    }

    every(fn: (value: T, index: number) => boolean): boolean {
        let i = 0;
        for (const v of this) if (!fn(v, i++)) return false;
        return true;
    }

    some(fn: (value: T, index: number) => boolean): boolean {
        let i = 0;
        for (const v of this) if (fn(v, i++)) return true;
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
}
