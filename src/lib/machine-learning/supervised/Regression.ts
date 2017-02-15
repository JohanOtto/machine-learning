import Matrix from "../../math/linear-algebra/Matrix";

abstract class Regression {

    private hypothesis: Matrix;

    private learningRate = 0.001;
    private maximumIterations = 1000;
    private regularizationFactor = 0;
    private errorStop = 0;

    public constructor (private inputs: Matrix, private outputs: Matrix) {
        this.inputs = this.enrichedWithBiases(inputs);
        this.resetHypothesis();
    }

    public train () {
        const exampleCount = this.inputs.getRowCount();

        let totalError = Number.POSITIVE_INFINITY;

        let i = 0;
        while (totalError > this.errorStop && i++ < this.maximumIterations) {
            const predictions = this.predictFromEnrichedInputs(this.inputs);

            const errors = predictions.subtract(this.outputs);
            totalError = Matrix.transform(errors, error => Math.abs(error)).getSum();

            const errorsRowVector = Matrix.transpose(errors);
            const gradient = Matrix.multiply(errorsRowVector, this.inputs).transpose();

            const newHypothesis = Matrix.subtract(this.hypothesis, gradient.multiply(this.learningRate / exampleCount));

            if (this.regularizationFactor > 0) {
                const regularizationVector = this.hypothesis.multiply(this.learningRate * this.regularizationFactor / exampleCount).setElement(0, 0, 0);
                newHypothesis.subtract(regularizationVector);
            }

            this.hypothesis = newHypothesis;
        }
    }

    public predict (inputs: Matrix) {
        return this.predictFromEnrichedInputs(this.enrichedWithBiases(inputs));
    }


    /* Parameter setters */

    public setLearningRate (learningRate: number) {
        this.learningRate = learningRate;
        return this;
    }

    public setMaximumIterations (maximumIterations: number) {
        this.maximumIterations = maximumIterations;
        return this;
    }

    public setRegularizationFactor (regularizationFactor: number) {
        this.regularizationFactor = regularizationFactor;
        return this;
    }

    public setHypothesis (hypothesis: Matrix) {
        this.hypothesis = hypothesis;
    }

    public resetHypothesis () {
        this.hypothesis = Matrix.zeros(this.inputs.getColumnCount(), 1);
    }

    /* Parameter getters */

    public getLearningRate () {
        return this.learningRate;
    }

    public getMaximumIterations () {
        return this.maximumIterations;
    }

    public getRegularizationFactor () {
        return this.regularizationFactor;
    }

    public getHypothesis () {
        return this.hypothesis;
    }

    /* Protected methods */

    protected abstract predictFromEnrichedInputs (inputs: Matrix): Matrix;

    /* Private methods */

    private enrichedWithBiases (inputs: Matrix) {
        return Matrix.appendLeft(inputs, Matrix.ones(inputs.getRowCount(), 1));
    }
}

export default Regression;