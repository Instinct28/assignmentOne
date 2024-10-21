const Node = require('../Node');

const tokenize = (ruleString) => {
    // This regular expression matches words, numbers, operators, and parentheses.
    return ruleString.match(/[\w]+|[><=]+|[()]/g);
}

const parseRuleStringToAST = (ruleString) => {
    const tokens = tokenize(ruleString);
    let index = 0;
    const parseExpression = () => {
        let left = parseTerm();  // Parse the left operand

        while (index < tokens.length && (tokens[index] === 'AND' || tokens[index] === 'OR')) {
            const operator = tokens[index];  // Get the operator (AND/OR)
            index++;  // Move to the next token
            const right = parseTerm();  // Parse the right operand
            left = new Node('operator', operator, left, right);  // Create a new operator node with left and right children
        }

        return left;
    }
    const parseTerm = () => {
        if (tokens[index] === '(') {
            index++;  // Skip '('
            const expression = parseExpression();  // Recursively parse inside parentheses
            index++;  // Skip ')'
            return expression;
        } else {
            return parseCondition();  // Parse a condition (e.g., age > 30)
        }
    }
    const parseCondition = () => {
        const attribute = tokens[index++];  // Get the attribute (e.g., 'age')
        const operator = tokens[index++];   // Get the comparison operator (e.g., '>')
        const value = tokens[index++];      // Get the value (e.g., '30')

        // Create an operand node for the condition
        return new Node('operand', { attribute, operator, value });
    }

    return parseExpression();  // Parse the entire rule string
}

const combineRules = (rules) => {
    if (!rules || rules.length === 0) {
        throw new Error('No rules provided');
    }

    // Parse each rule string into an AST
    const asts = rules.map(rule => parseRuleStringToAST(rule));

    // Combine ASTs using the most frequent operator heuristic
    const combinedAST = asts.reduce((combined, currentAST) => {
        if (!combined) {
            return currentAST;
        }

        // Combine the current AST with the combined AST using an OR operator (this is an example)
        return {
            type: 'operator',
            value: 'OR',
            left: combined,
            right: currentAST
        };
    }, null);

    return combinedAST;
}

function evaluateAST(node, data) {
    if (node.type === "operator") {
        const leftVal = evaluateAST(node.left, data);
        const rightVal = evaluateAST(node.right, data);

        if (node.value === "AND") return leftVal && rightVal;
        if (node.value === "OR") return leftVal || rightVal;
    } else if (node.type === "operand") {
        const { attribute, operator, value } = node.value;
        switch (operator) {
            case '>': return data[attribute] > value;
            case '<': return data[attribute] < value;
            case '=': return data[attribute] === value;
        }
    }
}

module.exports = {
    parseRuleStringToAST,
    combineRules,
    evaluateAST
}