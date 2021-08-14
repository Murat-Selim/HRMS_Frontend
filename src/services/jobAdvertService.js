import axios from "axios";

export default class JobAdvertService{

    getJobAdverts(){
        return axios.get("http://localhost:8080/api/jobAdverts/getAll")
    }

    getByIsActive(pageNo, pageSize){
        return axios.get(`http://localhost:8080/api/jobAdverts/getAllByIsActive?pageNo=${pageNo}&pageSize=${pageSize}`)
    }

    getByNotActive(pageNo, pageSize){
        return axios.get(`http://localhost:8080/api/jobAdverts/getAllByNotActive?pageNo=${pageNo}&pageSize=${pageSize}`)
    }

    getById(id){
        return axios.get("http://localhost:8080/api/jobAdverts/getById?id=" + id)
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

    getByJobAdvertFilter(pageNo, pageSize, filter){
        return axios.post(`http://localhost:8080/api/jobAdverts/getByJobAdvertFilter?pageNo=${pageNo}&pageSize=${pageSize}`,filter)
    }

    getByIsActiveAndEmployerId(id, pageNo, pageSize){
        return axios.get(`http://localhost:8080/api/jobAdverts/getByIsActiveAndEmployerId?employerId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`)
    }
}