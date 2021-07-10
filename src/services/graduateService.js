import axios from "axios";

export default class GraduateService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/graduates/getall")
    }

    addGraduate(graduate){
        return axios.get("http://localhost:8080/api/graduates/add", graduate)
    }
}