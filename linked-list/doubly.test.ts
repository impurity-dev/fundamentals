import { DoublyLinkedList } from './doubly.ts';
import * as TestSuite from './test-suite.test.ts';

TestSuite.run(DoublyLinkedList.name, (a) => new DoublyLinkedList(a));
