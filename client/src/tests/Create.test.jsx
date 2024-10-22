import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CreateRuleForm from '../components/Create';

// Mock the createRule service
jest.mock('../components/Create');

describe('CreateRuleForm', () => {
    it('renders the form with the correct initial state', () => {
        render(<CreateRuleForm />);
        expect(screen.getByLabelText(/Rule String:/)).toBeInTheDocument();
    });

    it('calls the createRule service when the form is submitted', async () => {
        const mockAst = { type: 'AND', left: {}, right: {} };
        createRule.mockResolvedValueOnce(mockAst);

        render(<CreateRuleForm />);

        fireEvent.change(screen.getByLabelText(/Rule String:/), {
            target: { value: "age > 30 AND department = 'Sales'" },
        });

        fireEvent.click(screen.getByText(/Generate AST/));

        await waitFor(() => expect(createRule).toHaveBeenCalledWith("age > 30 AND department = 'Sales'"));

        expect(screen.getByText(/Generated AST:/)).toBeInTheDocument();
    });

    it('displays an error message if createRule fails', async () => {
        createRule.mockRejectedValueOnce(new Error('Invalid rule'));

        render(<CreateRuleForm />);

        fireEvent.change(screen.getByLabelText(/Rule String:/), {
            target: { value: "age > 30 AND department = 'Sales'" },
        });

        fireEvent.click(screen.getByText(/Generate AST/));

        await waitFor(() => expect(screen.getByText(/Invalid rule/)).toBeInTheDocument());
    });
});
