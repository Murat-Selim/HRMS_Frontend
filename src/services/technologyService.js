import axios from "axios";

export default class TechnologyService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/technologies/getall")
    }

    addTechnology(technology){
        return axios.get("http://localhost:8080/api/technologies/add", technology)
    }
}