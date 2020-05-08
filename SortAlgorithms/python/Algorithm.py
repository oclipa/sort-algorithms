import numpy as np
import time

class Algorithm:

    def get_name(self):
      pass

    def run(self, obj_values):
      
      obj_count = len(obj_values)

      unsorted_values = np.empty_like(obj_values)
      unsorted_values[:] = obj_values

      # print(" ")
      # print("----------------------------------------------------")

      start = time.time()
      sorted_values = self.do_run(obj_values)
      end = time.time()

      print("{} : {}".format(self.get_name(), end - start))
      # Algorithm.print_array(unsorted_values)
      # Algorithm.print_array(sorted_values)

    def do_run(self, obj_values):
      pass

    @staticmethod
    def print_array(array):
      np.set_printoptions(threshold=50, edgeitems=10, formatter={'int_kind':lambda x: str(x)}, linewidth=75, precision=0, suppress=True)
      print("---")
      print(array)

    @staticmethod
    def swap(obj_values, index1, index2):
        obj1 = obj_values[index1]
        obj_values[index1] = obj_values[index2]
        obj_values[index2] = obj1
