class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }
    
    const insertHelper = (node) => {
      if (val < node.val) {
        if (!node.left) {
          node.left = new Node(val);
        } else {
          insertHelper(node.left);
        }
      } else {
        if (!node.right) {
          node.right = new Node(val);
        } else {
          insertHelper(node.right);
        }
      }
    };
    
    insertHelper(this.root);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) return undefined;
    
    let current = this.root;
    
    while (current) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    if (!this.root) return undefined;
    
    const findHelper = (node) => {
      if (!node) return undefined;
      
      if (val === node.val) {
        return node;
      } else if (val < node.val) {
        return findHelper(node.left);
      } else {
        return findHelper(node.right);
      }
    };
    
    return findHelper(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };
    
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    };
    
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const result = [];
    
    const traverse = (node) => {
      if (!node) return;
      
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    };
    
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) return [];
    
    const result = [];
    const queue = [this.root];
    
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.val);
      
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    
    return result;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    if (!this.root) return undefined;
    
    let parent = null;
    let current = this.root;
    let isLeftChild = false;
    
    // Find the node to remove and its parent
    while (current && current.val !== val) {
      parent = current;
      if (val < current.val) {
        current = current.left;
        isLeftChild = true;
      } else {
        current = current.right;
        isLeftChild = false;
      }
    }
    
    if (!current) return undefined; // Node not found
    
    const removedNode = current;
    
    // Case 1: Node has no children
    if (!current.left && !current.right) {
      if (!parent) {
        this.root = null;
      } else if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // Case 2: Node has one child
    else if (!current.left || !current.right) {
      const child = current.left || current.right;
      if (!parent) {
        this.root = child;
      } else if (isLeftChild) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
    // Case 3: Node has two children
    else {
      // Find the smallest value in the right subtree (inorder successor)
      let successorParent = current;
      let successor = current.right;
      
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
      
      // If successor is not the right child of current
      if (successorParent !== current) {
        successorParent.left = successor.right;
        successor.right = current.right;
      }
      
      successor.left = current.left;
      
      if (!parent) {
        this.root = successor;
      } else if (isLeftChild) {
        parent.left = successor;
      } else {
        parent.right = successor;
      }
    }
    
    return removedNode;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    if (!this.root) return true;
    
    const checkHeight = (node) => {
      if (!node) return 0;
      
      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);
      
      if (leftHeight === -1 || rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      
      return Math.max(leftHeight, rightHeight) + 1;
    };
    
    return checkHeight(this.root) !== -1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }
    
    let current = this.root;
    let parent = null;
    
    // Find the largest value (rightmost node)
    while (current.right) {
      parent = current;
      current = current.right;
    }
    
    // If the largest node has a left child, the second largest is the largest in that subtree
    if (current.left) {
      let secondLargest = current.left;
      while (secondLargest.right) {
        secondLargest = secondLargest.right;
      }
      return secondLargest.val;
    }
    
    // Otherwise, the second largest is the parent of the largest node
    return parent ? parent.val : undefined;
  }

  /** Further Study!
   * dfsInOrderIteratively(): Traverse the array using in-order DFS without recursion.
   * Return an array of visited nodes. */

  dfsInOrderIteratively() {
    if (!this.root) return [];
    
    const result = [];
    const stack = [];
    let current = this.root;
    
    while (current || stack.length > 0) {
      // Go to the leftmost node
      while (current) {
        stack.push(current);
        current = current.left;
      }
      
      // Process the current node
      current = stack.pop();
      result.push(current.val);
      
      // Move to the right subtree
      current = current.right;
    }
    
    return result;
  }
}

module.exports = BinarySearchTree;
