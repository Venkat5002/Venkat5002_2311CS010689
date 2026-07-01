import { render, screen } from '@testing-library/react';
import App from './App';
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
