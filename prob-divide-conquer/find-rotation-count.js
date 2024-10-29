function findRotationCount(arr) {
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

  return left;
}

module.exports = findRotationCount;