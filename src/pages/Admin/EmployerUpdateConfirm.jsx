import React, { useState, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { toast } from "react-toastify";
import EmployerService from "../../services/employerService";

export default function EmployerUpdateConfirm() {
  
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getByUpdatedData()
      .then((result) => setEmployers(result.data.data));
  }, []);

  function updateConfirm(id) {
    let employerService = new EmployerService();
    employerService.updateConfirm(id).then((result) => result.data.data);
    const removeList = employers.filter((employer) => employer.id !== id);
    setEmployers(removeList);
    toast.success("İş Veren Güncellemesi Onaylandı!");
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Web Sitesi</Table.HeaderCell>
            <Table.HeaderCell>Onay Bekleyen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {employers.map((employer) => (
            <Table.Row key={employer.updatedData.id}>
              <Table.Cell>{employer.updatedData.companyName}</Table.Cell>
              <Table.Cell>{employer.updatedData.email}</Table.Cell>
              <Table.Cell>{employer.updatedData.webAddress}</Table.Cell> 
              <Table.Cell>
                <Button
                  content="Onayla"
                  color="green"
                  onClick={() => updateConfirm(employer.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
