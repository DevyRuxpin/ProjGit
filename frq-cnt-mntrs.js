// constructNote
function constructNote(message, letters) {
  const letterCount = {};
  for (let char of letters) {
    letterCount[char] = (letterCount[char] || 0) + 1;
  }
  for (let char of message) {
    if (!letterCount[char]) return false;
    letterCount[char]--;
  }
  return true;
}

// averagePair
function averagePair(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    let avg = (arr[left] + arr[right]) / 2;
    if (avg === target) return true;
    else if (avg < target) left++;
    else right--;
  }
  return false;
}

// twoArrayObject
function twoArrayObject(keys, values) {
  const obj = {};
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = i < values.length ? values[i] : null;
  }
  return obj;
}

// sameFrequency
function sameFrequency(num1, num2) {
  const str1 = num1.toString();
  const str2 = num2.toString();
  if (str1.length !== str2.length) return false;
  const count = {};
  for (let char of str1) {
    count[char] = (count[char] || 0) + 1;
  }
  for (let char of str2) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}

// separatePositive
function separatePositive(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    if (arr[left] > 0) left++;
    else if (arr[right] < 0) right--;
    else {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return arr;
}

// isSubsequence
function isSubsequence(str1, str2) {
  let i = 0, j = 0;
  while (i < str1.length && j < str2.length) {
    if (str1[i] === str2[j]) i++;
    j++;
  }
  return i === str1.length;
}

// countPairs
function countPairs(arr, target) {
  arr.sort((a, b) => a - b);
  let left = 0, right = arr.length - 1, count = 0;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) {
      count++;
      left++;
      right--;
    } else if (sum < target) left++;
    else right--;
  }
  return count;
}

// longestFall
function longestFall(arr) {
  if (arr.length === 0) return 0;
  let max = 1, curr = 1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) curr++;
    else curr = 1;
    if (curr > max) max = curr;
  }
  return max;
}

// pivotIndex
function pivotIndex(arr) {
  let total = arr.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (leftSum === total - leftSum - arr[i]) return i;
    leftSum += arr[i];
  }
  return -1;
}