import machineLearningData from "../../public/json/machine-learning.json";

import RepoPage from "../../components/Projects/RepoPage";

const MachineLearning = () => (
    <RepoPage
        bannerHeading="Machine Learning"
        heading="[CSCI 416] Intro to Machine Learning"
        dateString="Fall 2021"
        description="This class serves as an introduction to the theory and
                    practice of machine learning, focusing primarily on methods
                    for classification and prediction. Topics include decision
                    trees, artificial neural networks, support vector machines,
                    kernel methods, ensemble methods, clustering methods,
                    dimension reduction, performance evaluation, data
                    preprocessing, and hyperparameter tuning."
        data={machineLearningData.data}
        accentColors={{ background: "bg-ml", border: "hover:border-ml" }}
    />
);

export default MachineLearning;
