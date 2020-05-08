import numpy as np
from Algorithm import Algorithm

# https://www.interviewcake.com/concept/python/heapsort

# Heap sort is similar to selection sort—we're repeatedly choosing the
# largest item and moving it to the end of our array. But we use a heap to
# get the largest item more quickly (a heap being something that conceptually
# resembles a tree, with the largest value at the root and the decreasing values
# down to the leaves).

# Worst:   O(nlgn)
# Best:    O(n)
# Average: O(nlgn)
# Space:   O(1)

# In theory fast and space efficient, and scales well.  In practice, often
# slower due to hidden complexities.
class HeapSort(Algorithm):
  def __init__(self) :
    super().__init__()

  def get_name(self):
    return "HeapSort"

  def do_run(self, obj_values) :

    HeapSort.do_heap_sort(obj_values, len(obj_values))

    return obj_values

  @staticmethod
  def get_left_child_index(parentIndex) :
    return parentIndex * 2 + 1

  @staticmethod
  def get_right_child_index(parentIndex) :
    return parentIndex * 2 + 2

  @staticmethod
  def do_bubble_down(objValues, objCount, index) :
    # Restore a max heap where value at index may be out of place
    # (i.e. smaller than its children)

    while index < objCount :
      leftIndex = HeapSort.get_left_child_index(index)
      rightIndex = HeapSort.get_right_child_index(index)

      # If we don't have any child nodes, we can stop
      if leftIndex >= objCount :
        break

      leftChild = objValues[leftIndex]

      rightChild = None
      if rightIndex < objCount :
        rightChild = objValues[rightIndex]

      # find the larger of the two children
      largerChildIndex = leftIndex
      largerChild = leftChild
      if rightChild is not None and leftChild < rightChild :
        largerChildIndex = rightIndex
        largerChild = rightChild

      parent = objValues[index]

      # Are we larger than our children?
      # If so, swap with the larger child
      if parent < largerChild :
        HeapSort.swap(objValues, index, largerChildIndex)

        # Continue bubbling down
        index = largerChildIndex
      else :
        # we're larger than both children, so we're done
        break

  @staticmethod
  def remove_max(objValues, objCount) :
    # Remove and return the largest item from a heap
    # Updates the heap in-place, maintaining validity

    # Grab the largest value from the root
    maxValue = objValues[0]

    lastIndex = objCount - 1

    # Move the last item in the heap into the root poisition
    objValues[0] = objValues[lastIndex]

    # And bubble down from the root to restore the heap
    HeapSort.do_bubble_down(objValues, lastIndex, 0)

    return maxValue

  @staticmethod
  def heapify(objValues, objCount) :
    lastIndex = objCount - 1

    # Bubble down from the leaf nodes up to the top
    for i in range(lastIndex, -1, -1) : 
      HeapSort.do_bubble_down(objValues, objCount, i)

  @staticmethod
  def do_heap_sort(objValues, objCount) :

    HeapSort.heapify(objValues, objCount)

    while objCount > 0 :
      # Remove the largest item and update the heap size
      largestValue = HeapSort.remove_max(objValues, objCount)
      objCount -= 1

      # Store the removed value at the end of the list, after
      # the entries used by the heap
      objValues[objCount] = largestValue

