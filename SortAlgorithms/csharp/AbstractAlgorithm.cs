using System;
namespace SortAlgorithms
{
    public abstract class AbstractAlgorithm<T> : IAlgorithm
    {
        protected T[] _objValues;
        protected int _objCount;

        public AbstractAlgorithm(T[] objValues)
        {
            _objValues = objValues;
            _objCount = objValues.Length;
        }

        public void Run()
        {
            //PrintArray(_objValues);

            DateTime start = DateTime.UtcNow;
            T[] sortedValues = DoRun();
            DateTime end = DateTime.UtcNow;

            //PrintArray(sortedValues);

            Console.WriteLine("{0} : {1}", this.GetType(), (end - start).TotalMilliseconds);
        }

        public abstract T[] DoRun();

        protected void PrintArray(T[] array)
        {
            Console.WriteLine("[{0}]", string.Join(", ", array));
        }

        protected static void Swap(T[] objValues, int index1, int index2)
        {
            T obj1 = objValues[index1];
            objValues[index1] = objValues[index2];
            objValues[index2] = obj1;
        }
    }
}
