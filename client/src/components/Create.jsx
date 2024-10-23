import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
    const [ruleString, setRuleString] = useState('');
    const [ast, setAst] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setRuleString(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const generatedAst = await axios.post('http://localhost:8000/api/createRules', { ruleString });
            console.log(generatedAst.data);
            setAst(generatedAst.data);
        } catch (err) {
            setError('Error creating rule');
        }
    };

    return (
        <div className="container">
            <h2>Create Rule and Display AST</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="ruleString">Rule String:</label>
                    <textarea
                        id="ruleString"
                        rows="4"
                        value={ruleString}
                        onChange={handleChange}
                        placeholder="((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"
                        required
                    />
                </div>
                <button type="submit">Generate AST</button>
            </form>

            {/* Display Generated AST */}
            {ast && (
                <div className="ast-output">
                    <h3>Generated AST:</h3>
                    <pre>{JSON.stringify(ast, null, 2)}</pre>
                </div>
            )}

            {/* Display Error */}
            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Create;