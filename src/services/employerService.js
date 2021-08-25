import axios from "axios";

export default class EmployerService{
    
    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getAll")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/employers/getById?id=" + id)
    }

    getByIsActive(pageNo, pageSize){
        return axios.get(`http://localhost:8080/api/employers/getAllByIsActive?pageNo=${pageNo}&pageSize=${pageSize}`)
    }

    getByNotActive(pageNo, pageSize){
        return axios.get(`http://localhost:8080/api/employers/getAllByNotActive?pageNo=${pageNo}&pageSize=${pageSize}`)
    }

    addEmployer(employer){
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

    getByUpdatedData(){
        return axios.get("http://localhost:8080/api/employers/getByUpdatedDataNotNull")
    }

    updateConfirm(id){
        return axios.put("http://localhost:8080/api/employers/updateConfirm?userId=" + id);
    }
}