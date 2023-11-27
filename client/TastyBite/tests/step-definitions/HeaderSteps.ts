import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { useUserStore } from '../state/store';
import { act } from 'react-dom/test-utils';

jest.mock('../state/store');

const feature = loadFeature('./src/features/Header.feature');

defineFeature(feature, (test) => {
  test('User is logged in', ({ given, then }) => {
    given('the user is logged in', () => {
      useUserStore.mockImplementation(() => ({
        user: { username: 'testuser', profile_picture: 'testpicture' },
      }));
    });

    then('the user\'s profile picture and username should be displayed', () => {
      act(() => {
        render(<Header />);
      });
      expect(screen.getByText('testuser')).toBeInTheDocument();
      // You might need to add additional checks for the profile picture
    });
  });

  test('User is not logged in', ({ given, then }) => {
    given('the user is not logged in', () => {
      useUserStore.mockImplementation(() => ({
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