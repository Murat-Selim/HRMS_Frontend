import axios from "axios";

export default class EducationService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/educations/getall")
    }

    addEducation(education){
        return axios.get("http://localhost:8080/api/educations/add", education)
    }
}