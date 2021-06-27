import axios from "axios";

export default class JobAdvertService{

    getJobAdverts(){
        return axios.get("http://localhost:8080/api/jobAdverts/getall")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/jobAdverts/getbyid?id="+id)
    }

    addJobAdvert(values){
        return axios.post("http://localhost:8080/api/jobAdverts/add", values)
    }
    
}