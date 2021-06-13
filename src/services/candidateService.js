import axios from "axios";

export default class CandidateService{
   
    getCandidates(){
        return axios.get("http://localhost:8080/api/candidates/getall")
    }

    createCandidate(candidate){
        return axios.post("http://localhost:8080/api/candidates/add", candidate)
    }
}