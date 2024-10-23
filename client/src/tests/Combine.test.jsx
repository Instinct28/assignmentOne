import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Combine from '../components/Combine'; // Adjust the import path accordingly

import '@testing-library/jest-dom';

jest.mock('axios'); // Mock the axios library

describe('Combine Component', () => {
    it('calls the combineRule service when the form is submitted', async () => {
        const mockCombinedAst = { type: 'AND', left: {}, right: {} };
        axios.post.mockResolvedValueOnce({ data: mockCombinedAst });

        render(<Combine />);

        fireEvent.change(screen.getByLabelText(/Rule 1:/), { target: { value: 'rule1' } });
        fireEvent.change(screen.getByLabelText(/Rule 2:/), { target: { value: 'rule2' } });

        fireEvent.click(screen.getByText(/Combine Rules/i));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/combineRule', {
                rules: ['rule1', 'rule2'],
            });
        });

        expect(screen.getByText(/Combined AST:/i)).toBeInTheDocument();

        // Use regex to match the combined AST text
        expect(screen.getByText(/"type":\s*"AND"/)).toBeInTheDocument();
        expect(screen.getByText(/"left":\s*{}/)).toBeInTheDocument();
        expect(screen.getByText(/"right":\s*{}/)).toBeInTheDocument();
    });

    it('displays an error message if the API call fails', async () => {
        axios.post.mockRejectedValueOnce(new Error('API error'));

        render(<Combine />);

        fireEvent.change(screen.getByLabelText(/Rule 1:/), { target: { value: 'rule1' } });
        fireEvent.change(screen.getByLabelText(/Rule 2:/), { target: { value: 'rule2' } });

        fireEvent.click(screen.getByText(/Combine Rules/i));

        await waitFor(() => {
            expect(screen.getByText(/Error combining rules/i)).toBeInTheDocument();
        });
    });
});
