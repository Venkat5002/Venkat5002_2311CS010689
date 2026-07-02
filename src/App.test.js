import { render, screen } from '@testing-library/react';
import App from './App';
import AllNotifications from './pages/AllNotifications';
import api from './services/api';

jest.mock('./services/api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

beforeEach(() => {
  api.get.mockResolvedValue({ data: { notifications: [] } });
});

test('renders the all notifications page heading', async () => {
  render(<App />);

  expect(
    await screen.findByRole('heading', { name: /all notifications/i })
  ).toBeInTheDocument();
});

test('renders navigation links for both pages', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /all notifications/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /priority inbox/i })).toBeInTheDocument();
});

test('shows fallback notifications when the API request fails', async () => {
  api.get.mockRejectedValueOnce(new Error('network failure'));

  render(<AllNotifications />);

  expect(await screen.findByText(/your placement result is out/i)).toBeInTheDocument();
  expect(await screen.findByText(/a new campus event is scheduled/i)).toBeInTheDocument();
});
