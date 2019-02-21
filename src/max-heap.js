const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.arrSize = 0;
    }

    push(data, priority) {
        var nodePush = new Node(data, priority);
        this.insertNode(nodePush);
        this.shiftNodeUp(nodePush);
        this.arrSize++;
    }

    pop() {
        if (this.root != null) {
            var newRoot;
            newRoot = this.detachRoot();
            this.restoreRootFromLastInsertedNode(newRoot);
            this.shiftNodeDown(this.root);
            this.arrSize--;
            return newRoot.data;
        }
    }

    detachRoot() {
        if (this.root != null) {
            var detached = this.root;
            if (this.root.left != null) this.root.left.parent = null;
            if (this.root.right != null) this.root.right.parent = null;
            this.root = null;
            if (this.parentNodes[0] == detached) this.parentNodes.shift();
            return detached;
        }
    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.size() != 1) {
            var lengthArray = this.parentNodes.length - 1;
            var lastElement = this.parentNodes[lengthArray];
            var lastElementParent = lastElement.parent;
            this.root = lastElement;
            lastElement.remove();
            if (detached.left == lastElement) {
                lastElement.left = null;
                lastElement.right = null;
                lastElement.parent = null;
            }
            if (detached.right == lastElement) {
                lastElement.left = detached.left;
                lastElement.left.parent = lastElement;
                lastElement.right = null;
                lastElement.parent = null;
                this.parentNodes.unshift(lastElement);
                this.parentNodes.pop();
            }
            if (detached.left != lastElement && detached.right != lastElement) {
                lastElement.left = detached.left;
                lastElement.left.parent = lastElement;
                lastElement.right = detached.right;
                lastElement.right.parent = lastElement;
                if (this.parentNodes.indexOf(lastElementParent) == -1) this.parentNodes.unshift(lastElementParent);
                this.parentNodes.pop();
            }
        } else {
            this.root = null;
            return;
        }
    }

    size() {
        return this.arrSize;
    }

    isEmpty() {
        if (this.arrSize == 0) {
            return true;
        } else {
            return false;
        }
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.arrSize = 0;
    }

    insertNode(node) {
        if (this.root == null) {
            this.root = node;
            this.parentNodes.push(node);
        } else {
            this.parentNodes[0].appendChild(node);
            this.parentNodes.push(node);
            if (this.parentNodes[0].right != null) {
                this.parentNodes.shift();
            }
        }
    }

    shiftNodeUp(node) {
        if (node.parent != null && node.priority > node.parent.priority) {
            var _node = this.parentNodes.indexOf(node);
            var _nodeParent = this.parentNodes.indexOf(node.parent);
            if (node.parent == this.root) {
                this.root = node;
            }
            this.parentNodes[_nodeParent] = node;
            this.parentNodes[_node] = node.parent;
            node.swapWithParent();
            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {
        if (node == null || (node.left === null && node.right === null)) {
            return;
        }
        var left = node.left;
        var right = node.right;
        if (node.right == null || node.left.priority > node.right.priority) {
            if (left.priority > node.priority) {
                var indexNode = this.parentNodes.indexOf(node);
                var indexChaild = this.parentNodes.indexOf(left);
                if (node === this.root) {
                    this.root = left;
                }
                left.swapWithParent();
                if (indexNode === -1) {
                    this.parentNodes[indexChaild] = node;
                } else {
                    this.parentNodes[indexNode] = left;
                    this.parentNodes[indexChaild] = node;
                }
                this.shiftNodeDown(node);
            }
        } else if (node.left == null || left.priority < node.right.priority) {
            if (right.priority > node.priority) {
                var indexNode = this.parentNodes.indexOf(node);
                var indexChaild = this.parentNodes.indexOf(right);
                if (node === this.root) {
                    this.root = right;
                }
                right.swapWithParent();
                if (indexNode === -1) {
                    this.parentNodes[indexChaild] = node;
                } else {
                    this.parentNodes[indexNode] = right;
                    this.parentNodes[indexChaild] = node;
                }
                this.shiftNodeDown(node);
            }
        }
    }
}

module.exports = MaxHeap;
