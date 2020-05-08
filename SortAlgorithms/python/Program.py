import numpy as np
import random
from BubbleSort import BubbleSort
from CountingSort import CountingSort
from SelectionSort import SelectionSort
from InsertionSort import InsertionSort
from MergeSort import MergeSort
from QuickSort import QuickSort
from HeapSort import HeapSort
from RadixSort import RadixSort

class Program():
  @staticmethod
  def run():

    # orig_obj_values = [ "apple", "orange", "banana", "apple", "coconut", "olive", "egg", "banana", "ham", "milk", "coconut", "cheese" ]

    value_count = 10000

    orig_obj_values = np.empty(shape=(value_count))

    min = value_count + 1
    max = -1
    for i in range(value_count):
      # in c#, random.next(incl, excl), but in python, randint(incl, incl)
      v = random.randint(0, value_count - 1)

      if v < min : min = v
      if v > max : max = v

      orig_obj_values[i] = int(v)

    obj_values = np.empty_like(orig_obj_values)
    obj_values[:] = orig_obj_values
    
    algorithms = np.array([
      BubbleSort(),
      CountingSort(min, max),
      SelectionSort(),
      InsertionSort(),
      MergeSort(),
      QuickSort(),
      HeapSort(),
      RadixSort()
    ])

    print("STARTED --------------------------------------------")

    for algorithm in algorithms:

      # reset input values
      obj_values[:] = orig_obj_values

      algorithm.run(obj_values)

    print(" ")
    print("STOPPED --------------------------------------------")

Program.run()