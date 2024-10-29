function findRotatedIndex(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  // Find the pivot
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  let pivot = left;
  left = 0;
  right = arr.length - 1;

  // Determine which subarray to search
  if (num >= arr[pivot] && num <= arr[right]) {
    left = pivot;
  } else {
    right = pivot - 1;
  }

  // Perform binary search
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) {
      return mid;
    } else if (arr[mid] < num) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

module.exports = findRotatedIndex;