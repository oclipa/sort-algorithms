using System;

namespace SortAlgorithms
{
	/// <summary>
	/// https://www.hackerearth.com/practice/notes/sorting-code-monk/
	///
	/// Bubble sort works by comparing each item in the list with the item next
    /// to it and swapping them if required.
	/// 
	/// Worst:   O(n^2)
	/// Best:    O(n)
	/// Average: O(n^2)
	/// Space:   O(1)
	///
	/// Not really used outside teaching.
	///    /// </summary>
	public class BubbleSort : AbstractAlgorithm<object>
	{
		public BubbleSort(object[] objValues)
			: base(objValues)
		{
		}

		public override object[] DoRun()
		{
			int maxIndex = _objCount - 1;

			for (int i = 0; i < maxIndex; i++)
			{
				int maxIndexExcludingCompared = maxIndex - i;

				for (int j = 0; j < maxIndexExcludingCompared; j++) // ignore already compared elements
				{
					IComparable v = _objValues[j] as IComparable;
					IComparable nextV = _objValues[j + 1] as IComparable;

					if (v.CompareTo(nextV) > 0) // v > nextV
					{
						_objValues[j] = nextV;
						_objValues[j + 1] = v;
					}
				}
			}

			return _objValues;
		}
	}
}
