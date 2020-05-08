using System;
using System.Threading.Tasks;

namespace SortAlgorithms
{
	/// <summary>
	/// https://www.interviewcake.com/concept/python/quicksort
	///
	/// Quicksort works by recursively dividing the input into two smaller
	/// arrays around a pivot item: one half has items smaller than the pivot,
	/// the other has larger items.
	/// 
	/// Worst:   O(n^2)
	/// Best:    O(nlgn)
	/// Average: O(nlgn)
	/// Space:   O(lgn)
	///
	/// Significantly faster than merge sort but more complicated; works best
	/// with random data.
	/// 
	/// </summary>
	public class QuickSort : AbstractAlgorithm<object>
	{
		private int _startIndex;
		private int _endIndex;

		public QuickSort(object[] objValues)
			: base(objValues)
		{
			_startIndex = 0;
			_endIndex = objValues.Length - 1;
		}

		public override object[] DoRun()
		{
			DoQuickSort(_objValues, _startIndex, _endIndex, true);

			return _objValues;
		}

		private static int DoPartition(object[] objValues, int leftStartIndex, int rightEndIndex)
		{
			object pivotValue = objValues[leftStartIndex];      // make the first element the pivot point

			int nextIndex = leftStartIndex + 1;                 // get index of next element 
			int currentIndex = nextIndex;                       // set current index to be index of next element

			/* rearrange the array by putting elements which are less than the pivot
			   on one side and those which are greater on the other. */

			// iterate over all indexes in range
			for (int j = nextIndex; j <= rightEndIndex; j++)
			{
				object currentValue = objValues[j];
				if ((currentValue as IComparable).CompareTo(pivotValue) < 0) // currentValue < pivotValue
				{
					Swap(objValues, currentIndex, j); // swap currentValue with pivotValue (i.e. move currentValue left; move pivotValue right)
					currentIndex += 1; // check next index
				}
			}

			// once we have reached the end of the search, move the pivot value to the correct index
			// between the higher and lower values
			Swap(objValues, leftStartIndex, currentIndex - 1);

			return currentIndex - 1; // return the pivot index
		}

		/// <summary>
		/// Pick a random index in the given range and swap that value with the first value in the range.
		/// Then partition the array around that value.
		/// </summary>
		/// <param name="objValues"></param>
		/// <param name="startIndex"></param>
		/// <param name="endIndex"></param>
		/// <returns></returns>
		private static int DoRandomPartition(object[] objValues, int startIndex, int endIndex)
		{
			Random rand = new Random();

			int randomIndex = startIndex + rand.Next() % (endIndex - startIndex + 1);   // get position of pivot randomly

			Swap(objValues, randomIndex, startIndex);                                   // swap pivot with 1st element

			return DoPartition(objValues, startIndex, endIndex);                        // call the partition function
		}

		/// <summary>
		/// Find a a pivot point between the start and end values of the array, then
		/// repeat recursively for the array values either side of the pivot.
		/// </summary>
		/// <param name="objValues"></param>
		/// <param name="leftStartIndex"></param>
		/// <param name="rightEndIndex"></param>
		/// <param name="isParallel"></param>
		private static void DoQuickSort(object[] objValues, int leftStartIndex, int rightEndIndex, bool isParallel = false)
		{
			if (leftStartIndex < rightEndIndex)
			{
				// Setting a random pivot position may give better performance in some cases
				//int pivotIndex = DoRandomPartition(objValues, leftStartIndex, rightEndIndex);     // get position of pivot
				int pivotIndex = DoPartition(objValues, leftStartIndex, rightEndIndex);     // get position of pivot

				int leftEndIndex = pivotIndex - 1;
				int rightStartIndex = pivotIndex + 1;

				if (isParallel)
				{
					// fire off a second task
					var secondTask = Task.Run(() => DoQuickSort(objValues, rightStartIndex, rightEndIndex, isParallel));  // sorts to the right of pivot

					// do first task
					DoQuickSort(objValues, leftStartIndex, leftEndIndex, isParallel);                // sorts to the left of pivot

					// wait for second task to complete
					secondTask.Wait();
				}
				else
				{
					DoQuickSort(objValues, leftStartIndex, leftEndIndex);                // sorts to the left of pivot
					DoQuickSort(objValues, rightStartIndex, rightEndIndex);                  // sorts to the right of pivot
				}
			}
		}
	}
}
