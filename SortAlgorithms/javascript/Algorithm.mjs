const Algorithm = function () {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof Algorithm) )
     return new Algorithm();
};

Algorithm.prototype = function () {

  //private members
  const run = function (algorithm, objValues) {

    console.log(algorithm.algName);
    console.log(objValues.slice(0, 100));

    const t0 = Date.now();
    const sortedObjs = algorithm.doSort(objValues);
    const t1 = Date.now();

    console.log(sortedObjs.slice(0, 100));

    console.log("Sort took " + (t1 - t0) + " milliseconds.")   
  };

  const swap = function (objValues, index1, index2) {
      const obj1 = objValues[index1];
      objValues[index1] = objValues[index2];
      objValues[index2] = obj1;
  }

  //public members
  return {
      run: run,
      swap: swap
  };
} ();

export default Algorithm;