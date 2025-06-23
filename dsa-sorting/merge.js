function merge(arr1, arr2) {
  // Create a new array to store the merged result
  const merged = [];
  let i = 0; // pointer for arr1
  let j = 0; // pointer for arr2
  
  // Compare elements from both arrays and add the smaller one to merged array
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements from arr1 if any
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }
  
  // Add remaining elements from arr2 if any
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }
  
  return merged;
}

function mergeSort(arr) {
  // Base case: if array has 0 or 1 element, it's already sorted
  if (arr.length <= 1) return arr;
  
  // Find the middle point to divide array into two halves
  const mid = Math.floor(arr.length / 2);
  
  // Recursively sort the two halves
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // Merge the sorted halves
  return merge(left, right);
}

module.exports = { merge, mergeSort};