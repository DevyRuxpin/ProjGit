/**
 * Calculate the mean (average) of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The mean value
 */
function calculateMean(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Numbers array is required and cannot be empty.');
  }
  
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

/**
 * Calculate the median (middle value) of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The median value
 */
function calculateMedian(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Numbers array is required and cannot be empty.');
  }
  
  // Sort the numbers in ascending order
  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const length = sortedNumbers.length;
  
  // If odd number of elements, return the middle element
  if (length % 2 === 1) {
    return sortedNumbers[Math.floor(length / 2)];
  }
  
  // If even number of elements, return the average of the two middle elements
  const mid1 = sortedNumbers[length / 2 - 1];
  const mid2 = sortedNumbers[length / 2];
  return (mid1 + mid2) / 2;
}

/**
 * Calculate the mode (most frequent value) of an array of numbers
 * @param {number[]} numbers - Array of numbers
 * @returns {number} The mode value (first occurrence if multiple modes exist)
 */
function calculateMode(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Numbers array is required and cannot be empty.');
  }
  
  // Create a frequency map
  const frequencyMap = {};
  let maxFrequency = 0;
  let mode = numbers[0]; // Default to first element
  
  // Count frequency of each number
  for (const num of numbers) {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    
    // Update mode if current number has higher frequency
    if (frequencyMap[num] > maxFrequency) {
      maxFrequency = frequencyMap[num];
      mode = num;
    }
  }
  
  return mode;
}

module.exports = {
  calculateMean,
  calculateMedian,
  calculateMode
}; 