import machineLearningData from "../../public/json/machine-learning.json";
import projects from "../../public/json/projects.json";

import RepoPage from "../../components/Projects/RepoPage";

const MachineLearning = () => {
    const name = "Machine Learning";
    const {
        accentColors: { border }
    } = projects[name];

    return (
        <RepoPage
            bannerHeading={name}
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
            borderAccent={border}
        />
    );
};

export default MachineLearning;
