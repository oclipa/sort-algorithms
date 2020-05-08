import numpy as np
from Algorithm import Algorithm

# https://www.interviewcake.com/concept/python/counting-sort

# Counting sort works by iterating through the input, counting the number
# of times each item occurs, and using those counts to compute each item's
# index in the final, sorted array.

# Worst:   O(n)
# Best:    O(n)
# Average: O(n)
# Space:   O(n)

# Fast when the range and nature of potential items is known ahead of time,
# but requires a lot of space (in practice, rarely used).
class CountingSort(Algorithm):
  def __init__(self, min_value, max_value) :
    super().__init__()

    self.min_value = min_value
    self.max_value = max_value

  def get_name(self):
    return "CountingSort"

  def do_run(self, obj_values) :
    sorted_objs = obj_values

    if obj_values.dtype.kind in np.typecodes['AllFloat'] + np.typecodes['AllInteger'] :
      value_count = abs(self.max_value - self.min_value) + 1
      sorted_objs = CountingSort.do_counting_sort(obj_values, self.min_value, value_count)
    else :
      print('CountingSort does not currently supported arrays of strings')
   
    return sorted_objs

  @staticmethod
  def do_counting_sort(obj_values, min_value, value_count) :
    obj_count = len(obj_values)

    sorted_objs = np.empty(shape=(obj_count))

    # keeps a running count of how many times each obj appears
    count_tracker = np.zeros(shape=(value_count))

    # store the count of each value in items in tracker
    for i in range(obj_count) :
      count_tracker_index = CountingSort.get_obj_index(obj_values[i], min_value)
      count_tracker[count_tracker_index] += 1; # add 1 to value in buffer at index items[j]

    # iteratively sum all counts in buffer, to get total number of 
    # elements that are at indexes less than i
    num_items_before = 0
    for i in range(value_count) :
      count = count_tracker[i]
      count_tracker[i] = num_items_before
      num_items_before += count
      
    for i in range(obj_count) :
      obj_value = obj_values[i]

      count_tracker_index = CountingSort.get_obj_index(obj_value, min_value)

      index = int(count_tracker[count_tracker_index])
      sorted_objs[index] = obj_value

      count_tracker[count_tracker_index] += 1
        
    return sorted_objs


  @staticmethod
  def get_obj_index(index, min_value) :
    return int(index - min_value)
