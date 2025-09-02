import { run } from './test-suite.ts';
import { SinglyLinkedList } from './singly.ts';

run(SinglyLinkedList.name, (a) => new SinglyLinkedList(a));
