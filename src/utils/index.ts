export function objIsEmpty<T extends unknown>(obj: { [key: string]: T }) {
  for (let _ in obj) {
    return false;
  }

  return true;
}
