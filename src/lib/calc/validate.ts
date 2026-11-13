/** Small guards shared by every calculation function. All throw RangeError. */

export function assertFinite(name: string, value: number): void {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new RangeError(`${name} must be a finite number`);
  }
}

export function assertPositive(name: string, value: number): void {
  assertFinite(name, value);
  if (value <= 0) throw new RangeError(`${name} must be greater than zero`);
}

export function assertNonNegative(name: string, value: number): void {
  assertFinite(name, value);
  if (value < 0) throw new RangeError(`${name} cannot be negative`);
}

export function assertPercent(name: string, value: number, max = 100): void {
  assertFinite(name, value);
  if (value < 0 || value > max) throw new RangeError(`${name} must be between 0 and ${max}%`);
}

export function assertInteger(name: string, value: number, min = 1): void {
  assertFinite(name, value);
  if (!Number.isInteger(value) || value < min) {
    throw new RangeError(`${name} must be a whole number of at least ${min}`);
  }
}
