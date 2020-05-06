// https://www.interviewcake.com/concept/python/merge-sort
//
// Merge sort works by splitting the input in half, recursively sorting
// each half, and then merging the sorted halves back together.
// 
// Worst:   O(nlgn)
// Best:    O(nlgn)
// Average: O(nlgn)
// Space:   O(n)
//
// Scales to very large lists, but can involve lots of copying.
const MergeSort = function () {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof MergeSort) )
     return new MergeSort();
};

MergeSort.prototype = function () {

  let algName = 'MergeSort';

  //private members
  const doSort = function (objValues) {

    doMergeSort(objValues, 0, objValues.length - 1);

    return objValues;
  };

  const doMergeSort = function (objValues, startIndex, endIndex) {

    if (startIndex < endIndex)
    {
      const mid = Math.floor((startIndex + endIndex) / 2);        // defined mid point

      doMergeSort(objValues, startIndex, mid);        // recursively called DoMergeSort() on left hand of array

      doMergeSort(objValues, mid + 1, endIndex);      // recursively called DoMergeSort() on right hand of array

      doMerge(objValues, startIndex, mid, endIndex);  // merge the two halves of the array
    }
  }

  const doMerge = function (objValues, startIndex, midIndex, endIndex)
  {
    let leftIndex = startIndex;                                             // current start index of left half of array
    let rightIndex = midIndex + 1;                                          // current start index of right half of array

    const mergeBuffer = [];                                                 // array into which values are merged
    let mergeIndex = 0;

    for (let i = startIndex; i <= endIndex; i++)
    {
      if (leftIndex > midIndex)                                             // end of left half of array
        mergeBuffer[mergeIndex++] = objValues[rightIndex++];                // copy right hand array value into buffer

      else if (rightIndex > endIndex)                                       // end of right half of array
        mergeBuffer[mergeIndex++] = objValues[leftIndex++];                 // copy left hand array value into buffer

      else if (objValues[leftIndex] < objValues[rightIndex])                // current left hand value is less than current right hand value
        mergeBuffer[mergeIndex++] = objValues[leftIndex++];                 // copy left hand array value into buffer

      else                                                                  // current right hand value is less than current left hand value
        mergeBuffer[mergeIndex++] = objValues[rightIndex++];                // copy right hand array value into buffer
    }

    for (let i = 0; i < mergeIndex; i++)                                    // copy buffer values into original array
    {
      objValues[startIndex++] = mergeBuffer[i];
    }
  }

  //public members
  return {
      doSort: doSort,
      algName: algName
  };
} ();

export default MergeSort;