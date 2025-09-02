import type { INestedLinkedList } from './shared.ts';
import { SinglyLinkedList } from './singly.ts';

class Node<T> {
    public readonly value: T;
    public next: Node<T> | undefined;
    public prev: Node<T> | undefined;
    public child: Node<T> | undefined;
    constructor(args: { value: T; next?: Node<T>; prev?: Node<T>; child?: Node<T> }) {
        const { value, next, prev, child } = args;
        this.value = value;
        this.next = next;
        this.prev = prev;
        this.child = child;
    }
}

export const NestedDoublyNode = Node;

export class NestedSinglyLinkedList<T> extends SinglyLinkedList<Node<T>> implements INestedLinkedList<T, Node<T>> {
    addChild(parentIndex: number, value: T): void {
        throw new Error('Method not implemented.');
    }
    getChildren(parentIndex: number): Node<T>[] | undefined {
        throw new Error('Method not implemented.');
    }
    removeChild(parentIndex: number, childIndex: number): Node<T> | undefined {
        throw new Error('Method not implemented.');
    }
    flatten(): Node<T> | undefined {
        throw new Error('Method not implemented.');
    }
}
