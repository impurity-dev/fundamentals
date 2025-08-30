import type { Comparator } from '../shared/utils.ts';
import type { ILinkedList } from './shared.ts';

type Node<T> = {
    value: T;
    next: Node<T> | undefined;
    prev: Node<T> | undefined;
};

export class CircularDoubleLinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    insertAtHead(value: T): void {
        throw new Error('Method not implemented.');
    }

    insertAtTail(value: T): void {
        throw new Error('Method not implemented.');
    }

    insertAt(index: number, value: T): void {
        throw new Error('Method not implemented.');
    }

    removeAtHead(): T | undefined {
        throw new Error('Method not implemented.');
    }

    removeAtTail(): T | undefined {
        throw new Error('Method not implemented.');
    }

    removeAt(index: number): T | undefined {
        throw new Error('Method not implemented.');
    }

    get(index: number): T | undefined {
        throw new Error('Method not implemented.');
    }

    contains(value: T, comparator?: Comparator<T> | undefined): boolean {
        throw new Error('Method not implemented.');
    }

    isEmpty(): boolean {
        throw new Error('Method not implemented.');
    }

    size(): number {
        throw new Error('Method not implemented.');
    }

    toArray(): T[] {
        throw new Error('Method not implemented.');
    }

    reverseIterator(): IterableIterator<T> {
        throw new Error('Method not implemented.');
    }

    [Symbol.iterator](): Iterator<T, any, any> {
        throw new Error('Method not implemented.');
    }
}
