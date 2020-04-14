using System;

namespace SortAlgorithms
{
	/// <summary>
	/// https://www.interviewcake.com/concept/python/counting-sort
	///
	/// Counting sort works by iterating through the input, counting the number
	/// of times each item occurs, and using those counts to compute each item's
	/// index in the final, sorted array.
	/// 
	/// Worst:   O(n)
	/// Best:    O(n)
	/// Average: O(n)
	/// Space:   O(n)
	///
	/// Fast when the range and nature of potential items is known ahead of time,
    /// but requires a lot of space (in practice, rarely used).
	/// 
	/// </summary>
	public class CountSort : AbstractAlgorithm<object>
    {
		private object[] _objs;
        private long _valueCount;
		private long _minValue;
		private long _maxValue;
		private bool _hasObjects;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="objValues">These should be ints or longs</param>
        /// <param name="minValue"></param>
        /// <param name="maxValue"></param>
        /// <param name="objs"></param>
		public CountSort(object[] objValues, long minValue, long maxValue, object[] objs = null)
            : base(objValues)
        {
			_objs = objs;
			_minValue = minValue;
			_maxValue = maxValue;

			_valueCount = Math.Abs(_maxValue - _minValue) + 1;

			_hasObjects = _objs != null && _objs.Length > 0;
		}

		public override object[] DoRun()
		{
            if (_hasObjects)
    			PrintArray(_objs);

			object[] sortedObjs = new object[_objCount];
			//long[] sortedValues = new long[_objCount];

			int[] buffer = new int[_valueCount];

			for (int i = 0; i < _valueCount; i++)
				buffer[i] = 0;

			// store the count of each value in items in buffer
			for (int j = 0; j < _objCount; j++)
			{
				int bufferIndex = ShiftIndex(Convert.ToInt64(_objValues[j]), _minValue);
				buffer[bufferIndex]++; // add 1 to value in buffer at index items[j]
			}

			// iteratively sum all counts in buffer, to get total number of 
			// elements that are at indexes less than i
			int num_items_before = 0;
			for (int i = 0; i < _valueCount; i++)
			{
				int count = buffer[i];
				buffer[i] = num_items_before;
				num_items_before += count;
			}

			for (int j = 0; j < _objCount; j++)
			{
				long objValue = Convert.ToInt64(_objValues[j]);
				long bufferIndex = ShiftIndex(objValue, _minValue);

				if (_hasObjects)
				{
					object obj = _objs[j];
					sortedObjs[buffer[bufferIndex]] = obj;
				}
                else
                {
					sortedObjs[buffer[bufferIndex]] = objValue;
				}

				buffer[bufferIndex]++;
			}

			return sortedObjs;
		}

        private static int ShiftIndex(long index, long minValue)
        {
			return (int)(index - minValue); // .NET does not (by default) allow arrays bigger than 2GB, so need to return int
		}
	}
}
