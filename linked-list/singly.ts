import type { Comparator } from '../shared/mod.ts';
import type { ILinkedList } from './shared.ts';

export type SinglyNode<T> = {
    value: T;
    next: SinglyNode<T> | undefined;
};

export class SinglyLinkedList<T> implements ILinkedList<T> {
    private head: SinglyNode<T> | undefined = undefined;
    private tail: SinglyNode<T> | undefined = undefined;
    private length: number = 0;

    insertAtHead(value: T): void {
        const node = { value, next: this.head };
        if (!this.tail) {
            this.tail = node;
        }
        this.length++;
    }

    insertAtTail(value: T): void {
        const node = { value, next: undefined };
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
        this.length--;
        return value;
    }

    removeAt(index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Index out of bounds');
        }
        if (index === 0) return this.removeAtHead();
        if (index === this.length - 1) return this.removeAtTail();

        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current!.next;
        }
        const value = current!.next!.value;
        current!.next = current!.next!.next;
        this.length--;
        return value;
    }

    get(index: number): T | undefined {
        let current = this.head;
        let currentIndex = 0;
        while (current) {
            if (currentIndex == index) {
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
        while (current) {
            array.push(current.value);
            current = current.next;
        }
        return array;
    }

    [Symbol.iterator](): Iterator<T> {
        let current = this.head;
        return {
            next(): IteratorResult<T> {
                if (current) {
                    const { value } = current;
                    current = current.next;
                    return { value, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    }

    reverseIterator(): IterableIterator<T> {
        const values: T[] = this.toArray();
        let index = values.length - 1;

        return {
            [Symbol.iterator]() {
                return this;
            },
            next(): IteratorResult<T> {
                if (index >= 0) {
                    return { value: values[index--], done: false };
                }
                return { value: undefined, done: true };
            },
        };
    }
}
