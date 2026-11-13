import { assertNonNegative, assertPositive } from "./validate";

/** Volume of a rectangular prism (slab, footing, wall, bed). SI in, m³ out. */
export function rectangularVolume(length: number, width: number, depth: number): number {
  assertPositive("Length", length);
  assertPositive("Width", width);
  assertPositive("Depth", depth);
  return length * width * depth;
}

/** Area of a rectangle. */
export function rectangleArea(length: number, width: number): number {
  assertPositive("Length", length);
  assertPositive("Width", width);
  return length * width;
}

/** Area of a circle from its diameter: π (d/2)². */
export function circleArea(diameter: number): number {
  assertPositive("Diameter", diameter);
  return Math.PI * (diameter / 2) ** 2;
}

/** Volume of a cylinder (round column, pier, post hole): π (d/2)² h. */
export function cylinderVolume(diameter: number, height: number): number {
  assertPositive("Height", height);
  return circleArea(diameter) * height;
}

/** Volume of a hollow tube: π h ((D/2)² − (d/2)²). */
export function tubeVolume(outerDiameter: number, innerDiameter: number, height: number): number {
  assertPositive("Outer diameter", outerDiameter);
  assertNonNegative("Inner diameter", innerDiameter);
  assertPositive("Height", height);
  if (innerDiameter >= outerDiameter) {
    throw new RangeError("Inner diameter must be smaller than outer diameter");
  }
  return Math.PI * height * ((outerDiameter / 2) ** 2 - (innerDiameter / 2) ** 2);
}

/**
 * Volume of solid concrete steps resting on grade.
 * Step i (1 = bottom) is a block `run` deep and `i × rise` tall, so
 * V = width × run × rise × n(n + 1) / 2.
 */
export function stepsVolume(width: number, rise: number, run: number, steps: number): number {
  assertPositive("Width", width);
  assertPositive("Rise", rise);
  assertPositive("Run", run);
  if (!Number.isInteger(steps) || steps < 1) throw new RangeError("Number of steps must be a whole number of at least 1");
  return width * run * rise * ((steps * (steps + 1)) / 2);
}
