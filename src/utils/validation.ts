export function validateId(id: string | undefined): string {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid ID parameter');
  }
  return id;
}
