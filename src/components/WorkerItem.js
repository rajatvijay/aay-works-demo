import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const WorkerItem = (props) => {
  const {worker} = props;
  return (
    <View style={styles.root}>
      <Text style={styles.heading}>
        {worker.name.first + (worker.name.last ? ` ${worker.name.last}` : '')}
      </Text>
      <View style={styles.meta}>
        <Text style={styles.metaItem}>{worker.company}</Text>
        {worker.distance ? (
          <Text style={styles.distance}>{worker.distance} Kms from here</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 16,
    marginBottom: 2,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    fontSize: 10,
  },
});
