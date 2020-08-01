import axios from "axios"

export class PostService {
    constructor() {

    }


    getPosts() {
        const url = `https://www.reddit.com/.json`;
        return axios.get(url)

    }   
}