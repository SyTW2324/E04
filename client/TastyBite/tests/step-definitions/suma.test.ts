import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { Header } from '../../src/components/Header';

describe('<Header />', () => {
  test('renders Header component', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeDefined();
  });
});