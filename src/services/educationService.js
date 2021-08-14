import axios from "axios";

export default class EducationService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/educations/getAll")
    }

    add(education){
        return axios.post("http://localhost:8080/api/educations/add", education)
    }

    update(education){
        return axios.post("http://localhost:8080/api/educations/update", education)
    }

    delete(id){
        return axios.delete("http://localhost:8080/api/educations/delete?id="+id)
    }

}