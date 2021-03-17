import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import Countdown from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import Timing from '../components/Timing';

import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const DEFAULT_TIME = 0.1;

const Timer = ({ focusSubject, onTimerEnd, onClearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => {
        Vibration.vibrate()
      }, 1000);
      setTimeout(() => {
        clearInterval(interval)
      }, 5000);
    } else if (Platform.OS === 'android') {
      Vibration.vibrate(5000);
    }
  }

  const onEnd = () => {
    vibrate();

    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);

    onTimerEnd();
  }

  const changeTime = (newMins) => {
    setMinutes(newMins);
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={styles.progressBarWrapper}>
        <ProgressBar progress={progress} color='#5E84E2' style={{ height: 10 }} />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing handleChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
      {
        isStarted ? (
          <RoundedButton title="pause" handlePress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" handlePress={() => setIsStarted(true)} />
        )
      }
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton title="←" size={50} handlePress={onClearSubject} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: colors.white,
    textAlign: 'center'
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  progressBarWrapper: {
    padding: spacing.sm,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    paddingTop: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingLeft: spacing.md,
    paddingBottom: spacing.md
  }
})

export default Timer;