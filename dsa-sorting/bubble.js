function bubbleSort(arr) {
  // Create a copy of the array to avoid mutating the original
  const array = [...arr];
  
  // If array is empty or has 1 element, it's already sorted
  if (array.length <= 1) return array;
  
  // Outer loop - we need to make n-1 passes
  for (let i = 0; i < array.length - 1; i++) {
    let swapped = false;
    
    // Inner loop - compare adjacent elements
    for (let j = 0; j < array.length - 1 - i; j++) {
      // If current element is greater than next element, swap them
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return array;
}

module.exports = bubbleSort;