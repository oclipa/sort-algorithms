// https://www.interviewcake.com/concept/python/counting-sort
//
// Counting sort works by iterating through the input, counting the number
// of times each item occurs, and using those counts to compute each item's
// index in the final, sorted array.
// 
// Worst:   O(n)
// Best:    O(n)
// Average: O(n)
// Space:   O(n)
//
// Fast when the range and nature of potential items is known ahead of time,
// but requires a lot of space (in practice, rarely used).
const CountingSort = function (...args) {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof CountingSort) )
     return new CountingSort();

  [minValue,  maxValue, objs, ...rest] = args;
};

let minValue = 0;
let maxValue = 0;
let objs = [];
let rest = [];

CountingSort.prototype = function () {

  let algName = 'CountingSort';

  //private members
  const doSort = function (objValues) {

    const hasObjects = objs != null && objs.length > 0;

    const valueCount = Math.abs(maxValue - minValue) + 1;

    const objCount = objValues.length;
    
    const sortedObjs = [];

    const buffer = [];

    for (let i = 0; i < valueCount; i++)
      buffer[i] = 0;

    // store the count of each value in items in buffer
    for (let j = 0; j < objCount; j++)
    {
      const bufferIndex = shiftIndex(objValues[j], minValue);
      buffer[bufferIndex]++; // add 1 to value in buffer at index items[j]
    }

    // iteratively sum all counts in buffer, to get total number of 
    // elements that are at indexes less than i
    let num_items_before = 0;
    for (let i = 0; i < valueCount; i++)
    {
      const count = buffer[i];
      buffer[i] = num_items_before;
      num_items_before += count;
    }

    for (let j = 0; j < objCount; j++)
    {
      const objValue = objValues[j];
      const bufferIndex = shiftIndex(objValue, minValue);

      if (hasObjects)
      {
        const obj = objs[j];
        sortedObjs[buffer[bufferIndex]] = obj;
      }
      else
      {
        sortedObjs[buffer[bufferIndex]] = objValue;
      }

      buffer[bufferIndex]++;
    }

    return sortedObjs;
  };

  const shiftIndex = function (index, minValue) {
    return Math.floor(index - minValue); 
  };

  //public members
  return {
      doSort: doSort,
      algName: algName
  };
} ();

export default CountingSort;