using System;
using System.Collections.Generic;

namespace SortAlgorithms
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                //object[] objs = new object[] { "apple", "orange", "banana", "apple", "coconut", "olive", "egg", "banana", "ham", "milk", "coconut", "cheese" };

                int valueCount = 10000;

                object[] origObjValues = new object[valueCount];
                long[] origLongValues = new long[valueCount];
                Random rand = new Random();
                long min = long.MaxValue;
                long max = long.MinValue;
                for (int i = 0; i < valueCount; i++)
                {
                    long v = Convert.ToInt64(rand.Next(valueCount));

                    min = v < min ? v : min;
                    max = v > max ? v : max;

                    origObjValues[i] = v;
                    origLongValues[i] = v;
                }

                object[] objValues = new object[valueCount];
                long[] longValues = new long[valueCount];

                Array.Copy(origObjValues, objValues, valueCount);
                Array.Copy(origLongValues, longValues, valueCount);

                List<IAlgorithm> algorithms = new List<IAlgorithm>
                {
                    new CountSort(objValues, min, max),
                    new BubbleSort(objValues),
                    new SelectionSort(objValues),
                    new InsertionSort(objValues),
                    new MergeSort(objValues),
                    new QuickSort(objValues),
                    new HeapSort(objValues),
                    new RadixSort(longValues)
                };

                foreach (IAlgorithm algorithm in algorithms)
                {
                    // reset arrays
                    Array.Copy(origObjValues, objValues, valueCount);
                    Array.Copy(origLongValues, longValues, valueCount);

                    algorithm.Run();
                }
            }
            catch (Exception x)
            {
                Console.WriteLine(x.Message);
                Console.WriteLine(x.StackTrace);
            }
        }
    }
}
