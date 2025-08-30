import type { Comparator } from '../shared/utils.ts';
import type { ILinkedList } from './shared.ts';

type Node<T> = {
    value: T;
    next?: Node<T>;
};

export class CircularSinglyLinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | undefined = undefined;
    private tail: Node<T> | undefined = undefined;
    private length: number = 0;

    insertAtHead(value: T): void {
        const node: Node<T> = { value };
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
            node.next = node;
        } else {
            node.next = this.head;
            this.head = node;
            this.tail!.next = this.head;
        }
        this.length++;
    }

    insertAtTail(value: T): void {
        const node: Node<T> = { value };
        if (this.isEmpty()) {
            this.head = node;
            this.tail = node;
            node.next = node;
        } else {
            node.next = this.head;
            this.tail = node;
            this.tail!.next = this.head;
        }
        this.length++;
    }

    insertAt(index: number, value: T): void {
        const modIndex = index % this.length;
        if (modIndex === 0) {
            this.insertAtHead(value);
            return;
        }
        if (modIndex === this.length) {
            this.insertAtTail(value);
            return;
        }
        let current = this.head!;
        for (let i = 0; i < modIndex - 1; i++) {
            current = current.next!;
        }
        current.next = { value, next: current.next };
        this.length++;
    }

    removeAtHead(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        const value = this.head.value;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = undefined;
        } else {
            this.tail!.next = this.head;
        }
        this.length--;
        return value;
    }

    removeAtTail(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        if (this.head === this.tail) {
            const value = this.head.value;
            this.head = this.tail = undefined;
            this.length = 0;
            return value;
        }
        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next!;
        }
        const value = this.tail!.value;
        current.next = undefined;
        this.tail = current;
        this.tail.next = this.head;
        this.length--;
        return value;
    }

    removeAt(index: number): T | undefined {
        const modIndex = index % this.length;
        if (modIndex === 0) return this.removeAtHead();
        if (modIndex === this.length - 1) return this.removeAtTail();

        let current = this.head;
        for (let i = 0; i < modIndex - 1; i++) {
            current = current!.next;
        }
        const value = current!.next!.value;
        current!.next = current!.next!.next;
        this.length--;
        return value;
    }

    get(index: number): T | undefined {
        const modIndex = index % this.length;
        let current = this.head;
        let currentIndex = 0;
        while (current) {
            if (currentIndex == modIndex) {
                return current.value;
            }
            current = current.next;
            currentIndex++;
        }
        return undefined;
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
        const array: Array<T> = [];
        let current = this.head;
        let index = 0;
        while (current && index < this.length) {
            array.push(current.value);
            current = current.next;
            index++;
        }
        return array;
    }

    *[Symbol.iterator](): IterableIterator<T> {
        if (!this.head) return;
        let current = this.head;
        let traversed = 0;
        while (traversed < this.length) {
            yield current.value;
            current = current.next!;
            traversed++;
        }
    }

    *reverseIterator(): IterableIterator<T> {
        if (!this.head) return;
        const values: T[] = [];
        let current = this.head;
        let traversed = 0;
        while (traversed < this.length) {
            values.push(current.value);
            current = current.next!;
            traversed++;
        }
        for (let i = values.length - 1; i >= 0; i--) {
            yield values[i];
        }
    }
}
