import { CircularSinglyLinkedList } from './circular-singly.ts';
import * as TestSuite from './test-suite.test.ts';

TestSuite.run(CircularSinglyLinkedList.name, (a) => new CircularSinglyLinkedList(a));
