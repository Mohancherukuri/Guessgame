import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

const GuessingGame: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  // Generate a random number between 1 and 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Handle the guess submission
  const handleGuess = () => {
    const guessNumber = parseInt(guess);
    if (isNaN(guessNumber)) {
      Alert.alert('Invalid input', 'Please enter a number.');
      return;
    }

    if (guessNumber === targetNumber) {
      setFeedback('Congratulations! You guessed it right!');
    } else if (guessNumber < targetNumber) {
      setFeedback('Too low, try again.');
    } else {
      setFeedback('Too high, try again.');
    }

    setGuess(''); // Reset the guess input
  };

  // Reset the game
  const resetGame = () => {
    setTargetNumber(generateRandomNumber());
    setFeedback('');
    setGuess('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Guess the Number!</Text>
      <Text style={styles.instructions}>Enter a number between 1 and 100:</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
        placeholder="Your guess"
      />

      <Button title="Submit Guess" onPress={handleGuess} />
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      <Button title="Reset Game" onPress={resetGame} color="#FF5733" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  feedback: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
});

export default GuessingGame;
