using System;

namespace SortAlgorithms
{
	/// <summary>
	/// https://www.interviewcake.com/concept/python/insertion-sort
	///
	/// Insertion sort works by inserting elements from an unsorted array into
	/// a sorted subsection of the array, one item at a time.
	/// 
	/// Worst:   O(n^2)
	/// Best:    O(n)
	/// Average: O(n^2)
	/// Space:   O(1)
	///
	/// Good for data which is nearly sorted (slow otherwise).
	/// 
	/// </summary>
	public class InsertionSort : AbstractAlgorithm<object>
	{
		public InsertionSort(object[] objValues)
			: base(objValues)
		{
		}

		public override object[] DoRun()
		{
            // i = index of unsorted values
            // j = index of sorted values
			for (int i = 1; i < _objCount; i++)
			{
				IComparable vUnsorted = _objValues[i] as IComparable; // current unsorted element value

				int j = i;
				IComparable vSorted = _objValues[j - 1] as IComparable; // preceeding sorted element value

				// iterate backwards ("to the left") over the previously sorted values
				while (j > 0 && vSorted.CompareTo(vUnsorted) >= 0) // vSorted >= vUnsorted 
				{
                    // if current unsorted element value is less than neighbouring sorted element value,
                    // need to move the sorted value to the right and the unsorted value to the left
                    // (effectively swapping the values)

					_objValues[j] = vSorted; // move sorted element to index previously holding unsorted element

					j--; // move the index of the unsorted element to the left

                    if (j > 0)
    					vSorted = _objValues[j - 1] as IComparable; // get sorted element value at new location

					// once vUnsorted < vSorted, we drop out of the loop
				}

				// set vUnsorted at its new sorted position
				_objValues[j] = vUnsorted;
			}

			return _objValues;
		}
	}
}
