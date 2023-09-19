import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; 
import App from './App';

describe('App Component', () => {
  it('adds a hero when the "ADD" button is clicked', async () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('Add Hero'));

    fireEvent.change(getByTestId('nickname-input'), { target: { value: 'New Hero' } });

    fireEvent.click(getByText('ADD'));

    await waitFor(() => {
      expect(getByText('New Hero')).toBeInTheDocument();
    });
  });

  it('displays an error message when adding a duplicate hero', async () => {
    const { getByText, getByTestId } = render(<App />);

    fireEvent.click(getByText('Add Hero'));

    fireEvent.change(getByTestId('nickname-input'), { target: { value: 'Existing Hero' } });

    fireEvent.click(getByText('ADD'));

    await waitFor(() => {
      expect(getByText('Hero with that name already exists')).toBeInTheDocument();
    });
  });

});
