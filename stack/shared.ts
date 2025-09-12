import type { Comparator, IIterable } from '@core/mod.ts';

export interface IStack<T> extends IIterable<T, number> {
    peek(): T | undefined;
    push(value: T): void;
    pop(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    contains(value: T, comparator?: Comparator<T>): boolean;
}
