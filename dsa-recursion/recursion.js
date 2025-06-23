/** product: calculate the product of an array of numbers. */

function product(nums) {
  // Base case: if array is empty, return 1 (multiplicative identity)
  if (nums.length === 0) return 1;
  
  // Recursive case: multiply first element with product of rest of array
  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  // Base case: if array is empty, return 0
  if (words.length === 0) return 0;
  
  // Base case: if array has one word, return its length
  if (words.length === 1) return words[0].length;
  
  // Recursive case: compare first word length with longest of rest
  const firstLength = words[0].length;
  const restLongest = longest(words.slice(1));
  
  return Math.max(firstLength, restLongest);
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  // Base case: if string is empty, return empty string
  if (str.length === 0) return "";
  
  // Base case: if string has one character, return it
  if (str.length === 1) return str;
  
  // Recursive case: take first character and every other from rest
  return str[0] + everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  // Base case: empty string or single character is palindrome
  if (str.length <= 1) return true;
  
  // Recursive case: check if first and last characters match, then check middle
  if (str[0] !== str[str.length - 1]) return false;
  
  return isPalindrome(str.slice(1, -1));
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, index = 0) {
  // Base case: if array is empty, value not found
  if (arr.length === 0) return -1;
  
  // Base case: if first element matches, return current index
  if (arr[0] === val) return index;
  
  // Recursive case: search in rest of array
  return findIndex(arr.slice(1), val, index + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  // Base case: if string is empty, return empty string
  if (str.length === 0) return "";
  
  // Base case: if string has one character, return it
  if (str.length === 1) return str;
  
  // Recursive case: last character + reverse of rest
  return str[str.length - 1] + revString(str.slice(0, -1));
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strings = [];
  
  // Iterate through object keys
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      // If value is a string, add to array
      if (typeof value === "string") {
        strings.push(value);
      }
      // If value is an object (and not null), recursively gather strings
      else if (typeof value === "object" && value !== null) {
        strings = strings.concat(gatherStrings(value));
      }
    }
  }
  
  return strings;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length - 1) {
  // Base case: if left > right, value not found
  if (left > right) return -1;
  
  // Calculate middle index
  const mid = Math.floor((left + right) / 2);
  
  // Base case: if middle element equals value, return its index
  if (arr[mid] === val) return mid;
  
  // Recursive case: search left half if value is less than middle
  if (val < arr[mid]) {
    return binarySearch(arr, val, left, mid - 1);
  }
  
  // Recursive case: search right half if value is greater than middle
  return binarySearch(arr, val, mid + 1, right);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
