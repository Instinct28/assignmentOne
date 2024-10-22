import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import EvaluateRuleForm from '../components/Home';

jest.mock('../components/Home');

describe('EvaluateRuleForm', () => {
    it('renders the form with the correct initial state', () => {
        render(<EvaluateRuleForm />);
        expect(screen.getByLabelText(/AST \(in JSON format\):/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Input Data \(in JSON format\):/)).toBeInTheDocument();
    });

    it('calls the evaluateRule service when the form is submitted', async () => {
        evaluateRule.mockResolvedValueOnce(true);

        render(<EvaluateRuleForm />);

        fireEvent.change(screen.getByLabelText(/AST \(in JSON format\):/), {
            target: { value: '{"type": "AND", "left": {}, "right": {}}' },
        });

        fireEvent.change(screen.getByLabelText(/Input Data \(in JSON format\):/), {
            target: { value: '{"age": 35, "department": "Sales"}' },
        });

        fireEvent.click(screen.getByText(/Evaluate Rule/));

        await waitFor(() => expect(evaluateRule).toHaveBeenCalledWith(
            { type: 'AND', left: {}, right: {} },
            { age: 35, department: 'Sales' }
        ));

        expect(screen.getByText(/Result: true/)).toBeInTheDocument();
    });

    it('displays an error message if evaluateRule fails', async () => {
        evaluateRule.mockRejectedValueOnce(new Error('Invalid data'));

        render(<EvaluateRuleForm />);

        fireEvent.change(screen.getByLabelText(/AST \(in JSON format\):/), {
            target: { value: '{"type": "AND", "left": {}, "right": {}}' },
        });

        fireEvent.change(screen.getByLabelText(/Input Data \(in JSON format\):/), {
            target: { value: '{"age": 35, "department": "Sales"}' },
        });

        fireEvent.click(screen.getByText(/Evaluate Rule/));

        await waitFor(() => expect(screen.getByText(/Invalid data/)).toBeInTheDocument());
    });
});
