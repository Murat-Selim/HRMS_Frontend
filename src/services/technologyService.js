import axios from "axios";

export default class TechnologyService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/technologies/getAll")
    }

    add(technology){
        return axios.post("http://localhost:8080/api/technologies/add", technology)
    }

    update(technology){
        return axios.put("http://localhost:8080/api/technologies/update", technology)
    }

    delete(id){
        return axios.delete("http://localhost:8080/api/technologies/delete?id="+id)
    }
}