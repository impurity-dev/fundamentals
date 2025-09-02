import { CircularDoublyLinkedList } from './circular-doubly.ts';
import * as TestSuite from './test-suite.test.ts';

TestSuite.run(CircularDoublyLinkedList.name, (a) => new CircularDoublyLinkedList(a));
