import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from './RoundedButton';

const Timing = ({ handleChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          title="10"
          size={75}
          handlePress={() => handleChangeTime(10)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          title="15"
          size={75}
          handlePress={() => handleChangeTime(15)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          title="20"
          size={75}
          handlePress={() => handleChangeTime(20)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Timing;
