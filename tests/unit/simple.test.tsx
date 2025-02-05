import { render, screen } from '@testing-library/react';
import React from 'react';

test('simple test', () => {
  render(<div>Hello World</div>);
  const element = screen.getByText(/Hello World/i);
  expect(element).toBeInTheDocument();
});
