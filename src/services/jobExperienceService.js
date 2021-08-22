import axios from "axios";

export default class JobExperienceService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/jobExperiences/getAll")
    }

    add(jobExperience){
        return axios.post("http://localhost:8080/api/jobExperiences/add", jobExperience)
    }

    update(jobExperience){
        return axios.put("http://localhost:8080/api/jobExperiences/update", jobExperience)
    }

    delete(id){
        return axios.delete("http://localhost:8080/api/jobexperiences/delete?id="+id)
    }
}