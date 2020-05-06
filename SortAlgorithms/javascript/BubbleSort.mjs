//import Algorithm from './Algorithm.mjs';

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
function BubbleSort() {

  function doSort(objValues) {
  
    const objCount = objValues.length; 
    const maxIndex = objCount - 1;
  
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
      }
    }

    return objValues;
  };
}

export default BubbleSort;

// function CreateBubbleSort(...args) {
  
//   const bubbleSort = new Algorithm();
//   Algorithm.prototype.algName = "BubbleSort";
//   Algorithm.prototype.doSort = doSort;

//   const objValues = args[0];

//   function doSort() {
  
//     const objCount = objValues.length; 
//     const maxIndex = objCount - 1;
  
//     for (let i = 0; i < maxIndex; i++)
//     {
//       let maxIndexExcludingCompared = maxIndex - i;
  
//       for (let j = 0; j < maxIndexExcludingCompared; j++) // ignore already compared elements
//       {
//         const v = objValues[j];
//         const nextV = objValues[j + 1];
  
//         if (v > nextV) // v > nextV
//         {
//           objValues[j] = nextV;
//           objValues[j + 1] = v;
//         }
//       }
//     }

//     return objValues;
//   };

//   return bubbleSort;
// }

// export default CreateBubbleSort;