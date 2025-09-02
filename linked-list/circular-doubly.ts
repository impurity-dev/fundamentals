import type { Comparator } from '../shared/utils.ts';
import type { ILinkedList } from './shared.ts';

class Node<T> {
    constructor(public readonly value: T, public next: Node<T> = this, public prev: Node<T> = this) {}
}

export class CircularDoublyLinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | undefined = undefined;
    private tail: Node<T> | undefined = undefined;
    private length: number = 0;

    constructor(items: Array<T> = []) {
        items.forEach((i) => this.insertAtTail(i));
    }

    insertAtHead(value: T): void {
        const node = new Node(value);
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
        const node = new Node(value);
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

        let current: Node<T>;
        if (index <= this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) current = current.next;
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) current = current.prev;
        }
        const node = new Node(value, current, current.prev);
        current.prev.next = node;
        current.prev = node;
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

        let current: Node<T>;
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

    get(index: number): T | undefined {
        if (!this.head || !this.tail || index < 0 || index >= this.length) {
            throw new RangeError('Index out of bounds');
        }
        let current: Node<T>;
        if (index < this.length / 2) {
            current = this.head;
            for (let i = 0; i < index; i++) current = current.next;
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) current = current.prev;
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
        return new CircularDoublyLinkedList(this.toArray());
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
        if (!this.tail) return;
        let current = this.tail;
        do {
            yield current.value;
            current = current.prev;
        } while (current !== this.tail);
    }
}
