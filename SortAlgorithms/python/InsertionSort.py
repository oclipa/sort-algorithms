import numpy as np
from Algorithm import Algorithm

# https://www.interviewcake.com/concept/python/insertion-sort

# Insertion sort works by inserting elements from an unsorted array into
# a sorted subsection of the array, one item at a time.

# Worst:   O(n^2)
# Best:    O(n)
# Average: O(n^2)
# Space:   O(1)

# Good for data which is nearly sorted (slow otherwise).
class InsertionSort(Algorithm):
  def __init__(self) :
    super().__init__()

  def get_name(self):
    return "InsertionSort"

  def do_run(self, obj_values) :
    obj_count = len(obj_values)

    # i = index of unsorted values
    # j = index of sorted values
    for i in range (1, obj_count) :
      v_unsorted = obj_values[i] # current unsorted element value

      j = i
      v_sorted = obj_values[j - 1] # preceeding sorted element value

      # iterate backwards ("to the left") over the previously sorted values
      while j > 0 and v_sorted >= v_unsorted : # v_sorted >= v_unsorted 
        # if current unsorted element value is less than neighbouring sorted element value,
        # need to move the sorted value to the right and the unsorted value to the left
        # (effectively swapping the values)

        obj_values[j] = v_sorted # move sorted element to index previously holding unsorted element

        j -= 1 # move the index of the unsorted element to the left

        if j > 0 :
          v_sorted = obj_values[j - 1] # get sorted element value at new location

        # once v_unsorted < v_sorted, we drop out of the loop

      # set v_unsorted at its new sorted position
      obj_values[j] = v_unsorted

    return obj_values
