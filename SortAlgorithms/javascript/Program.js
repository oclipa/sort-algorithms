//import CreateBubbleSort from './BubbleSort.mjs';
//import BubbleSort from './BubbleSort.mjs';
import Algorithm from './Algorithm.mjs';

class Program {
  constructor() {}

  static Run = () => {

    const valueCount = 10000;

    const origObjValues = [];

    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for (let i = 0; i < valueCount; i++) {
      const v = Math.floor(Math.random() * valueCount);

      min = v < min ? v : min;
      max = v > max ? v : max;

      origObjValues[i] = v;
    }

    const objValues = [...origObjValues];

    // const bs = CreateBubbleSort(objValues);
    const bs = new BubbleSort();

    const algorithms = [
      bubbleSort
      // () => { countSort(objValues, min, max) },
      // () => { selectionSort(objValues) },
      // () => { insertionSort(objValues) },
      // () => { mergeSort(objValues) },
      // () => { quickSort(objValues) },
      // () => { heapSort(objValues) },
      // () => { radixSort(longValues) }
    ];

    for (let i = 0; i < algorithms.length; i++) {

      // reset input values
      objValues.length = 0;
      objValues.push(...origObjValues);

      const alg = new Algorithm(algorithms[i]);
      alg.run(objValues);
    }
  };

  bubbleSort = function() {

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
}

Program.Run();

