/**
 * Dummy function to calculate distance between two coordinates
 * NOTE: This just uses the pythagoreas theorem for the sake of simplicity, since this calculate will makes more sense in the backend
 * @param {number} lat1 Latitude of the first coordinate
 * @param {number} lng1 Longitude of the first coordinate
 * @param {number} lat2 Latitude of the second coordinate
 * @param {number} lng2 Longitude of the second coordinate
 * @returns {number} distance
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  return Math.floor(
    Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lng1 - lng2, 2)),
  );
}
