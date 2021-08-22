import axios from "axios";

export default class CvService{

    getCvs(){
        return axios.get("http://localhost:8080/api/cv/getAll")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/cv/getById?id=" + id)
    }

    getByCandidateId(id){
        return axios.get("http://localhost:8080/api/cv/findByCandidateId?id=" + id)
    }

    addCv(cv){
        return axios.post("http://localhost:8080/api/cv/add", cv)
    }

    updateCv(cv){
        return axios.put("http://localhost:8080/api/cv/update", cv)
    }

    addImage(file, cvId){
        return axios.post("http://localhost:8080/api/cv/addImage?cvId=" + cvId, file)
    }

    updateImage(file, cvId){
        return axios.put("http://localhost:8080/api/cv/updateImage?cvId=" + cvId, file)
    }
}