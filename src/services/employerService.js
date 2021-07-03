import axios from "axios";

export default class EmployerService{
    
    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    createEmployer(employer){
        return axios.post("http://localhost:8080/api/employers/add", employer)
    }

    updateEmployer(employer){
        return axios.put("http://localhost:8080/api/employers/update", employer)
    }
}