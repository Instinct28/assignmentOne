import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    let [ast, setAst] = useState(''); // Store the AST as a string
    const [data, setData] = useState({
        age: '',
        department: '',
        salary: '',
        experience: '',
    });
    const [evaluationResult, setEvaluationResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleAstChange = (e) => {
        setAst(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Parse the AST string into a JSON object
            ast = JSON.parse(ast);
            const result = await axios.post('http://localhost:8000/api/evaluateRule', { ast, data });
            setEvaluationResult(result.data);
            setAst('');
            setData({age: '', department: '', salary: '', experience: ''});
        } catch (err) {
            setError('Error evaluating rule');
        }
    };

    return (
        <div className="container">
            <h2>Evaluate Rule Against Data</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>AST (JSON):</label>
                    <textarea
                        rows="5"
                        value={ast}
                        onChange={handleAstChange}
                        placeholder='{"type": "operator", "operator": "AND", "left": {...}, "right": {...}}' // Example structure
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={data.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={data.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={data.salary}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Experience:</label>
                    <input
                        type="number"
                        name="experience"
                        value={data.experience}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Evaluate</button>
            </form>

            {/* Display Evaluation Result */}
            {evaluationResult !== null && (
                <div className="evaluation-result">
                    <h3>Evaluation Result:</h3>
                    <p>{evaluationResult ? 'True' : 'False'}</p>
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

export default Home;