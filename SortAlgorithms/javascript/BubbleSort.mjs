// https://www.hackerearth.com/practice/notes/sorting-code-monk/
//
// Bubble sort works by comparing each item in the list with the item next
// to it and swapping them if required.
// 
// Worst:   O(n^2)
// Best:    O(n)
// Average: O(n^2)
// Space:   O(1)
//
// Not really used outside teaching.
const BubbleSort = function () {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof BubbleSort) )
     return new BubbleSort();
};

BubbleSort.prototype = function () {

  let algName = 'BubbleSort';

  //private members
  const doSort = function (objValues) {

    const objCount = objValues.length; 
    const maxIndex = objCount - 1;
  
    let t = 0;
    for (let i = 0; i < maxIndex; i++)
    {
      let maxIndexExcludingCompared = maxIndex - i;
  
      for (let j = 0; j < maxIndexExcludingCompared; j++) // ignore already compared elements
      {
        const v = objValues[j];
        const nextV = objValues[j + 1];
  
        if (v > nextV) // v > nextV
        {
          objValues[j] = nextV;
          objValues[j + 1] = v;
        }

        t++;
      }
    }

    return objValues;
  };

  //public members
  return {
      doSort: doSort,
      algName: algName
  };
} ();

export default BubbleSort;