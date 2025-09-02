import { run } from './test-suite.ts';
import { DoublyLinkedList } from './doubly.ts';

run(DoublyLinkedList.name, (a) => new DoublyLinkedList(a));
