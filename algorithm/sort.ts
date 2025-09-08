import type { Sorter } from '@core/utils.ts';

/**
 * Sorts an array using the bubble sort algorithm and returns a new sorted array.
 *
 * @typeParam T - The type of elements in the array.
 * @param arr - The array to sort.
 * @param comparator - Optional. A function that defines the sort order. It should return a negative number if the first argument is less than the second, zero if they're equal, and a positive number otherwise. Defaults to ascending order.
 * @returns A new array containing the sorted elements.
 *
 * @example
 * ```typescript
 * bubbleSort([3, 1, 2]); // returns [1, 2, 3]
 * ```
 */
export function bubbleSort<T>(
    arr: T[],
    comparator: Sorter<T> = (a: T, b: T) => (a > b ? 1 : a < b ? -1 : 0),
): T[] {
    arr = [...arr];
    if (arr.length === 0) return arr;
    let swapped: boolean;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (comparator(arr[i], arr[i + 1]) > 0) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
}
