import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minsToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);
  const [minHand, setMinHand] = useState(0);
  const [secHand, setSecHand] = useState(0);

  const interval = useRef(null);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [isPaused]);

  useEffect(() => {
    setMillis(minsToMillis(minutes));
  }, [minutes])

  useEffect(() => {
    setMinHand(Math.floor(millis / 1000 / 60) % 60);
    setSecHand(Math.floor(millis / 1000) % 60);
  }, [millis]);

  useEffect(() => {
    onProgress(millis / minsToMillis(minutes));

    if (millis === 0) {
      onEnd();
    }
  }, [millis])

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        return time;
      }

      return time - 1000;
    });
  };

  return (
    <Text style={styles.title}>
      {formatTime(minHand)}:{formatTime(secHand)}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    borderRadius: fontSizes.lg,
  },
});

export default Countdown;
