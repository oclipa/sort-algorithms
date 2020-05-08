using System;

namespace SortAlgorithms
{
	/// <summary>
	/// https://www.interviewcake.com/concept/python/merge-sort
	///
	/// Merge sort works by splitting the input in half, recursively sorting
	/// each half, and then merging the sorted halves back together.
	/// 
	/// Worst:   O(nlgn)
	/// Best:    O(nlgn)
	/// Average: O(nlgn)
	/// Space:   O(n)
	///
	/// Scales to very large lists, but can involve lots of copying.
	/// 
	/// </summary>
	public class MergeSort : AbstractAlgorithm<object>
	{
		private int _startIndex;
		private int _endIndex;

		public MergeSort(object[] objValues)
			: base(objValues)
		{
			_startIndex = 0;
			_endIndex = objValues.Length - 1;
		}

		public override object[] DoRun()
		{
			DoMergeSort(_objValues, _startIndex, _endIndex);

			return _objValues;
		}

		private static void DoMergeSort(object[] objValues, int startIndex, int endIndex)
		{
			if (startIndex < endIndex)
			{
				int mid = (startIndex + endIndex) / 2;          // defined mid point

				DoMergeSort(objValues, startIndex, mid);        // recursively called DoMergeSort() on left hand of array

				DoMergeSort(objValues, mid + 1, endIndex);      // recursively called DoMergeSort() on right hand of array

				DoMerge(objValues, startIndex, mid, endIndex);  // merge the two halves of the array
			}
		}

		private static void DoMerge(object[] objValues, int startIndex, int midIndex, int endIndex)
		{
			int leftIndex = startIndex;                                                 // current start index of left half of array
			int rightIndex = midIndex + 1;                                              // current start index of right half of array

			object[] mergeBuffer = new object[endIndex - startIndex + 1];               // array into which values are merged
			int mergeIndex = 0;

			for (int i = startIndex; i <= endIndex; i++)
			{
				if (leftIndex > midIndex)                                               // end of left half of array
					mergeBuffer[mergeIndex++] = objValues[rightIndex++];                // copy right hand array value into buffer

				else if (rightIndex > endIndex)                                         // end of right half of array
					mergeBuffer[mergeIndex++] = objValues[leftIndex++];                 // copy left hand array value into buffer

				else if ((objValues[leftIndex] as IComparable).
							CompareTo(objValues[rightIndex] as IComparable) < 0)        // current left hand value is less than current right hand value
					mergeBuffer[mergeIndex++] = objValues[leftIndex++];                 // copy left hand array value into buffer

				else                                                                    // current right hand value is less than current left hand value
					mergeBuffer[mergeIndex++] = objValues[rightIndex++];                // copy right hand array value into buffer
			}

			for (int i = 0; i < mergeIndex; i++)                                        // copy buffer values into original array
			{
				objValues[startIndex++] = mergeBuffer[i];
			}
		}
	}
}
