// importamos la función `example`
import filters from '../src/data';

describe('filters.filterByType', () => {
  it('debería ser una función', () => {
    expect(typeof filters.filterByType).toBe('function');
  });
});
