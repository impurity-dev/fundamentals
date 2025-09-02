import type { Comparator } from '../shared/utils.ts';
import type { ILinkedList } from './shared.ts';

type Node<T> = {
    value: T;
    next: Node<T> | undefined;
    prev: Node<T> | undefined;
};

export class DoublyLinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | undefined = undefined;
    private tail: Node<T> | undefined = undefined;
    private length = 0;

    constructor(items: Array<T> = []) {
        items.forEach((i) => this.insertAtTail(i));
    }

    insertAtHead(value: T): void {
        const node: Node<T> = { value, next: this.head, prev: undefined };
        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;
        if (!this.tail) this.tail = node;
        this.length++;
    }

    insertAtTail(value: T): void {
        const node: Node<T> = { value, next: undefined, prev: this.tail };
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
        if (!this.head) this.head = node;
        this.length++;
    }

    insertAt(index: number, value: T): void {
        if (index < 0 || index > this.length) throw new RangeError('Index out of bounds');
        if (index === 0) return this.insertAtHead(value);
        if (index === this.length) return this.insertAtTail(value);

        let current: Node<T>;
        if (index <= this.length / 2) {
            current = this.head!;
            for (let i = 0; i < index; i++) current = current.next!;
        } else {
            current = this.tail!;
            for (let i = this.length - 1; i > index; i--) current = current.prev!;
        }
        const node: Node<T> = { value, next: current, prev: current.prev };
        current.prev!.next = node;
        current.prev = node;
        this.length++;
    }

    removeAtHead(): T | undefined {
        if (!this.head) return undefined;
        const { value } = this.head;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = undefined;
        } else {
            this.tail = undefined;
        }
        this.length--;
        return value;
    }

    removeAtTail(): T | undefined {
        if (!this.tail) {
            return undefined;
        }
        const { value } = this.tail;
        this.tail = this.tail.prev;
        if (this.tail) {
            this.tail.next = undefined;
        } else {
            this.head = undefined;
        }
        this.length--;
        return value;
    }

    removeAt(index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Index out of bounds');
        }
        if (index === 0) return this.removeAtHead();
        if (index === this.length - 1) return this.removeAtTail();

        let current: Node<T>;
        if (index <= this.length / 2) {
            current = this.head!;
            for (let i = 0; i < index; i++) current = current.next!;
        } else {
            current = this.tail!;
            for (let i = this.length - 1; i > index; i--) current = current.prev!;
        }
        current!.prev!.next = current!.next;
        current!.next!.prev = current!.prev;
        this.length--;
        return current!.value;
    }

    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Index out of bounds');
        }
        let current: Node<T> | undefined;
        if (index < this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) current = current!.next;
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) current = current!.prev;
        }
        return current!.value;
    }

    contains(value: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        let current = this.head;
        while (current) {
            if (comparator(current.value, value)) {
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

    clone(): DoublyLinkedList<T> {
        return new DoublyLinkedList<T>(this.toArray());
    }

    *[Symbol.iterator](): IterableIterator<T> {
        let current = this.head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }

    *reverseIterator(): IterableIterator<T> {
        let current = this.tail;
        while (current) {
            yield current.value;
            current = current.prev;
        }
    }
}
