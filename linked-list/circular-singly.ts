import type { Comparator } from '../shared/utils.ts';
import type { ILinkedList } from './linked-list.ts';

export class Node<T> {
    public readonly value: T;
    public next: Node<T>;
    constructor(args: { value: T; next?: Node<T> }) {
        const { value, next } = args;
        this.value = value;
        this.next = next ?? this;
    }
}

export const CircularSinglyNode = Node;

export class CircularSinglyLinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | undefined = undefined;
    private tail: Node<T> | undefined = undefined;
    private length: number = 0;

    constructor(items: Array<T> = []) {
        items.forEach((i) => this.insertAtTail(i));
    }

    insertAtHead(value: T): void {
        const node = new Node({ value });
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
        const node = new Node({ value });
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
        current.next = new Node({ value, next: current.next });
        this.length++;
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

    get(index: number): T | undefined {
        if (!this.head || index < 0 || index >= this.length) throw new RangeError('Index out of bounds');
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.value;
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

    isEmpty(): boolean {
        return this.length === 0;
    }

    size(): number {
        return this.length;
    }

    toArray(): T[] {
        return [...this];
    }

    clone(): ILinkedList<T> {
        return new CircularSinglyLinkedList(this.toArray());
    }

    *[Symbol.iterator](): IterableIterator<T> {
        if (!this.head) return;
        let current = this.head;
        do {
            yield current.value;
            current = current.next;
        } while (current !== this.head);
    }

    *reverseIterator(): IterableIterator<T> {
        const values: T[] = this.toArray();
        for (let i = values.length - 1; i >= 0; i--) {
            yield values[i];
        }
    }
}
