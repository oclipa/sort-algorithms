import numpy as np
from Algorithm import Algorithm

# https://www.interviewcake.com/concept/python/heapsort

# Radix sort works by sorting the input numbers one digit at a time.

# Worst:   O(n)
# Best:    O(n)
# Average: O(n)
# Space:   O(n)

# Fast but only works for numbers with fixed number of digits
class RadixSort(Algorithm):
  def __init__(self) :
    super().__init__()

  def get_name(self):
    return "RadixSort"

  def do_run(self, obj_values) :
    obj_count = len(obj_values)
    max_index = obj_count - 1

    if obj_values.dtype.kind in np.typecodes['AllFloat'] + np.typecodes['AllInteger'] :
      obj_values = RadixSort.do_radix_sort(obj_values, obj_count)
    else :
      print('RadixSort does not currently supported arrays of strings')

    return obj_values

  @staticmethod
  def do_radix_sort(obj_values, obj_count) :
    # Use counting sort to arrange the numbers, from least significant
    # bit to most significant bit

    for bit_index in range (64) :
      obj_values = RadixSort.do_counting_sort(obj_values, obj_count, bit_index)

    return obj_values
  
  @staticmethod
  def do_counting_sort(obj_values, obj_count, bit) :

    # Output list to be filled in
    sorted_objs = np.empty(shape=(obj_count))

    # Arrange the items in the objValues based on the value of
    # a specific bit.  This doesn't fully sort the list (it
    # just sorts by a specific bit), but we'll use it for radix
    # sort

    # counts[0] stores the number of items with a 0 in this bit
    # counts[1] stores the number of items with a 1 in this bit
    count_tracker = [0, 0]

    # store the count of each value in items in tracker
    for i in range(obj_count) :
      count_tracker_index = RadixSort.get_bit_value(obj_values[i], bit) # 0 or 1
      count_tracker[count_tracker_index] += 1 # keeps a running count of how many 1's and 0's

    # indices[0] stores the index where we should put the next item
    # with a 0 in this bit
    # indices[1] stores the index where we should put the next item
    # with a 1 in this bit
    #
    # The items with a 0 in this bit come at the beginning (index 0).
    # The items with a 1 in this bit come after all the items with a 0.
    indices = [0, count_tracker[0]]

    for i in range(obj_count) :
      obj_value = obj_values[i]

      count_tracker_index = RadixSort.get_bit_value(obj_value, bit) # 0 or 1

      # Place the item at the next open index for its bit value
      index = indices[count_tracker_index]
      sorted_objs[index] = obj_value

      # The next item with the same bit value goes after this item
      indices[count_tracker_index] += 1

    return sorted_objs

  @staticmethod
  def get_bit_value(number, bit_index) :
    # Returns the value of the bit at index 'bitIndex' in 'number'

    # A bitwise AND compares each number, bit-by-bit, using an AND join
    # to produce a number that is the combination of bits where both the
    # first bit and second bit in that place were set.

    # left-shifts 1 by amount bitIndex
    # e.g. for an 8 bit number, 1 << 4 == 00010000
    bit_mask = 1 << bit_index

    # AND compare the bitMask with the number
    #     integer = 46               = 23
    #      binary = 00101110         = 00010111
    #     bitMask = 00010000         = 00010000
    #      result = 00000000 == 0    = 00010000 == 16
    return 1 if (int(number) & bit_mask) != 0 else 0