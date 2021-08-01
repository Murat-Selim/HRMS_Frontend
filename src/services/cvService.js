import axios from "axios";

export default class CvService{

    getCvLists(){
        return axios.get("http://localhost:8080/api/cv/getall")
    }

    getByCandidateId(id){
        return axios.get("http://localhost:8080/api/cv/findAllByCandidateId?id=" + id)
    }

    addCv(cv){
        return axios.post("http://localhost:8080/api/cv/add", cv)
    }

    updateCv(cv){
        return axios.put("http://localhost:8080/api/cv/update", cv)
    }
}