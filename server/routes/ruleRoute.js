const express = require('express');
const router = express.Router();
const { createRule, combineRule, evaluateRule} = require('../controllers/ruleController');

router.post('/createRules', createRule);
router.post('/combineRule', combineRule);
router.post('/evaluateRule', evaluateRule);

module.exports = router;