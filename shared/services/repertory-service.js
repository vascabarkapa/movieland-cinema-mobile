import { get } from "./api-client";

const ENDPOINT = "/repertories";

function getMoviesFromRepertory() {
    return get(ENDPOINT + "/mobile/get");
}

const RepertoryService = {
    getMoviesFromRepertory
}

export default RepertoryService;