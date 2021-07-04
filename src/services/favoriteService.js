import axios from "axios";


export default class FavoriteService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/favoriteJobAdverts/getAll")
    }
    
    getByCandidateId(candidateId) {
      return axios.get("http://localhost:8080/api/favoriteJobAdverts/getByCandidateId?candidateId=?" + candidateId);
    }
    
    getById(id){
      return axios.get("http://localhost:8080/api/favoriteJobAdverts/getById?id="+id)
    }
    
    add(values) {
       return axios.post("http://localhost:8080/api/favoriteJobAdverts/add", values);
    }
  
    delete(jobAdvertId) {
       return axios.delete("http://localhost:8080/api/favoriteJobAdverts/delete?jobAdvertId=" + jobAdvertId);
    }
}