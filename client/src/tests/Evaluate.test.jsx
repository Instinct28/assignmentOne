import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Evaluate from '../components/Home'; // Adjust the import path accordingly
import '@testing-library/jest-dom';

jest.mock('axios'); // Mock the axios library

describe('Evaluate Component', () => {
    it('displays an error message if evaluateRule fails', async () => {
        axios.post.mockRejectedValueOnce(new Error('API error'));

        render(<Evaluate />);

        // Simulate filling in the form
        fireEvent.change(screen.getByLabelText(/AST \(JSON\):/), {
            target: { value: '{"type": "operator", "operator": "AND"}' }
        });
        fireEvent.change(screen.getByLabelText(/Age:/), { target: { value: '30' } });
        fireEvent.change(screen.getByLabelText(/Department:/), { target: { value: 'Sales' } });
        fireEvent.change(screen.getByLabelText(/Salary:/), { target: { value: '50000' } });
        fireEvent.change(screen.getByLabelText(/Experience:/), { target: { value: '5' } });

        // Use getByRole to find the button and click it
        fireEvent.click(screen.getByRole('button', { name: /Evaluate/i }));

        await waitFor(() => {
            expect(screen.getByText(/Error evaluating rule/i)).toBeInTheDocument();
        });
    });
});
