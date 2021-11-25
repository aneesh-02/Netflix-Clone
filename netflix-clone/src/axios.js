import axios from "axios";

// base url to make requests to the movie database.

const instance = axios.create({
    baseURL: "https://api.themoivedb.org/3"
});

// so whenever we call a page of our website it gets append to this url
// eg : calling home will give: https://api.themoivedb.org/3/home

export default instance;