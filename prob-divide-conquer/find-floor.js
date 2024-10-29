function findFloor(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  let floor = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === num) {
      return arr[mid];
    } else if (arr[mid] < num) {
      floor = arr[mid];
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return floor;
}

module.exports = findFloor;