export type Comparator<T> = (a: T, b: T) => boolean;
export type Sorter<T> = (a: T, b: T) => number;

export interface Collection<T, K = number, Self extends Collection<any, any, any> = any> extends Iterable<T> {
    get length(): number;
    isEmpty(): boolean;
    clear(): void;
    get(index: K): T | undefined;
    contains(item: T, comparator?: Comparator<T>): boolean;
    sort(sorter?: Sorter<T>): void;
    values(): IterableIterator<T>;
    keys(): IterableIterator<K>;
    entries(): IterableIterator<[K, T]>;
    forEach(fn: (value: T, index: K) => void): void;
    reduce<U>(fn: (acc: U, value: T, index: K) => U, init: U): U;
    take(n: number): IterableIterator<T>;
    drop(n: number): IterableIterator<T>;
    find(fn: (value: T, index: K) => boolean): T | undefined;
    every(fn: (value: T, index: K) => boolean): boolean;
    some(fn: (value: T, index: K) => boolean): boolean;
    toArray(): T[];
    clone(): Self;
    map<U>(fn: (value: T, index: K) => U): Collection<U, unknown, Self>;
    sorted(sorter?: Sorter<T>): Collection<T, K, Self>;
    filter(fn: (value: T, index: K) => boolean): Collection<T, K, Self>;
    [Symbol.iterator](): IterableIterator<T>;
    reverse(): IterableIterator<T>;
    toString(): string;
}
