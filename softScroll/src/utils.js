// Takes a value from a range and returns a value from 0 to 1
export const norm = (value, min, max) => value - min / max - min;

// Takes a normalized value and returns the value within a range
export const lerp = (norm, min, max) => (max - min) * norm + min;

// Maps a value from one range into a value to another range
export const map = (value, sourceMin, sourceMax, destMin, destMax) => (destMax - destMin) * (value - sourceMin / sourceMax - sourceMin) + destMin;

// Limits the value between a range
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Calculate distance between two points
export const distance = (p0, p1) => {
  const dx = p1.x - p0.x;
  const dy = p1.y - p0.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export const randomRange = (min, max) => min + Math.random() * (max - min);

export const randomInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

// Returns a normalize range of random values
export const randomDist = (min, max, iterations) => {
  let total = 0

  for (let i = 0; i < iterations; i++) {
    total += min + Math.random() * (max - min);
  }
  return total/iterations;
}

export const degreesToRadians = (degrees) => degrees / 180 * Math.PI;

export const radiansToDegrees = (radians) => radians * 180 / Math.PI;

export const roundToPlaces = (value, places) => {
  const mult = Math.pow(10, places);
  return Math.round(value * mult) / mult;
}

export const roundNearest = (value, nearest) => Math.round(value / nearest) * nearest;