import axios from "axios";

export default class CvService{

    getCvLists(){
        return axios.get("http://localhost:8080/api/cv/getall")
    }

    createCv(cv){
        return axios.post("http://localhost:8080/api/cv/add", cv)
    }

    updateCv(cv){
        return axios.put("http://localhost:8080/api/cv/update", cv)
    }
}