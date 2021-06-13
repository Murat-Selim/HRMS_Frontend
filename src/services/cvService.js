import axios from "axios";

export default class CvService{

    getCvLists(){
        return axios.get("http://localhost:8080/api/cv/getAll")
    }

    createCv(cv){
        return axios.post("http://localhost:8080/api/cv/add", cv)
    }
}