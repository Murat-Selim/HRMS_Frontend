import axios from "axios";

export default class JobAdvertService{

    getJobAdverts(){
        return axios.get("http://localhost:8080/api/jobAdverts/getall")
    }

    createJobAdvert(jobAdvert){
        return axios.post("http://localhost:8080/api/jobAdverts/add", jobAdvert)
    }
    
}