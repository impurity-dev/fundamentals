import { SinglyLinkedList } from '../linked-list/singly.ts';
import type { Comparator } from '../shared/mod.ts';
import type { IStack } from './shared.ts';

export class LinkedStack<T> implements IStack<T> {
    private list: SinglyLinkedList<T> = new SinglyLinkedList();

    isEmpty(): boolean {
        return this.list.isEmpty();
    }

    size(): number {
        return this.list.size();
    }

    clear(): void {
        this.list = new SinglyLinkedList();
    }

    peek(): T | undefined {
        return this.list.get(0);
    }

    push(value: T) {
        this.list.insertAtHead(value);
    }

    pop(): T | undefined {
        return this.list.get(0);
    }

    contains(value: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        return this.list.contains(value, comparator);
    }
}
