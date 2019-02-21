class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    appendChild(node) {
        if (this.left == null) {
            this.left = node;
            node.parent = this;
            return;
        }
        if (this.right == null) {
            this.right = node;
            node.parent = this;
            return;
        }
    }

    removeChild(node) {
        if (this.left.data == node.data && this.left.priority == node.priority) {
            node.parent = null;
            this.left = null;
            return;
        }
        if (this.right.data == node.data && this.right.priority == node.priority) {
            node.parent = null;
            this.right = null;
            return;
        } else throw error('node is not a child of this node');
    }

    remove() {
        if (this.parent == null) {
            return;
        } else {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
        if (this.parent != null) {
            var newThis = this;
            var newLeft = this.left;
            var newRight = this.right;
            var newParent = this.parent;
            var newParentLeft = this.parent.left;
            var newParentRight = this.parent.right;
            var newParentParent = this.parent.parent;
            if (this.parent.left == this && this.parent.right != null) {
                this.parent.right.parent = this;
            }
            if (this.parent.right == this && this.parent.left != null) {
                this.parent.left.parent = this;
            }
            if (this.parent.parent != null) {
                if (this.parent.parent.left == this.parent && this.parent.parent != null) {
                    this.parent.parent.left = this;
                }
                if (this.parent.parent.right == this.parent && this.parent.parent != null) {
                    this.parent.parent.right = this;
                }
            }
            if (this.left) {
                this.left.parent = this.parent;
            }
            if (this.right) {
                this.right.parent = this.parent;
            }
            if (this.parent.left == this) {
                this.left = newParent;
                this.right = newParentRight;
            }
            if (this.parent.right == this) {
                this.right = newParent;
                this.left = newParentLeft;
            }
            this.parent.parent = newThis;
            this.parent.left = newLeft;
            this.parent.right = newRight;
            this.parent = newParentParent;
        }
    }
}

module.exports = Node;
