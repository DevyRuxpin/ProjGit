const { calculateMean, calculateMedian, calculateMode } = require('./operations');

describe('Statistical Operations', () => {
  describe('calculateMean', () => {
    test('should calculate mean of positive integers', () => {
      expect(calculateMean([1, 2, 3, 4, 5])).toBe(3);
    });

    test('should calculate mean of negative numbers', () => {
      expect(calculateMean([-1, -2, -3, -4, -5])).toBe(-3);
    });

    test('should calculate mean of mixed positive and negative numbers', () => {
      expect(calculateMean([-2, 0, 2, 4, 6])).toBe(2);
    });

    test('should calculate mean of decimal numbers', () => {
      expect(calculateMean([1.5, 2.5, 3.5])).toBe(2.5);
    });

    test('should calculate mean of single number', () => {
      expect(calculateMean([42])).toBe(42);
    });

    test('should throw error for empty array', () => {
      expect(() => calculateMean([])).toThrow('Numbers array is required and cannot be empty.');
    });

    test('should throw error for null input', () => {
      expect(() => calculateMean(null)).toThrow('Numbers array is required and cannot be empty.');
    });

    test('should throw error for undefined input', () => {
      expect(() => calculateMean(undefined)).toThrow('Numbers array is required and cannot be empty.');
    });
  });

  describe('calculateMedian', () => {
    test('should calculate median of odd number of elements', () => {
      expect(calculateMedian([1, 3, 5, 7, 9])).toBe(5);
    });

    test('should calculate median of even number of elements', () => {
      expect(calculateMedian([1, 2, 3, 4])).toBe(2.5);
    });

    test('should calculate median of unsorted array', () => {
      expect(calculateMedian([5, 2, 8, 1, 9])).toBe(5);
    });

    test('should calculate median of negative numbers', () => {
      expect(calculateMedian([-5, -3, -1, -7, -9])).toBe(-5);
    });

    test('should calculate median of mixed numbers', () => {
      expect(calculateMedian([-2, 0, 2, 4])).toBe(1);
    });

    test('should calculate median of decimal numbers', () => {
      expect(calculateMedian([1.5, 2.5, 3.5, 4.5])).toBe(3);
    });

    test('should calculate median of single number', () => {
      expect(calculateMedian([42])).toBe(42);
    });

    test('should calculate median of two numbers', () => {
      expect(calculateMedian([10, 20])).toBe(15);
    });

    test('should throw error for empty array', () => {
      expect(() => calculateMedian([])).toThrow('Numbers array is required and cannot be empty.');
    });

    test('should throw error for null input', () => {
      expect(() => calculateMedian(null)).toThrow('Numbers array is required and cannot be empty.');
    });

    test('should throw error for undefined input', () => {
      expect(() => calculateMedian(undefined)).toThrow('Numbers array is required and cannot be empty.');
    });
  });

  describe('calculateMode', () => {
    test('should find mode in array with single most frequent number', () => {
      expect(calculateMode([1, 2, 2, 3, 4])).toBe(2);
    });

    test('should find mode in array with multiple occurrences', () => {
      expect(calculateMode([1, 1, 1, 2, 2, 3])).toBe(1);
    });

    test('should return first element when all numbers appear once', () => {
      expect(calculateMode([1, 2, 3, 4, 5])).toBe(1);
    });

    test('should find mode with negative numbers', () => {
      expect(calculateMode([-1, -1, 2, 3, 4])).toBe(-1);
    });

    test('should find mode with decimal numbers', () => {
      expect(calculateMode([1.5, 1.5, 2.5, 3.5])).toBe(1.5);
    });

    test('should find mode with mixed data types (all numbers)', () => {
      expect(calculateMode([1, 1.0, 1, 2, 3])).toBe(1);
    });

    test('should return first occurrence when multiple modes exist', () => {
      expect(calculateMode([1, 1, 2, 2, 3])).toBe(1);
    });

    test('should calculate mode of single number', () => {
      expect(calculateMode([42])).toBe(42);
    });

    test('should throw error for empty array', () => {
      expect(() => calculateMode([])).toThrow('Numbers array is required and cannot be empty.');
    });

    test('should throw error for null input', () => {
      expect(() => calculateMode(null)).toThrow('Numbers array is required and cannot be empty.');
    });

    test('should throw error for undefined input', () => {
      expect(() => calculateMode(undefined)).toThrow('Numbers array is required and cannot be empty.');
    });
  });
}); 