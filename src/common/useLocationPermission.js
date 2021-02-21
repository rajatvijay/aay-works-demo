import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  check,
  RESULTS,
  request as requestRNP,
} from 'react-native-permissions';
import {debug} from './debug';

const locationPermissionLogger = debug('useLocationPermission');

const PERMISSION_NAME =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

/**
 * Hook to ask location permission on mount
 * @returns [
 *    status: RESULTS,
 *    function to request permission: () => Promise<RESULTS>
 * ]
 */
export const useLocationPermission = () => {
  const [status, setStatus] = useState(RESULTS.UNAVAILABLE);

  const request = useCallback(async () => {
    const result = await requestRNP(PERMISSION_NAME);
    setStatus(result);
    return result;
  }, []);

  useEffect(() => {
    check(PERMISSION_NAME)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            locationPermissionLogger(
              'This feature is not available (on this device / in this context)',
            );
            return setStatus(RESULTS.UNAVAILABLE);
          case RESULTS.DENIED:
            requestRNP();
            return setStatus(RESULTS.DENIED);
          case RESULTS.GRANTED:
            return setStatus(RESULTS.GRANTED);
          case RESULTS.BLOCKED:
            locationPermissionLogger(
              'The permission is denied and not request-able anymore',
            );
            return setStatus(RESULTS.BLOCKED);
        }
      })
      .catch((error) => {
        locationPermissionLogger(error);
      });
  }, [request]);

  return [status, request];
};
