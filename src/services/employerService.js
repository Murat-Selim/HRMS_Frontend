import axios from "axios";

export default class EmployerService{
    
    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    getByIsActive(){
        return axios.get("http://localhost:8080/api/employers/getAllByIsActive")
    }

    getByNotActive(){
        return axios.get("http://localhost:8080/api/employers/getAllByNotActive")
    }

    createEmployer(employer){
        return axios.post("http://localhost:8080/api/employers/add", employer)
    }

    updateEmployer(employer){
        return axios.put("http://localhost:8080/api/employers/update", employer)
    }

    updateChangeActive(id){
        return axios.put("http://localhost:8080/api/employers/updateChangeActive?userId=" + id)
    }

    updateChangeFalse(id){
        return axios.put("http://localhost:8080/api/employers/updateChangeFalse?userId=" + id)
    }
}