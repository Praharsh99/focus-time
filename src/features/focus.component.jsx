import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../components/RoundedButton';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const Focus = ({ addSubject }) => {
  const [newTask, setNewTask] = useState('');

  const addTextToState = ({ nativeEvent }) => {
    setNewTask(nativeEvent.text);
  }

  const handlePress = () => {
    addSubject(newTask);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput onSubmitEditing={addTextToState} style={{ flex: 1, marginRight: spacing.md }} />
          <RoundedButton handlePress={handlePress} size={50} title="+" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default Focus;