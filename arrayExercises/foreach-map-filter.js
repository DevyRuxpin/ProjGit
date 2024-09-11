function doubleValues(array) {
    let newArray= [];
    for ( let i = 0; i < array.length; i++ )
        {
        newArray.push(array[i]*2);
    }
    return newArray;
}

function onlyEvenValues(array) {
    let newArray = [];
    for ( let i = 0; i < array.length; i++ )
        {
        if (array[i] % 2 === 0) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}

function showFirstAndLast(arr) {
    return arr.map(name => name[0] + name[name.length - 1]);
}

function addKeyAndValue(arr, key, value) {
    arr.forEach(obj => {
        obj[key] = value;
    });
    return arr;
}



function vowelCount(str) {
    const vowels = 'aeiou';
    const vowelCountObj = {};

    str.toLowerCase().split('').forEach(char => {
        if (vowels.includes(char)) {
            vowelCountObj[char] = (vowelCountObj[char] || 0) + 1;
        }
    });

    return vowelCountObj;
}

function doubleValuesWithMap(arr) {
    return arr.map(val => val * 2);
}

function valTimesIndex(arr) {
    return arr.map((val, index) => val * index);
}

function extractKey(arr, key) {
    return arr.map(obj => obj[key]);
}

function filterByValue(arr, key) {
    return arr.filter(obj => obj[key]);
}

function find(arr, searchValue) {
    return arr.filter(val => val === searchValue)[0];
}

function findInObj(arr, key, searchValue) {
    return arr.filter(obj => obj[key] === searchValue)[0];
}

function removeVowels(str) {
    const vowels = 'aeiou';
    return str.toLowerCase().split('').filter(char => !vowels.includes(char)).join('');
}

function doubleOddNumbers(arr) {
    return arr.filter(val => val % 2 !== 0).map(val => val * 2);
}