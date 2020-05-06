import Algorithm from './Algorithm.mjs';

// https://www.interviewcake.com/concept/python/quicksort
//
// Quicksort works by recursively dividing the input into two smaller
// arrays around a pivot item: one half has items smaller than the pivot,
// the other has larger items.
// 
// Worst:   O(n^2)
// Best:    O(nlgn)
// Average: O(nlgn)
// Space:   O(lgn)
//
// Significantly faster than merge sort but more complicated; works best
// with random data.
const QuickSort = function () {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof QuickSort) )
     return new QuickSort();
};

QuickSort.prototype = function () {

  let algName = 'QuickSort';

  //private members
  const doSort = function (objValues) {

    const objCount = objValues.length; 
  
    doQuickSort(objValues, 0, objCount - 1, false);

    return objValues;
  };

  const doPartition = function (objValues, leftStartIndex, rightEndIndex)
  {
    const pivotValue = objValues[leftStartIndex];      // make the first element the pivot point

    let nextIndex = leftStartIndex + 1;                 // get index of next element 
    let currentIndex = nextIndex;                       // set current index to be index of next element

    /* rearrange the array by putting elements which are less than the pivot
       on one side and those which are greater on the other. */

    // iterate over all indexes in range
    for (let j = nextIndex; j <= rightEndIndex; j++)
    {
      const currentValue = objValues[j];
      if (currentValue < pivotValue) // currentValue < pivotValue
      {
        Algorithm.prototype.swap(objValues, currentIndex, j); // swap currentValue with pivotValue (i.e. move currentValue left; move pivotValue right)
        currentIndex += 1; // check next index
      }
    }

    // once we have reached the end of the search, move the pivot value to the correct index
    // between the higher and lower values
    Algorithm.prototype.swap(objValues, leftStartIndex, currentIndex - 1);

    return currentIndex - 1; // return the pivot index
  }

  // Pick a random index in the given range and swap that value with the first value in the range.
  // Then partition the array around that value.
  const DoRandomPartition = function (objValues, startIndex, endIndex)
  {
    const randomIndex = startIndex + Math.random() % (endIndex - startIndex + 1);   // get position of pivot randomly

    Algorithm.prototype.swap(objValues, randomIndex, startIndex);                 // swap pivot with 1st element

    return doPartition(objValues, startIndex, endIndex);                          // call the partition function
  }
  
  /// Find a a pivot point between the start and end values of the array, then
  /// repeat recursively for the array values either side of the pivot.
  async function doQuickSort(objValues, leftStartIndex, rightEndIndex, isParallel)
  {
    if (leftStartIndex < rightEndIndex)
    {
      // Setting a random pivot position may give better performance in some cases
      //int pivotIndex = DoRandomPartition(objValues, leftStartIndex, rightEndIndex);     // get position of pivot
      const pivotIndex = doPartition(objValues, leftStartIndex, rightEndIndex);     // get position of pivot

      const leftEndIndex = pivotIndex - 1;
      const rightStartIndex = pivotIndex + 1;

      if (isParallel)
      {
        const responses = await Promise.all([
          doQuickSort(objValues, rightStartIndex, rightEndIndex, isParallel), // sorts to the right of pivot
          doQuickSort(objValues, leftStartIndex, leftEndIndex, isParallel) // sorts to the left of pivot
        ]);
         
        const rightSide = responses[0];
        const leftSide = responses[1];
      }
      else
      {
        doQuickSort(objValues, leftStartIndex, leftEndIndex);                // sorts to the left of pivot
        doQuickSort(objValues, rightStartIndex, rightEndIndex);                  // sorts to the right of pivot
      }
    }
  }

  //public members
  return {
      doSort: doSort,
      algName: algName
  };
} ();

export default QuickSort;