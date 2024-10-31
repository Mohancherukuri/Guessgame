import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import GuessingGame from './GuessGame';

describe('GuessingGame', () => {
  it('renders the initial UI correctly', () => {
    const {getByText, getByPlaceholderText} = render(<GuessingGame />);

    expect(getByText('Guess the Number!')).toBeTruthy();
    expect(getByText('Enter a number between 1 and 100:')).toBeTruthy();
    expect(getByPlaceholderText('Your guess')).toBeTruthy();
    expect(getByText('Submit Guess')).toBeTruthy();
    expect(getByText('Reset Game')).toBeTruthy();
  });

  it('displays "Too low" feedback for a lower guess', () => {
    const {getByPlaceholderText, getByText} = render(<GuessingGame />);

    const input = getByPlaceholderText('Your guess');
    const submitButton = getByText('Submit Guess');

    fireEvent.changeText(input, '1');
    fireEvent.press(submitButton);

    expect(getByText('Too low, try again.')).toBeTruthy();
  });

  // it('displays "Too high" feedback for a higher guess', () => {
  //   const {getByPlaceholderText, getByText} = render(<GuessingGame />);

  //   const input = getByPlaceholderText('Your guess');
  //   const submitButton = getByText('Submit Guess');

  //   fireEvent.changeText(input, '100');
  //   fireEvent.press(submitButton);

  //   expect(getByText('Too high, try again.')).toBeTruthy();
  // });

  //   it('displays "Congratulations" feedback for the correct guess', async () => {
  //     const {getByPlaceholderText, getByText} = render(<GuessingGame />);

  //     const input = getByPlaceholderText('Your guess');
  //     const submitButton = getByText('Submit Guess');

  //     // Manually set the target number to a known value for the test
  //     const correctGuess = '50';
  //     fireEvent.changeText(input, correctGuess);
  //     fireEvent.press(submitButton);

  //     await waitFor(() =>
  //       expect(getByText('Congratulations! You guessed it right!')).toBeTruthy(),
  //     );
  //   });

  it('resets the game when "Reset Game" is pressed', () => {
    const {getByText, getByPlaceholderText, queryByText} = render(
      <GuessingGame />,
    );

    const input = getByPlaceholderText('Your guess');
    const submitButton = getByText('Submit Guess');
    const resetButton = getByText('Reset Game');

    fireEvent.changeText(input, '1');
    fireEvent.press(submitButton);
    expect(getByText('Too low, try again.')).toBeTruthy();

    fireEvent.press(resetButton);

    // Ensure feedback message is cleared after reset
    expect(queryByText('Too low, try again.')).toBeNull();
    expect(input.props.value).toBe('');
  });
});
