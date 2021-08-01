import axios from "axios";

export default class JobExperienceService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/jobExperiences/getall")
    }

    add(jobExperience){
        return axios.post("http://localhost:8080/api/jobExperiences/add", jobExperience)
    }

    update(jobExperience){
        return axios.post("http://localhost:8080/api/jobexperiences/update", jobExperience)
    }

    delete(id){
        return axios.delete("http://localhost:8080/api/jobexperiences/delete?id="+id)
    }
}