export type Comparator<T> = (a: T, b: T) => boolean;
export type Sorter<T> = (a: T, b: T) => number;

export type IOpts = { reverse?: boolean };

export interface ICollection<T, K = number, Self extends ICollection<any, any, any> = any> extends Iterable<T> {
    get length(): number;
    isEmpty(): boolean;
    clear(): void;
    contains(item: T, comparator?: Comparator<T>, args?: IOpts): boolean;
    sort(sorter?: Sorter<T>, args?: IOpts): void;
    values(args?: IOpts): IterableIterator<T>;
    keys(args?: IOpts): IterableIterator<K>;
    entries(args?: IOpts): IterableIterator<[K, T]>;
    forEach(fn: (value: T, index: K) => void, args?: IOpts): void;
    reduce<U>(fn: (acc: U, value: T, index: K) => U, init: U, args?: IOpts): U;
    take(n: number, args?: IOpts): IterableIterator<T>;
    drop(n: number, args?: IOpts): IterableIterator<T>;
    find(fn: (value: T, index: K) => boolean, args?: IOpts): T | undefined;
    every(fn: (value: T, index: K) => boolean, args?: IOpts): boolean;
    some(fn: (value: T, index: K) => boolean, args?: IOpts): boolean;
    toArray(args?: IOpts): T[];
    clone(): Self;
    map<U>(fn: (value: T, index: K) => U, args?: IOpts): ICollection<U, unknown, Self>;
    sorted(sorter?: Sorter<T>, args?: IOpts): ICollection<T, K, Self>;
    filter(fn: (value: T, index: K) => boolean, args?: IOpts): ICollection<T, K, Self>;
    [Symbol.iterator](): IterableIterator<T>;
    reverse(): IterableIterator<T>;
    toString(): string;
}
