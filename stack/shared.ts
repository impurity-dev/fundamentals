import type { Comparator } from '../shared/mod.ts';

export interface IStack<T> {
    peek(): T | undefined;
    push(value: T): void;
    pop(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    contains(value: T, comparator?: Comparator<T>): boolean;
}
