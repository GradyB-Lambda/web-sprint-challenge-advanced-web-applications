import React from 'react';
import { render, screen } from '@testing-library/react';
import BubblePage from './BubblePage';
import { fetchColors as mockFetchColors } from '../helpers/fetchColors';

jest.mock('../api/fetchColors');
const colorData = {
  data: [
    {
      color: 'aquamarine',
      code: { hex: '#7fffd4' },
      id: 0,
    },
    {
      color: 'blue',
      code: { hex: '#6093ca' },
      id: 1,
    },
  ],
};

test('Fetches data and renders the bubbles', async () => {
  mockFetchColors.mockResolvedValueOnce(colorData);

  render(<BubblePage />);

  const color = await screen.findAllByTestId('color');
  const blue = await screen.findByText(/blue/i);
  const aquamarine = await screen.findByText(/aquamarine/i);

  expect(color).toHaveLength(2);
  expect(blue).toBeInTheDocument();
  expect(aquamarine).toBeInTheDocument();
});