import numpy as np
from Algorithm import Algorithm

# https://www.hackerearth.com/practice/notes/sorting-code-monk/

# Bubble sort works by comparing each item in the list with the item next
# to it and swapping them if required.

# Worst:   O(n^2)
# Best:    O(n)
# Average: O(n^2)
# Space:   O(1)

# Not really used outside teaching.
class BubbleSort(Algorithm):
  def __init__(self) :
    super().__init__()

  def get_name(self):
    return "BubbleSort"

  def do_run(self, obj_values) :
    obj_count = len(obj_values)
    max_index = obj_count - 1

    for i in range(max_index) :
      max_index_excluding_compared = max_index - i

      for j in range(max_index_excluding_compared) : # ignore already compared elements
        v = obj_values[j]
        next_v = obj_values[j + 1]

        if (v > next_v) :
          obj_values[j] = next_v
          obj_values[j + 1] = v

    return obj_values
