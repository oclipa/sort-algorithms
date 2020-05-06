// function Algorithm() {

//   // if user accidentally omits the new keyword, this will 
//   // silently correct the problem...
//   if ( !(this instanceof Algorithm) )
//      return new Algorithm();

//  Algorithm.prototype.run = run;

//  function run() {
//    // console.log(name);

//    var t0 = Date.now()
//    const sortedValues = Algorithm.prototype.doSort();
//    var t1 = Date.now()

//    console.log(sortedValues);

//    console.log("Sort took " + (t1 - t0) + " milliseconds.")  
//  }  

//  //let doSort = () => {};

//  //let algName = '';
// }

var Algorithm = function (algorithm) {

  // if user accidentally omits the new keyword, this will 
  // silently correct the problem...
  if ( !(this instanceof Algorithm) )
     return new Algorithm();

  this.algorithm = algorithm;
};

Algorithm.prototype = function () {

  //private members
  const run = function (objValues) {

    console.log(this.algorithm.algName);
    console.log(sortedValues);

    var t0 = Date.now()
    const sortedValues = this.algorithm.doSort(objValues);
    var t1 = Date.now()

    console.log(sortedValues);

    console.log("Sort took " + (t1 - t0) + " milliseconds.")   
  };

  //public members
  return {
      run: run
  };
} ();

export default Algorithm;