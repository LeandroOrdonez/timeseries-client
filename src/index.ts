
import Observation from "./DataTypes/Observation";
import DataFetcher from "./Fetcher/DataFetcher";
import Utils from "./Polygon/Utils";

export { default as DataFetcher} from "./Fetcher/DataFetcher";
export { default as Observation} from "./DataTypes/Observation";
export { default as Utils} from "./Polygon/Utils";

if (!process.env.BASEURL) { process.env.BASEURL = "http://10.10.137.122:30070/data/14"; }

export default {
    DataFetcher,
    Observation,
    Utils,
};
