import type { Comparator } from '../shared/mod.ts';
import type { IStack } from './shared.ts';

export class Stack<T> implements IStack<T> {
    constructor(private values: Array<T> = []) {}

    isEmpty(): boolean {
        return this.values.length === 0;
    }

    size(): number {
        return this.values.length;
    }

    clear(): void {
        this.values = [];
    }

    peek(): T | undefined {
        if (this.values.length === 0) {
            return undefined;
        }
        return this.values[this.values.length - 1];
    }

    push(value: T) {
        this.values.push(value);
    }

    pop(): T | undefined {
        return this.values.pop();
    }

    contains(input: T, comparator: Comparator<T> = (a: T, b: T) => a === b): boolean {
        return this.values.some((value) => comparator(input, value));
    }
}
