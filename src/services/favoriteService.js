import axios from "axios";


export default class FavoriteService{
    
    getAll(pageNo, pageSize){
        return axios.get(`http://localhost:8080/api/favoriteJobAdverts/getAll?pageNo=${pageNo}&pageSize=${pageSize}`)
    }
    
    getByCandidateId(candidateId, pageNo, pageSize) {
      return axios.get(`http://localhost:8080/api/favoriteJobAdverts/getAllByCandidateId?candidateId=${candidateId}&pageNo=${pageNo}&pageSize=${pageSize}`);
    }
    
    getById(id){
      return axios.get("http://localhost:8080/api/favoriteJobAdverts/getById?id="+id)
    }
    
    add(favoriteJobAdvert) {
       return axios.post("http://localhost:8080/api/favoriteJobAdverts/add", favoriteJobAdvert);
    }
  
    delete(candidateId, jobAdvertId) {
       return axios.delete(`http://localhost:8080/api/favoriteJobAdverts/delete?candidateId=${candidateId}&jobAdvertId=${jobAdvertId}`);
    }
}