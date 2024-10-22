import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CombineRulesForm from '../components/Combine';

jest.mock('../components/Combine');

describe('CombineRulesForm', () => {
    it('renders the form with the correct initial state', () => {
        render(<CombineRulesForm />);
        expect(screen.getByLabelText(/Rule 1:/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Rule 2:/)).toBeInTheDocument();
    });

    it('calls the combineRules service when the form is submitted', async () => {
        const mockAst = { type: 'AND', left: {}, right: {} };
        combineRules.mockResolvedValueOnce(mockAst);

        render(<CombineRulesForm />);

        fireEvent.change(screen.getByLabelText(/Rule 1:/), {
            target: { value: "age > 30 AND department = 'Sales'" },
        });

        fireEvent.change(screen.getByLabelText(/Rule 2:/), {
            target: { value: "salary > 50000 OR experience > 5" },
        });

        fireEvent.click(screen.getByText(/Combine Rules/));

        await waitFor(() => expect(combineRules).toHaveBeenCalledWith([
            "age > 30 AND department = 'Sales'",
            "salary > 50000 OR experience > 5"
        ]));

        expect(screen.getByText(/Combined AST:/)).toBeInTheDocument();
    });
});
