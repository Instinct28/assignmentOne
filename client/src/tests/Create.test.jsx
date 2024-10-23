import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Create from '../components/Create';
import '@testing-library/jest-dom';

jest.mock('axios'); // Mock axios

describe('Create Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('renders the form with initial state', () => {
        render(<Create />);

        // Check if the form elements exist
        expect(screen.getByText(/Create Rule and Display AST/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Rule String:/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/age > 30 AND department/i)).toBeInTheDocument();
        expect(screen.getByText(/Generate AST/i)).toBeInTheDocument();
    });

    it('handles form input change', () => {
        render(<Create />);

        const textarea = screen.getByLabelText(/Rule String:/i);
        fireEvent.change(textarea, { target: { value: 'age > 30 AND salary > 50000' } });

        expect(textarea.value).toBe('age > 30 AND salary > 50000');
    });

    it('displays the generated AST when the form is submitted successfully', async () => {
        // Mock the API response
        const astResponse = { data: { type: 'operator', value: 'AND', left: {}, right: {} } };
        axios.post.mockResolvedValueOnce(astResponse);

        render(<Create />);

        const textarea = screen.getByLabelText(/Rule String:/i);
        fireEvent.change(textarea, { target: { value: 'age > 30 AND salary > 50000' } });

        const submitButton = screen.getByText(/Generate AST/i);
        fireEvent.click(submitButton);

        // Wait for AST to be displayed
        await waitFor(() => {
            expect(screen.getByText(/Generated AST:/i)).toBeInTheDocument();
            expect(screen.getByText(/"value": "AND"/i)).toBeInTheDocument();
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/createRules', { ruleString: 'age > 30 AND salary > 50000' });
    });

    it('displays an error message if API call fails', async () => {
        // Mock API error
        axios.post.mockRejectedValueOnce(new Error('API error'));

        render(<Create />);

        const textarea = screen.getByLabelText(/Rule String:/i);
        fireEvent.change(textarea, { target: { value: 'age > 30 AND salary > 50000' } });

        const submitButton = screen.getByText(/Generate AST/i);
        fireEvent.click(submitButton);

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText(/Error creating rule/i)).toBeInTheDocument();
        });

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/createRules', { ruleString: 'age > 30 AND salary > 50000' });
    });
});
