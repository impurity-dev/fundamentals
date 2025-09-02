import { run } from './test-suite.ts';
import { CircularSinglyLinkedList } from './circular-singly.ts';

run(CircularSinglyLinkedList.name, (a) => new CircularSinglyLinkedList(a));
