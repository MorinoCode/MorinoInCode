// src/lib/utils.js

/**
 * A simple utility to merge tailwind classnames.
 * Filters out falsy values and joins them with space.
 */
export function cn(...inputs) {
  return inputs.flat(Infinity).filter(Boolean).join(" ");
}
