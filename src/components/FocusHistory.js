import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

import { RoundedButton } from './RoundedButton';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles(item.status).historyItem}>{item.subject}</Text>;
};

const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <SafeAreaView style={{ flex: 0.9, alignItems: 'center' }}>
      {focusHistory?.length > 0 && (
        <>
          <Text style={styles().title}>Things we've done untill now!</Text>

          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={focusHistory}
            renderItem={HistoryItem}
          />

          <View style={styles().clearHistoryContainer}>
            <RoundedButton size={75} title="clear" handlePress={onClear} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = (status) =>
  StyleSheet.create({
    title: {
      color: colors.white,
      fontSize: fontSizes.md,
      paddingBottom: spacing.md,
    },
    historyItem: {
      color: status > 1 ? 'red' : 'green',
      fontWeight: '500',
      fontSize: fontSizes.md,
    },
    clearHistoryContainer: {
      flex: 0.5,
      alignItems: 'center',
      padding: spacing.md,
    },
  });

export default FocusHistory;
