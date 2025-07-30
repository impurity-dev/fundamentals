export function sort<T>(arr: T[], comparator: (a: T, b: T) => number = (a, b) => (a > b ? 1 : a < b ? -1 : 0)): T[] {
    if(arr.length === 0) return arr;
    let swapped: boolean;
    do {
        swapped = false;
        for(let i = 0; i < arr.length - 1; i++) {
            if(comparator(arr[i], arr[i + 1]) > 0) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while(swapped)
    return arr;
}