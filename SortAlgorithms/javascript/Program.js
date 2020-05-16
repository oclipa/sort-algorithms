import Algorithm from './Algorithm.mjs';

import BubbleSort from './BubbleSort.mjs';
import CountingSort from './CountingSort.mjs';
import SelectionSort from './SelectionSort.mjs';
import InsertionSort from './InsertionSort.mjs';
import MergeSort from './MergeSort.mjs';
import QuickSort from './QuickSort.mjs';
import HeapSort from './HeapSort.mjs';
import RadixSort from './RadixSort.mjs';

class Program {
  constructor() {}

  static Run = () => {

    //const origObjValues = [ "apple", "orange", "banana", "apple", "coconut", "olive", "egg", "banana", "ham", "milk", "coconut", "cheese" ];

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

    const algorithms = [
      new BubbleSort(),
      new SelectionSort(),
      new InsertionSort(),
      new QuickSort(),
      new MergeSort(),
      new CountingSort(min, max, origObjValues),
      new HeapSort(),
      new RadixSort()
    ];

    console.log("Javascript");
    console.log("STARTED --------------------------------------------");

    for (let i = 0; i < algorithms.length; i++) {

      // reset input valuesS
      objValues.length = 0;
      objValues.push(...origObjValues);

      const alg = new Algorithm();
      alg.run(algorithms[i], objValues);
    }

    console.log("STOPPED --------------------------------------------");
  };
}

Program.Run();

