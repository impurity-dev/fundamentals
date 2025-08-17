# bubble-sort

A simple implementation of the bubble sort algorithm in TypeScript with Deno.

## Features

- Easy-to-understand TypeScript code
- Step-by-step sorting demonstration
- Suitable for beginners
- Runs with [Deno](https://deno.com/)

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/impurity-dev/bubble-sort.git
   cd bubble-sort
   ```

2. Test the script with Deno:
   ```bash
   deno test
   ```

## Example

```typescript
import { sort } from './bubble_sort.ts';

const arr = [5, 2, 9, 1, 5, 6];
const sortedArr = sort(arr);
console.log(sortedArr); // Output: [1, 2, 5, 5, 6, 9]
```

## How Bubble Sort Works

Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.

## License

This project is licensed under the MIT License.
