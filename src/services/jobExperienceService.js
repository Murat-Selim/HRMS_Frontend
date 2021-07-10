import axios from "axios";

export default class JobExperienceService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/jobExperiences/getall")
    }

    addJobExperience(jobExperience){
        return axios.get("http://localhost:8080/api/jobExperiences/add", jobExperience)
    }
}