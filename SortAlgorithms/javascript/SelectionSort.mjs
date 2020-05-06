import Algorithm from './Algorithm.mjs';

// https://www.interviewcake.com/concept/python/selection-sort
//
// Selection sort works by repeatedly "selecting" the next-smallest element
// from the unsorted array and moving it to the front.
// 
// Worst:   O(n^2)
// Best:    O(n^2)
// Average: O(n^2)
// Space:   O(1)
//
// Slow but useful when swapping is expensive.
const SelectionSort = function () {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof SelectionSort) )
     return new SelectionSort();
};

SelectionSort.prototype = function () {

  let algName = 'SelectionSort';

  //private members
  const doSort = function (objValues) {

    const objCount = objValues.length; 

    let min = 0; // effectively reduces size of array by one in each iteration

    let maxIndex = objCount - 1;

    for (let i = 0; i < maxIndex; i++)
    {
      min = i; // assuming order is increasing
      const iNext = i + 1;

      for (let j = iNext; j < objCount; j++) // ignore _objValues[i]
      {
        const v = objValues[j];
        const vPrev = objValues[min];

        if (v < vPrev) // v < vPrev
          min = j;
      }

      Algorithm.prototype.swap(objValues, min, i);
    }

    return objValues;
  };

  //public members
  return {
      doSort: doSort,
      algName: algName
  };
} ();

export default SelectionSort;