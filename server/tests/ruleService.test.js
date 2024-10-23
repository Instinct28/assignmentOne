const { parseRuleStringToAST, combineRules, evaluateAST } = require('../Services/ruleServices');
const Node = require('../Services/Node')

describe('Rule Engine Services', () => {

    describe('create_rule (parseRuleStringToAST)', () => {
        it('should parse a valid rule string and return the correct AST', () => {
            const rule = "age > 30 AND department = 'Sales'";
    
            // Define the expected AST structure
            const expectedAST = new Node('operator', 'AND', 
                new Node('operand', { attribute: 'age', operator: '>', value: '30' }),
                new Node('operand', { attribute: 'department', operator: '=', value: 'Sales' }) // Removed extra quotes
            );
    
            // Call the parse function
            const ast = parseRuleStringToAST(rule);
    
            // Check if the parsed AST matches the expected structure
            expect(ast).toEqual(expectedAST);
        });
    });
    

    describe('combine_rules (combineRules)', () => {
        it('should combine two valid rule strings into one AST', () => {
            const rule1 = "age > 30 AND department = 'Sales'";
            const rule2 = "salary > 50000 OR experience > 5";
    
            const combinedAst = combineRules([rule1, rule2]);
    
            expect(combinedAst).toHaveProperty('type', 'operator');
            expect(combinedAst.value).toBe('OR');
            expect(combinedAst.left).toHaveProperty('type', 'operator');
            expect(combinedAst.right).toHaveProperty('type', 'operator');
        });
    
        it('should throw an error when no rules are provided', () => {
            expect(() => combineRules([])).toThrow('No rules provided');
        });
    
        it('should throw an error when a non-string rule is provided', () => {
            expect(() => combineRules([123])).toThrow('Each rule must be a valid string');
        });
    });
    

    describe('evaluate_rule (evaluateAST)', () => {
        it('should evaluate a valid AST and return true for matching data', () => {
            const ast = parseRuleStringToAST("age > 30 AND department = 'Sales'");
            const data = { age: 35, department: 'Sales', salary: 60000, experience: 3 };

            const result = evaluateAST(ast, data);
            expect(result).toBe(true);
        });

        it('should return false for non-matching data', () => {
            const ast = parseRuleStringToAST("age > 30 AND department = 'Sales'");
            const data = { age: 25, department: 'Marketing', salary: 60000, experience: 3 };

            const result = evaluateAST(ast, data);
            expect(result).toBe(false);
        });
    });
});
