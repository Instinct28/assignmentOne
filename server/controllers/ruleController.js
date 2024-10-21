const { parseRuleStringToAST, combineRules, evaluateAST } = require('../Services/ruleServices');

const createRule = (req, res) => {
    try {
        const ruleString = req.body.rule;
        const ruleAST = parseRuleStringToAST(ruleString);
        res.json(ruleAST);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const combineRule = (req, res) => {
    const { rules } = req.body;

    if (!rules || !Array.isArray(rules)) {
        return res.status(400).json({ error: 'Rules must be an array of rule strings' });
    }

    try {
        const combinedAST = combineRules(rules);
        res.status(200).json(combinedAST);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const evaluateRule = (req, res) => {
    try {
        const { ast, data } = req.body;
        const result = evaluateAST(ast, data);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createRule,
    combineRule,
    evaluateRule
}