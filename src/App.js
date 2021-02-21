import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, Text, ActivityIndicator} from 'react-native';
import {useGeoLocation, calculateDistance} from './common';
import {useWorkers} from './api';
import {WorkerItem} from './components/WorkerItem';

const WORKERS_TO_SHOW = 20;
const App = () => {
  const [location] = useGeoLocation();
  const [workers, status] = useWorkers();
  const [filteredWorkers, setFilteredWorkers] = useState([]);

  // Order workers according to the location and get the first 10
  useEffect(() => {
    if (!location) {
      setFilteredWorkers(workers.slice(0, WORKERS_TO_SHOW));
    } else {
      const workersWithDistance = workers.map((worker) => ({
        ...worker,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          Number(worker.latitude),
          Number(worker.longitude),
        ),
      }));
      workersWithDistance.sort((worker1, worker2) =>
        worker1.distance - worker2.distance > 0 ? 1 : -1,
      );
      setFilteredWorkers(workersWithDistance.slice(0, WORKERS_TO_SHOW));
    }
  }, [location, workers]);

  const renderItem = ({item}) => {
    return <WorkerItem worker={item} />;
  };

  return (
    <SafeAreaView>
      {/* Stylings to be done according to the design given! */}
      {status === 'loading' ? <ActivityIndicator /> : null}
      {status === 'error' ? <Text>Some Error Occurred!</Text> : null}
      {status === 'success' ? (
        <FlatList
          data={filteredWorkers}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default App;
