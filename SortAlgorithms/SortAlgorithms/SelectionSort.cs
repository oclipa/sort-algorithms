using System;

namespace SortAlgorithms
{
	/// <summary>
	/// https://www.interviewcake.com/concept/python/selection-sort
	///
	/// Selection sort works by repeatedly "selecting" the next-smallest element
	/// from the unsorted array and moving it to the front.
	/// 
	/// Worst:   O(n^2)
	/// Best:    O(n^2)
	/// Average: O(n^2)
	/// Space:   O(1)
	///
	/// Slow but useful when swapping is expensive.
	/// 
	/// </summary>
	public class SelectionSort : AbstractAlgorithm<object>
	{
		public SelectionSort(object[] objValues)
			: base(objValues)
		{
		}

		public override object[] DoRun()
		{
			int min; // effectively reduces size of array by one in each iteration

			int maxIndex = _objCount - 1;

			for (int i = 0; i < maxIndex; i++)
			{
				min = i; // assuming order is increasing
				int iNext = i + 1;

				for (int j = iNext; j < _objCount; j++) // ignore _objValues[i]
				{
					IComparable v = _objValues[j] as IComparable;
					IComparable vPrev = _objValues[min] as IComparable;

					if (v.CompareTo(vPrev) < 0) // v < vPrev
    					min = j;
				}

				Swap(_objValues, min, i);
			}

			return _objValues;
		}
	}
}
