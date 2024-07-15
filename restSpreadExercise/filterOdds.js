function filterOutOdds(arg, ...nums){
    const allNums= [arg, ...nums];
    const filtered=allNums.filter(num=>num%2===0);
    return filtered;
}

function findMin(...nums){
    return Math.min(...nums);
}

function mergeObjects(obj1, obj2){
    return {...obj1, ...obj2};
}
function doubleAndReturnArgs(arg, args) {
    const doubledArgs = [...args].map(num => num *2);
    return [...arg, ...doubledArgs];
}

function removeRandom(items){
    const randomIndex = Math.floor(Math.random()*items.length);
    return [...items.slice(0, randomIndex), ...items.slice(randomIndex+1)];
}

function extend(array1, array2){
    return [...array1, ...array2];
}

function addKeyVal(obj, key, val) {
    return {...obj, [key]: val };
}

function removeKey(obj, key){
    const newObj = {...obj};
    delete newObj[key];
    return newObj;
}

function update(obj, key, val){
    return {...obj, [key]: val};
}