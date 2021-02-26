import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('render App', () => {
  const { container, getByTestId, debug } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(getByTestId("navigation")).toBeTruthy();
  expect(container).toBeInTheDocument();
});


