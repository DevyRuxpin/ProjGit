function sortedFrequency(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let firstIndex = -1;
  let lastIndex = -1;

  // Find the first occurrence
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) {
      firstIndex = mid;
      right = mid - 1; // Continue searching in the left half
    } else if (arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (firstIndex === -1) return -1; // Number not found

  left = 0;
  right = arr.length - 1;

  // Find the last occurrence
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) {
      lastIndex = mid;
      left = mid + 1; // Continue searching in the right half
    } else if (arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return lastIndex - firstIndex + 1;
}

module.exports = sortedFrequency;