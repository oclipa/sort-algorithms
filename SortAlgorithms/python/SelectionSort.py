import numpy as np
from Algorithm import Algorithm

# https://www.interviewcake.com/concept/python/selection-sort

# Selection sort works by repeatedly "selecting" the next-smallest element
# from the unsorted array and moving it to the front.

# Worst:   O(n^2)
# Best:    O(n^2)
# Average: O(n^2)
# Space:   O(1)

# Slow but useful when swapping is expensive.
class SelectionSort(Algorithm):
  def __init__(self) :
    super().__init__()

  def get_name(self):
    return "SelectionSort"

  def do_run(self, obj_values) :
    obj_count = len(obj_values)

    min = 0 # effectively reduces size of array by one in each iteration

    max_index = obj_count - 1

    for i in range(max_index) :
      min = i # assuming order is increasing
      i_next = i + 1

      for j in range(i_next, obj_count) : # ignore obj_values[i]
        v = obj_values[j]
        v_prev = obj_values[min]

        if v < v_prev : # v < v_prev
          min = j

      SelectionSort.swap(obj_values, min, i)

    return obj_values