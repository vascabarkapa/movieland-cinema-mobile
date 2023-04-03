import { get } from "./api-client";

const ENDPOINT = "/repertories";

function getMoviesFromRepertory() {
    return get(ENDPOINT);
}

function getMovieByIdFromRepertory(id) {
    return get(ENDPOINT + "/" + id);
}

const RepertoryService = {
    getMoviesFromRepertory,
    getMovieByIdFromRepertory
}

export default RepertoryService;