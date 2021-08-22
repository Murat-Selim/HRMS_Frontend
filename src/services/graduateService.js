import axios from "axios";

export default class GraduateService{
    
    getAll(){
        return axios.get("http://localhost:8080/api/graduates/getAll")
    }

    add(graduate){
        return axios.post("http://localhost:8080/api/graduates/add", graduate)
    }

    update(graduate){
        return axios.put("http://localhost:8080/api/graduates/update", graduate)
    }

    delete(id){
        return axios.delete("http://localhost:8080/api/graduates/delete?id="+id)
    }
}