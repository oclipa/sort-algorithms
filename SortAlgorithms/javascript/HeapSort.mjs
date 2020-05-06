import Algorithm from './Algorithm.mjs';

// https://www.interviewcake.com/concept/python/heapsort
//
// Heap sort is similar to selection sort—we're repeatedly choosing the
// largest item and moving it to the end of our array. But we use a heap to
// get the largest item more quickly (a heap being something that conceptually
// resembles a tree, with the largest value at the root and the decreasing values
// down to the leaves).
// 
// Worst:   O(nlgn)
// Best:    O(n)
// Average: O(nlgn)
// Space:   O(1)
//
// In theory fast and space efficient, and scales well.  In practice, often
// slower due to hidden complexities.
const HeapSort = function () {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof HeapSort) )
     return new HeapSort();
};

HeapSort.prototype = function () {

  let algName = 'HeapSort';

  //private members
  const doSort = function (objValues) {

    const objCount = objValues.length; 
    const maxIndex = objCount - 1;
  
    doHeapSort(objValues, objCount);

    return objValues;
  };

  const getLeftChildIndex = function (parentIndex) {
    return parentIndex * 2 + 1;
  }

  const getRightChildIndex = function (parentIndex) {
    return parentIndex * 2 + 2;
  }

  const doBubbleDown = function (objValues, objCount, index) {
    // Restore a max heap where value at index may be out of place
    // (i.e. smaller than its children)

    while (index < objCount)
    {
      const leftIndex = getLeftChildIndex(index);
      const rightIndex = getRightChildIndex(index);

      // If we don't have any child nodes, we can stop
      if (leftIndex >= objCount)
        break;

      const leftChild = objValues[leftIndex];

      let rightChild = null;
      if (rightIndex < objCount)
        rightChild = objValues[rightIndex];

      // find the larger of the two children
      let largerChildIndex = leftIndex;
      let largerChild = leftChild;
      if (rightChild != null && leftChild < rightChild)
      {
        largerChildIndex = rightIndex;
        largerChild = rightChild;
      }

      const parent = objValues[index];

      // Are we larger than our children?
      // If so, swap with the larger child
      if (parent < largerChild)
      {
        Algorithm.prototype.swap(objValues, index, largerChildIndex);

        // Continue bubbling down
        index = largerChildIndex;
      }
      else
      {
        // we're larger than both children, so we're done
        break;
      }
    }
  }

  const removeMax = function (objValues, objCount)
  {
    // Remove and return the largest item from a heap
    // Updates the heap in-place, maintaining validity

    // Grab the largest value from the root
    const maxValue = objValues[0];

    const lastIndex = objCount - 1;

    // Move the last item in the heap into the root poisition
    objValues[0] = objValues[lastIndex];

    // And bubble down from the root to restore the heap
    doBubbleDown(objValues, lastIndex, 0);

    return maxValue;
  }

  const heapify = function (objValues, objCount)
  {
    const lastIndex = objCount - 1;

    // Bubble down from the leaf nodes up to the top
    for (let i = lastIndex; i > -1; i--)
      doBubbleDown(objValues, objCount, i);
  }

  const doHeapSort = function (objValues, objCount)
  {
    heapify(objValues, objCount);

    while (objCount > 0)
    {
      // Remove the largest item and update the heap size
      const largestValue = removeMax(objValues, objCount);
      objCount--;

      // Store the removed value at the end of the list, after
      // the entries used by the heap
      objValues[objCount] = largestValue;
    }
  }

  //public members
  return {
      doSort: doSort,
      algName: algName
  };
} ();

export default HeapSort;