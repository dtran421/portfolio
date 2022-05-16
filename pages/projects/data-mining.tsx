import dataMiningData from "../../public/json/data-mining.json";
import projects from "../../public/json/projects.json";

import RepoPage from "../../components/Projects/RepoPage";

const DataMining = () => {
    const name = "Data Mining";
    const {
        accentColors: { border }
    } = projects[name];

    return (
        <RepoPage
            bannerHeading={name}
            heading="[CSCI 420] Data Mining"
            dateString="Spring 2022"
            description="This class serves as an introduction to the fundamental concepts and
                    techniques of mining big data. Topics include basic data mining concepts, graph mining, 
                    traditional clustering and classification models as well as the latest deep learning techniques. 
                    The past few years have witnessed a boom of a big data in different areas, including commercial 
                    platforms, healthcare, social networks, business, finance, and more. Extracting useful and valuable 
                    information from big data can help improve quality of life and make our world a better place."
            data={dataMiningData.data}
            borderAccent={border}
        />
    );
};

export default DataMining;
