// https://www.interviewcake.com/concept/python/insertion-sort
//
// Insertion sort works by inserting elements from an unsorted array into
// a sorted subsection of the array, one item at a time.
// 
// Worst:   O(n^2)
// Best:    O(n)
// Average: O(n^2)
// Space:   O(1)
//
// Good for data which is nearly sorted (slow otherwise).
const InsertionSort = function () {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof InsertionSort) )
     return new InsertionSort();
};

InsertionSort.prototype = function () {

  let algName = 'InsertionSort';

  //private members
  const doSort = function (objValues) {

    const objCount = objValues.length; 

    // i = index of unsorted values
    // j = index of sorted values
    for (let i = 1; i < objCount; i++)
    {
      const vUnsorted = objValues[i]; // current unsorted element value

      let j = i;
      let vSorted = objValues[j - 1]; // preceeding sorted element value

      // iterate backwards ("to the left") over the previously sorted values
      while (j > 0 && vSorted >= vUnsorted) // vSorted >= vUnsorted 
      {
        // if current unsorted element value is less than neighbouring sorted element value,
        // need to move the sorted value to the right and the unsorted value to the left
        // (effectively swapping the values)

        objValues[j] = vSorted; // move sorted element to index previously holding unsorted element

        j--; // move the index of the unsorted element to the left

        if (j > 0)
          vSorted = objValues[j - 1]; // get sorted element value at new location

        // once vUnsorted < vSorted, we drop out of the loop
      }

      // set vUnsorted at its new sorted position
      objValues[j] = vUnsorted;
    }

    return objValues;
  };

  //public members
  return {
      doSort: doSort,
      algName: algName
  };
} ();

export default InsertionSort;