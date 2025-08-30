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

    // Insert at the beginning (O(1))
    insertAtHead(value: T): void {
        const newNode: Node<T> = { value, next: this.head, prev: undefined };
        if (this.head) {
            this.head.prev = newNode;
        }
        this.head = newNode;
        if (!this.tail) this.tail = newNode;
        this.length++;
    }

    // Insert at the end (O(1))
    insertAtTail(value: T): void {
        const newNode: Node<T> = { value, next: undefined, prev: this.tail };
        if (this.tail) {
            this.tail.next = newNode;
        }
        this.tail = newNode;
        if (!this.head) this.head = newNode;
        this.length++;
    }

    // Insert at index (O(n))
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

        let curr = this.head;
        for (let i = 0; i < index; i++) {
            curr = curr!.next;
        }
        const newNode: Node<T> = { value, next: curr, prev: curr!.prev };
        curr!.prev!.next = newNode;
        curr!.prev = newNode;
        this.length++;
    }

    // Remove first element (O(1))
    removeAtHead(): T | undefined {
        if (!this.head) return undefined;
        const value = this.head.value;
        this.head = this.head.next;
        if (this.head) {
            this.head.prev = undefined;
        } else {
            this.tail = undefined;
        }
        this.length--;
        return value;
    }

    // Remove last element (O(1))
    removeAtTail(): T | undefined {
        if (!this.tail) return undefined;
        const value = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) {
            this.tail.next = undefined;
        } else {
            this.head = undefined;
        }
        this.length--;
        return value;
    }

    // Remove at index (O(n))
    removeAt(index: number): T | undefined {
        if (index < 0 || index >= this.length) {
            throw new RangeError('Index out of bounds');
        }
        if (index === 0) return this.removeAtHead();
        if (index === this.length - 1) return this.removeAtTail();

        let curr = this.head;
        for (let i = 0; i < index; i++) {
            curr = curr!.next;
        }
        curr!.prev!.next = curr!.next;
        curr!.next!.prev = curr!.prev;
        this.length--;
        return curr!.value;
    }

    // Get element by index (O(n))
    get(index: number): T | undefined {
        if (index < 0 || index >= this.length) return undefined;
        let curr: Node<T> | undefined;
        // optimization: decide direction
        if (index < this.length / 2) {
            curr = this.head;
            for (let i = 0; i < index; i++) curr = curr!.next;
        } else {
            curr = this.tail;
            for (let i = this.length - 1; i > index; i--) curr = curr!.prev;
        }
        return curr!.value;
    }

    // Check if value exists (O(n))
    contains(value: T, comparator?: (a: T, b: T) => boolean): boolean {
        let curr = this.head;
        while (curr) {
            if (comparator ? comparator(curr.value, value) : curr.value === value) {
                return true;
            }
            curr = curr.next;
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
        const arr: T[] = [];
        let curr = this.head;
        while (curr) {
            arr.push(curr.value);
            curr = curr.next;
        }
        return arr;
    }

    // Iterator support (for...of) forward
    *[Symbol.iterator](): IterableIterator<T> {
        let current = this.tail;
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
