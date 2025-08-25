export class EmptyStackError extends Error {
    constructor(message?: string) {
        super(message || 'Cannot pop from an empty stack');
        Object.setPrototypeOf(this, EmptyStackError.prototype);
    }
}

export interface IStack<T> {
    peek(): T | undefined;
    push(value: T): void;
    pop(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    contains(value: T): boolean;
}
