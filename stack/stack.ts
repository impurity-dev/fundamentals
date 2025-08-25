import { EmptyStackError, type IStack } from './shared.ts';

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

    peek(): T {
        return this.values[this.values.length - 1];
    }

    push(value: T) {
        this.values.push(value);
    }

    pop(): T {
        if (this.isEmpty()) {
            throw new EmptyStackError();
        }
        return this.values.pop()!;
    }

    contains(input: T): boolean {
        return this.values.includes(input) != undefined;
    }
}
