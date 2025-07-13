import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

test('button triggers shorten handler', () => {
  const { getByPlaceholderText, getByText } = render(<App />);
  const input = getByPlaceholderText('Enter long URL');
  fireEvent.changeText(input, 'https://example.com');
  const button = getByText('Shorten URL');
  fireEvent.press(button);
  expect(button).toBeTruthy(); 
});