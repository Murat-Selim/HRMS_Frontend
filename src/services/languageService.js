import axios from "axios";

export default class LanguageService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/languages/getAll")
    }

    add(language){
        return axios.post("http://localhost:8080/api/languages/add", language)
    }

    update(language){
        return axios.put("http://localhost:8080/api/languages/update", language)
    }

    delete(id){
        return axios.delete("http://localhost:8080/api/languages/delete?id="+id)
    }
}