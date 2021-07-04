import axios from "axios";

export default class JobAdvertService{

    getJobAdverts(){
        return axios.get("http://localhost:8080/api/jobAdverts/getall")
    }

    getByIsActive(){
        return axios.get("http://localhost:8080/api/jobAdverts/getAllByIsActive")
    }

    getByNotActive(){
        return axios.get("http://localhost:8080/api/jobAdverts/getAllByNotActive")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/jobAdverts/getbyid?id=" + id)
    }

    addJobAdvert(values){
        return axios.post("http://localhost:8080/api/jobAdverts/add", values)
    }

    updateChangeActive(id){
        return axios.put("http://localhost:8080/api/jobAdverts/updateChangeActive?userId=" + id)
    }

    updateChangeFalse(id){
        return axios.put("http://localhost:8080/api/jobAdverts/updateChangeFalse?userId=" + id)
    }
    
}