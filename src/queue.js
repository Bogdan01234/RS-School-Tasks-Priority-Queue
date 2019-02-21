const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        if (maxSize) {
            this.maxSize = maxSize;
        } else this.maxSize = 30;
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.heap.arrSize == this.maxSize) {
            throw error('queue has max size');
        }
        this.heap.push(data, priority);
    }

    shift() {
        if (this.heap.isEmpty()) {
            throw error('queue is empty');
        } else {
            var temp;
            temp = this.heap.pop();
            return temp;
        }
    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}

module.exports = PriorityQueue;
