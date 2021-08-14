import axios from "axios"

export default class EmployeeService{
    
    getEmployees(){
        return axios.get("http://localhost:8080/api/employees/getAll")
    }

    updateEmployee(employee){
        return axios.put("http://localhost:8080/api/employees/update", employee)
    }
}