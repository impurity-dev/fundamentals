import { SinglyLinkedList } from './singly.ts';
import * as TestSuite from './test-suite.test.ts';

TestSuite.run(SinglyLinkedList.name, (a) => new SinglyLinkedList(a));
