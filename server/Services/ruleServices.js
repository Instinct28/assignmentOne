const Node = require('./Node');

const tokenize = (ruleString) => {
    if (typeof ruleString !== 'string' || ruleString.trim() === '') {
        throw new Error('Invalid rule string: must be a non-empty string');
    }
    
    // Regular expression to match words, numbers, operators, and parentheses
    const tokens = ruleString.match(/[\w]+|[><=]+|[()]/g);
    
    if (!tokens || tokens.length === 0) {
        throw new Error('Invalid rule string: failed to tokenize');
    }
    
    return tokens;
};

const parseRuleStringToAST = (ruleString) => {
    const tokens = tokenize(ruleString);
    let index = 0;

    const parseExpression = () => {
        let left = parseTerm();

        while (index < tokens.length && (tokens[index] === 'AND' || tokens[index] === 'OR')) {
            const operator = tokens[index];
            index++;
            const right = parseTerm();
            left = new Node('operator', operator, left, right);
        }

        return left;
    }

    const parseTerm = () => {
        if (tokens[index] === '(') {
            index++;
            const expression = parseExpression();
            if (tokens[index] !== ')') {
                throw new Error("Expected closing parenthesis");
            }
            index++;
            return expression;
        } else {
            return parseCondition();
        }
    }

    const parseCondition = () => {
        if (index >= tokens.length) {
            throw new Error("Unexpected end of input");
        }

        const attribute = tokens[index++];
        const operator = tokens[index++];
        const value = tokens[index++];

        if (!attribute || !operator || !value) {
            throw new Error("Invalid condition syntax");
        }

        return new Node('operand', { attribute, operator, value });
    }

    try {
        const ast = parseExpression();
        if (index < tokens.length) {
            throw new Error("Unexpected tokens after valid expression");
        }
        return ast;
    } catch (error) {
        throw new Error(`Failed to parse rule string: ${error.message}`);
    }
};



// const combineRules = (rules) => {
//     if (!rules || rules.length === 0) {
//         throw new Error('No rules provided');
//     }

//     // Parse each rule string into an AST
//     const asts = rules.map(rule => parseRuleStringToAST(rule));

//     // Combine ASTs using the most frequent operator heuristic
//     const combinedAST = asts.reduce((combined, currentAST) => {
//         if (!combined) {
//             return currentAST;
//         }

//         // Combine the current AST with the combined AST using an OR operator (this is an example)
//         return {
//             type: 'operator',
//             value: 'OR',
//             left: combined,
//             right: currentAST
//         };
//     }, null);

//     return combinedAST;
// }

const combineRules = (rules) => {
    // Validate the input, ensuring there are rules provided.
    if (!rules || rules.length === 0) {
        throw new Error('No rules provided');
    }

    // Parse each rule string into an AST using the existing parsing logic
    const asts = rules.map(rule => {
        if (typeof rule !== 'string') {
            throw new Error('Each rule must be a valid string');
        }
        return parseRuleStringToAST(rule);
    });

    // Combine ASTs using the most frequent operator heuristic (OR in this case)
    const combinedAST = asts.reduce((combined, currentAST) => {
        // If it's the first AST, we return it as the combined result
        if (!combined) {
            return currentAST;
        }

        // Combine the current AST with the combined AST using the OR operator
        return {
            type: 'operator',
            value: 'OR', // Here, we are hardcoding the 'OR' operator for combining rules
            left: combined,
            right: currentAST
        };
    }, null);

    // Return the final combined AST
    return combinedAST;
};

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