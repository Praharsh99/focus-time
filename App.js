import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Focus from './src/features/focus.component.jsx';
import Timer from './src/features/timer.component.jsx';
import FocusHistory from './src/components/FocusHistory';

import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  useEffect(() => {
    loadFocusHistory();
  }, [])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: parseInt(Date.now()), subject, status }]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'focusHistoryTest',
        JSON.stringify(focusHistory)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistoryTest');

      if (history && JSON.parse(history).length) setFocusHistory(JSON.parse(history));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null);
          }}
          onClearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />

          <FocusHistory
            focusHistory={focusHistory}
            onClear={() => setFocusHistory([])}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
