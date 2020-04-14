using System;

namespace SortAlgorithms
{
	/// <summary>
	/// https://www.interviewcake.com/concept/python/heapsort
	///
	/// Heap sort is similar to selection sort—we're repeatedly choosing the
    /// largest item and moving it to the end of our array. But we use a heap to
    /// get the largest item more quickly (a heap being something that conceptually
    /// resembles a tree, with the largest value at the root and the decreasing values
    /// down to the leaves).
	/// 
	/// Worst:   O(nlgn)
	/// Best:    O(n)
	/// Average: O(nlgn)
	/// Space:   O(1)
	///
	/// In theory fast and space efficient, and scales well.  In practice, often
    /// slower due to hidden complexities.
	/// 
	/// </summary>
	public class HeapSort : AbstractAlgorithm<object>
	{
		public HeapSort(object[] objValues)
			: base(objValues)
		{
		}

		public override object[] DoRun()
		{
			DoHeapSort(_objValues, _objCount);

			return _objValues;
		}

        private static int GetLeftChildIndex(int parentIndex)
        {
			return parentIndex * 2 + 1;
        }

		private static int GetRightChildIndex(int parentIndex)
		{
			return parentIndex * 2 + 2;
		}

		private static void DoBubbleDown(object[] objValues, int objCount, int index)
		{
			// Restore a max heap where value at index may be out of place
			// (i.e. smaller than its children)

			while (index < objCount)
			{
				int leftIndex = GetLeftChildIndex(index);
				int rightIndex = GetRightChildIndex(index);

				// If we don't have any child nodes, we can stop
				if (leftIndex >= objCount)
					break;

                IComparable leftChild = objValues[leftIndex] as IComparable;

				IComparable rightChild = null;
				if (rightIndex < objCount)
    				rightChild = objValues[rightIndex] as IComparable;

				// find the larger of the two children
				int largerChildIndex = leftIndex;
                IComparable largerChild = leftChild;
                if (rightChild != null && leftChild.CompareTo(rightChild) < 0)
				{
					largerChildIndex = rightIndex;
					largerChild = rightChild;
				}

				IComparable parent = objValues[index] as IComparable;

				// Are we larger than our children?
				// If so, swap with the larger child
				if (parent.CompareTo(largerChild) < 0)
				{
					Swap(objValues, index, largerChildIndex);

					// Continue bubbling down
					index = largerChildIndex;
				}
                else
                {
					// we're larger than both children, so we're done
					break;
                }
			}
		}

        private static object RemoveMax(object[] objValues, int objCount)
        {
			// Remove and return the largest item from a heap
			// Updates the heap in-place, maintaining validity

			// Grab the largest value from the root
			object maxValue = objValues[0];

			int lastIndex = objCount - 1;

			// Move the last item in the heap into the root poisition
			objValues[0] = objValues[lastIndex];

			// And bubble down from the root to restore the heap
			DoBubbleDown(objValues, lastIndex, 0);

			return maxValue;
        }

        private static void Heapify(object[] objValues, int objCount)
        {
			int lastIndex = objCount - 1;

			// Bubble down from the leaf nodes up to the top
			for (int i = lastIndex; i > -1; i--)
				DoBubbleDown(objValues, objCount, i);
        }

        private static void DoHeapSort(object[] objValues, int objCount)
        {
			Heapify(objValues, objCount);

            while (objCount > 0)
            {
				// Remove the largest item and update the heap size
				object largestValue = RemoveMax(objValues, objCount);
				objCount--;

				// Store the removed value at the end of the list, after
				// the entries used by the heap
				objValues[objCount] = largestValue;
			}
		}
	}
}
