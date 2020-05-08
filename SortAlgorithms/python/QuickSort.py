import numpy as np
import random
from Algorithm import Algorithm

# https://www.interviewcake.com/concept/python/quicksort

# Quicksort works by recursively dividing the input into two smaller
# arrays around a pivot item: one half has items smaller than the pivot,
# the other has larger items.

# Worst:   O(n^2)
# Best:    O(nlgn)
# Average: O(nlgn)
# Space:   O(lgn)

# Significantly faster than merge sort but more complicated works best
# with random data.
class QuickSort(Algorithm):
  def __init__(self) :
    super().__init__()

  def get_name(self):
    return "QuickSort"

  def do_run(self, obj_values) :

    obj_count = len(obj_values)

    QuickSort.do_quick_sort(obj_values, 0, obj_count - 1, True)

    return obj_values

  @staticmethod
  def do_partition(obj_values, left_start_index, right_end_index) :
    pivot_value = obj_values[left_start_index]        # make the first element the pivot point

    next_index = left_start_index + 1                 # get index of next element 
    current_index = next_index                        # set current index to be index of next element

    # rearrange the array by putting elements which are less than the pivot
    # on one side and those which are greater on the other. 

    # iterate over all indexes in range
    for j in range(next_index, right_end_index + 1) :
      current_value = obj_values[j]
      if current_value < pivot_value : # currentValue < pivotValue
        QuickSort.swap(obj_values, current_index, j) # swap currentValue with pivotValue (i.e. move currentValue left move pivotValue right)
        current_index += 1 # check next index

    # once we have reached the end of the search, move the pivot value to the correct index
    # between the higher and lower values
    QuickSort.swap(obj_values, left_start_index, current_index - 1)

    return current_index - 1 # return the pivot index

  # Pick a random index in the given range and swap that value with the first value in the range.
  # Then partition the array around that value.
  @staticmethod
  def do_random_partition(obj_values, start_index, end_index) :
    r = random.randint(0, end_index - start_index + 1)

    random_index = start_index + r  # get position of pivot randomly

    QuickSort.swap(obj_values, random_index, start_index)                                   # swap pivot with 1st element

    return QuickSort.do_partition(obj_values, start_index, end_index)                        # call the partition function

  # Find a a pivot point between the start and end values of the array, then
  # repeat recursively for the array values either side of the pivot.
  @staticmethod
  def do_quick_sort(obj_values, left_start_index, right_end_index, is_parallel = False) :
    if left_start_index < right_end_index :
      # Setting a random pivot position may give better performance in some cases
      #pivot_index = QuickSort.do_random_partition(obj_values, left_start_index, right_end_index)     # get position of pivot
      pivot_index = QuickSort.do_partition(obj_values, left_start_index, right_end_index)     # get position of pivot

      left_end_index = pivot_index - 1
      right_start_ndex = pivot_index + 1

      # if is_parallel :
      #   # fire off a second task
      #   var secondTask = Task.Run(() => do_quick_sort(obj_values, right_start_ndex, right_end_index, is_parallel))  # sorts to the right of pivot

      #   # do first task
      #   QuickSort.do_quick_sort(obj_values, left_start_index, left_end_index, is_parallel)                # sorts to the left of pivot

      #   # wait for second task to complete
      #   secondTask.Wait()

      # else :
      QuickSort.do_quick_sort(obj_values, left_start_index, left_end_index)                # sorts to the left of pivot
      QuickSort.do_quick_sort(obj_values, right_start_ndex, right_end_index)                  # sorts to the right of pivot
