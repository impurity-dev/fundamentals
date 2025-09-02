import { CircularDoublyLinkedList } from './circular-doubly.ts';
import { run } from './test-suite.ts';

run(CircularDoublyLinkedList.name, (a) => new CircularDoublyLinkedList(a));
