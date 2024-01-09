class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(elem) {
    const newNode = new Node(elem);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  prepend(elem) {
    const newNode = new Node(elem, this.head);
    this.head = newNode;
  }

  find(elem) {
    let current = this.head;
    while (current !== null) {
      if (current.data === elem) {
        return current.data;
      }
      current = current.next;
    }

    return null;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  static fromIterable(iterable) {
    if (!iterable || typeof iterable[Symbol.iterator] !== "function") {
      throw new Error("Provided object is not iterable.");
    }

    const linkedList = new LinkedList();

    for (const elem of iterable) {
      linkedList.append(elem);
    }

    return linkedList;
  }
}

class Stack {
  constructor(maxSize = 10) {
    if (!Number.isInteger(maxSize) || maxSize <= 0) {
      throw new Error("Invalid stack size. Please provide a positive integer.");
    }

    this.maxSize = maxSize;
    this.list = new LinkedList();
  }

  push(elem) {
    if (this.list.toArray().length === this.maxSize) {
      throw new Error("Stack is full. Cannot push more elements.");
    }

    this.list.prepend(elem);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty. Cannot pop elements.");
    }

    const poppedData = this.list.head.data;
    this.list.head = this.list.head.next;

    return poppedData;
  }

  peek() {
    return this.isEmpty() ? null : this.list.head.data;
  }

  isEmpty() {
    return this.list.head === null;
  }

  toArray() {
    return this.list.toArray();
  }

  static fromIterable(iterable) {
    if (!iterable || typeof iterable[Symbol.iterator] !== "function") {
      throw new Error("Provided object is not iterable.");
    }

    const stack = new Stack(iterable.length);

    for (const elem of iterable) {
      stack.push(elem);
    }

    return stack;
  }
}

module.exports = { Stack, LinkedList, Node };
