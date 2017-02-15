# machine-learning

## Requirements
This library has a dependency on the **nblas** package for fast matrix operations.
It should work by default on OSX, but on Linux you may need to run ``apt-get install libblas-dev`` first.
On Windows you may need to install [LAPACK](http://www.netlib.org/lapack/#_lapack_version_3_7_0_2).

## LinearRegression


### Example usage
```TypeScript
import { Matrix, LinearRegression } from '../lib/index';

const inputs = new Matrix([[5], [7], [9], [11], [13]]);
const outputs = new Matrix([[2000], [2400], [2800], [3200], [3600]]);

const linearRegression = new LinearRegression(inputs, outputs);
linearRegression.setMaximumIterations(10000);
linearRegression.setLearningRate(0.02);

const predictionsBeforeTraining = linearRegression.predict(inputs);
console.log(predictionsBeforeTraining.toArray());
// [ [ 0 ], [ 0 ], [ 0 ], [ 0 ], [ 0 ] ]

linearRegression.train();
const predictionsAfterTraining = linearRegression.predict(inputs);
console.log(predictionsAfterTraining.toArray());
// [ [ 1999.999991189672 ], [ 2399.9999948012005 ], [ 2799.999998412729 ], [ 3200.0000020242574 ], [ 3600.000005635786 ] ]

```