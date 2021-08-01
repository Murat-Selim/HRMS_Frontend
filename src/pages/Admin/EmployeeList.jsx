import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import EmployeeService from "../../services/employeeService";
import EmployeeUpdate from "./EmployeeUpdate";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let employees = new EmployeeService();
    employees.getEmployees().then((result) => setEmployees(result.data.data));
  }, []);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İsim</Table.HeaderCell>
            <Table.HeaderCell>Soyisim</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Güncelle</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employees.map((employee) => (
            <Table.Row key={employee.id}>
              <Table.Cell>{employee.firstName}</Table.Cell>
              <Table.Cell>{employee.lastName}</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
              <Table.Cell>
                <EmployeeUpdate employee={employee} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
