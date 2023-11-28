import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../../src/components/Header';
import { useUserStore } from '../../src/state/store'
import { act } from 'react-dom/test-utils';

jest.mock('../../src/state/store', () => ({
  useUserStore: jest.fn(),
}));
npm install --save-dev jest @types/jest ts-jest typescript
const feature = loadFeature('./features/Header.feature');

defineFeature(feature, (test) => {
  test('User is logged in', ({ given, then }) => {
    given('the user is logged in', () => {
      (useUserStore as jest.Mock).mockImplementation(() => ({
        user: { username: 'testuser', profile_picture: 'testpicture' },
      }));
    });

    then('the user\'s profile picture and username should be displayed', () => {
      act(() => {
        render(<Header />);
      });
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });
  });

  test('User is not logged in', ({ given, then }) => {
    given('the user is not logged in', () => {
      (useUserStore as jest.Mock).mockImplementation(() => ({
        user: null,
      }));
    });

    then('the login and register links should be displayed', () => {
      act(() => {
        render(<Header />);
      });
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
      expect(screen.getByText('Registarse')).toBeInTheDocument();
    });
  });
});