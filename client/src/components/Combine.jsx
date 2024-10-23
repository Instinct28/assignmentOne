import React, { useState } from 'react';
import axios from 'axios';

const Combine = () => {
    const [rule1, setRule1] = useState('');
    const [rule2, setRule2] = useState('');
    const [combinedAst, setCombinedAst] = useState(null);
    const [error, setError] = useState(null);

    const handleChangeRule1 = (e) => {
        setRule1(e.target.value);
    };

    const handleChangeRule2 = (e) => {
        setRule2(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const rules = [rule1, rule2];
            const generatedAst = await axios.post('http://localhost:8000/api/combineRule', { rules });
            setCombinedAst(generatedAst.data);
        } catch (err) {
            setError('Error combining rules');
        }
    };

    return (
      <div className="container">
          <h2>Combine Two Rules and Display Combined AST</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="rule1">Rule 1:</label>
                  <textarea
                      id="rule1" // Added id
                      rows="4"
                      value={rule1}
                      onChange={handleChangeRule1}
                      placeholder="Enter first rule"
                      required
                  />
              </div>
              <div>
                  <label htmlFor="rule2">Rule 2:</label>
                  <textarea
                      id="rule2" // Added id
                      rows="4"
                      value={rule2}
                      onChange={handleChangeRule2}
                      placeholder="Enter second rule"
                      required
                  />
              </div>
              <button type="submit">Combine Rules</button>
          </form>

          {/* Display Combined AST */}
          {combinedAst && (
              <div className="ast-output">
                  <h3>Combined AST:</h3>
                  <pre>{JSON.stringify(combinedAst, null, 2)}</pre>
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

export default Combine;