const mu = 1;
const dt = 0.1;
const x0 = 100;
const sigma = 2.0;

// Standard Normal variate using Box-Muller transform.
function gaussianRandom(mean = 0, stdev = 1) {
  const u = 1 - Math.random(); // Converting [0,1) to (0,1]
  const v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  // Transform to the desired mean and standard deviation:
  return z * stdev + mean;
}

const walk = (): number =>
  Math.exp((mu - sigma ** 2 / 2) * dt + sigma * gaussianRandom(0, Math.sqrt(dt)));

let value = x0;
for (let i = 0; i < 100; i++) {
  value *= walk();
  console.log(value);
}

export {};
