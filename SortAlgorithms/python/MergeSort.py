import numpy as np
from Algorithm import Algorithm

# https://www.interviewcake.com/concept/python/merge-sort

# Merge sort works by splitting the input in half, recursively sorting
# each half, and then merging the sorted halves back together.

# Worst:   O(nlgn)
# Best:    O(nlgn)
# Average: O(nlgn)
# Space:   O(n)

# Scales to very large lists, but can involve lots of copying.
class MergeSort(Algorithm):
  def __init__(self) :
    super().__init__()

  def get_name(self):
    return "MergeSort"

  def do_run(self, obj_values) :
    obj_count = len(obj_values)

    MergeSort.do_merge_sort(obj_values, 0, obj_count - 1)

    return obj_values

  @staticmethod
  def do_merge_sort(obj_values, start_index, end_index) :
    if start_index < end_index :
      mid = int((start_index + end_index) / 2)           # defined mid point

      MergeSort.do_merge_sort(obj_values, start_index, mid)        # recursively called DoMergeSort() on left hand of array

      MergeSort.do_merge_sort(obj_values, mid + 1, end_index)      # recursively called DoMergeSort() on right hand of array

      MergeSort.do_merge(obj_values, start_index, mid, end_index)  # merge the two halves of the array

  @staticmethod
  def do_merge(obj_values, start_index, mid_index, end_index) :
    left_index = start_index                                                # current start index of left half of array
    right_index = mid_index + 1                                             # current start index of right half of array

    merge_buffer = np.empty(shape=(end_index - start_index + 1), dtype=obj_values.dtype)            # array into which values are merged
    merge_index = 0

    for i in range(start_index, end_index + 1) :

      if left_index > mid_index :                                           # end of left half of array
        merge_buffer[merge_index] = obj_values[right_index]                 # copy right hand array value into buffer
        right_index += 1
      elif right_index > end_index :                                        # end of right half of array
        merge_buffer[merge_index] = obj_values[left_index]                  # copy left hand array value into buffer
        left_index += 1
      elif obj_values[left_index] < obj_values[right_index] :               # current left hand value is less than current right hand value
        merge_buffer[merge_index] = obj_values[left_index]                  # copy left hand array value into buffer
        left_index += 1
      else :                                                                # current right hand value is less than current left hand value
        merge_buffer[merge_index] = obj_values[right_index]                 # copy right hand array value into buffer
        right_index += 1

      merge_index += 1

    for i in range(merge_index) :                                           # copy buffer values into original array
      obj_values[start_index] = merge_buffer[i]
      start_index += 1
