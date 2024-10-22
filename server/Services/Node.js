class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;   // 'operator' or 'operand'
        this.value = value; // For 'operand' nodes, it's the condition. For 'operator' nodes, it's AND/OR.
        this.left = left;   // Reference to left child (Node)
        this.right = right; // Reference to right child (Node)
    }
}

module.exports = Node;