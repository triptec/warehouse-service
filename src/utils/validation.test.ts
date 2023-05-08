import { validateId } from './validation';

describe('validateId', () => {
  it('should return the ID when a valid string ID is provided', () => {
    const id = 'abc123';
    const result = validateId(id);
    expect(result).toEqual(id);
  });

  it('should throw an error when ID is undefined', () => {
    expect(() => validateId(undefined)).toThrowError('Invalid ID parameter');
  });

  it('should throw an error when ID is not a string', () => {
    const id: any = 123; // Non-string value
    expect(() => validateId(id)).toThrowError('Invalid ID parameter');
  });
});
