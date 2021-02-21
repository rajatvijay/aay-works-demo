import React, {useCallback, useState} from 'react';
import {RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {debug} from './debug';
import {useLocationPermission} from './useLocationPermission';

const geoLocationLogger = debug('useGeoLocation');

/**
 * Hook to fetch the location coordinates of the device
 * @returns [
 *    location: null | [lat: number, lng: number],
 *    location permission status to troubleshoot
 * ]
 */
export const useGeoLocation = () => {
  const [permissionStatus, requestPermission] = useLocationPermission();
  const [location, setLocation] = useState(null);

  const fetchLocation = useCallback(async () => {
    if (permissionStatus === RESULTS.GRANTED) {
      return new Promise((resolve) => {
        Geolocation.getCurrentPosition(
          (position) => {
            geoLocationLogger('position', position);
            setLocation(position.coords);
            resolve(position.coords);
          },
          (error) => {
            geoLocationLogger(error.code, error.message);
            // Not doing anything here since location is not must for this app
            resolve(null);
          },
          // These option can be tweaked depending on the requirements
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      return requestPermission();
    }
  }, [permissionStatus, requestPermission]);

  // Request permission whenever permission status changes automatically
  // To handle the cases where the user gives permission externally
  React.useEffect(() => {
    if (permissionStatus === RESULTS.GRANTED) {
      fetchLocation();
    }
  }, [fetchLocation, permissionStatus]);

  // To fetch location on mount
  React.useEffect(() => {
    if (!location) {
      fetchLocation();
    }
  }, [fetchLocation, location]);

  return [location, permissionStatus];
};
