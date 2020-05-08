using System;

namespace SortAlgorithms
{
	/// <summary>
	/// https://www.interviewcake.com/concept/python/heapsort
	///
	/// Radix sort works by sorting the input numbers one digit at a time.
	/// 
	/// Worst:   O(n)
	/// Best:    O(n)
	/// Average: O(n)
	/// Space:   O(n)
	///
	/// Fast but only works for numbers with fixed number of digits
	/// 
	/// </summary>
	public class RadixSort : AbstractAlgorithm<long>
	{
		public RadixSort(long[] objValues)
			: base(objValues)
		{
		}

		public override long[] DoRun()
		{
			_objValues = DoRadixSort(_objValues, _objCount);

			return _objValues;
		}

		private static int GetBitValue(long number, int bitIndex)
		{
			// Returns the value of the bit at index 'bitIndex' in 'number'

			// A bitwise AND compares each number, bit-by-bit, using an AND join
			// to produce a number that is the combination of bits where both the
			// first bit and second bit in that place were set.

			// left-shifts 1 by amount bitIndex
			// e.g. for an 8 bit number, 1 << 4 == 00010000
			long bitMask = 1 << bitIndex;

			// AND compare the bitMask with the number
			//     integer = 46               = 23
			//      binary = 00101110         = 00010111
			//     bitMask = 00010000         = 00010000
			//      result = 00000000 == 0    = 00010000 == 16
			return ((number & bitMask) != 0) ? 1 : 0;
		}

		private static long[] DoCountSort(long[] objValues, int objCount, int bit)
		{
			// Arrange the items in the objValues based on the value of
			// a specific bit.  This doesn't fully sort the list (it
			// just sorts by a specific bit), but we'll use it for radix
			// sort

			// counts[0] stores the number of items with a 0 in this bit
			// counts[1] stores the number of items with a 1 in this bit
			int[] counts = new int[2] { 0, 0 };
			for (int i = 0; i < objCount; i++)
			{
				int bitValue = GetBitValue(objValues[i], bit); // 0 or 1
				counts[bitValue]++; // keeps a running count of how many 1's and 0's
			}

			// indices[0] stores the index where we should put the next item
			// with a 0 in this bit
			// indices[1] stores the index where we should put the next item
			// with a 1 in this bit
			//
			// The items with a 0 in this bit come at the beginning (index 0).
			// The items with a 1 in this bit come after all the items with a 0.
			int[] indices = new int[2] { 0, counts[0] };

			// Output list to be filled in
			long[] sortedValues = new long[objCount];

			for (int i = 0; i < objCount; i++)
			{
				long item = objValues[i];

				int bitValue = GetBitValue(item, bit); // 0 or 1

				// Place the item at the next open index for its bit value
				int index = indices[bitValue];
				sortedValues[index] = item;

				// The next item with the same bit value goes after this item
				indices[bitValue]++;
			}

			return sortedValues;
		}

		private static long[] DoRadixSort(long[] objValues, int objCount)
		{
			// Use counting sort to arrange the numbers, from least significant
			// bit to most significant bit

			for (int bitIndex = 0; bitIndex < 64; bitIndex++)
				objValues = DoCountSort(objValues, objCount, bitIndex);

			return objValues;
		}
	}
}
