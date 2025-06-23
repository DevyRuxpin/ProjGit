/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    const queue = [{ node: this.root, depth: 1 }];

    while (queue.length) {
      const { node, depth } = queue.shift();

      if (!node.left && !node.right) {
        return depth;
      }

      if (node.left) {
        queue.push({ node: node.left, depth: depth + 1 });
      }

      if (node.right) {
        queue.push({ node: node.right, depth: depth + 1 });
      }
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;

    function maxDepthHelper(node) {
      if (!node) return 0;
      const leftDepth = maxDepthHelper(node.left);
      const rightDepth = maxDepthHelper(node.right);
      return Math.max(leftDepth, rightDepth) + 1;
    }

    return maxDepthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let result = { val: -Infinity };
    if (!this.root) return 0;

    function maxSumHelper(node) {
      if (!node) return 0;

      const leftSum = Math.max(0, maxSumHelper(node.left));
      const rightSum = Math.max(0, maxSumHelper(node.right));

      result.val = Math.max(result.val, node.val + leftSum + rightSum);

      return node.val + Math.max(leftSum, rightSum);
    }

    maxSumHelper(this.root);
    return result.val;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;

    let closest = null;
    const queue = [this.root];

    while (queue.length) {
      const currentNode = queue.shift();

      if (currentNode.val > lowerBound) {
        if (closest === null || currentNode.val < closest) {
          closest = currentNode.val;
        }
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
