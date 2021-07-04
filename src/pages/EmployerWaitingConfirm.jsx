import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Table } from "semantic-ui-react";
import EmployerService from "../services/employerService";

export default function EmployerWaitingConfirm() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employers = new EmployerService();
    employers.getByNotActive().then((result) => setEmployers(result.data.data));
  }, []);

  const handleIsActive = () => {
    let changeActive = new EmployerService();
    changeActive.updateChangeActive();
    toast.success("İş Veren onaylandı!")
  }

  const handleNotActive = () => {
    let changeActive = new EmployerService();
    changeActive.updateChangeFalse();
    toast.error("İş Veren onaylanmadı!")
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket</Table.HeaderCell>
            <Table.HeaderCell>Web Adress</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
            <Table.HeaderCell>Telefon Numarası</Table.HeaderCell>
            <Table.HeaderCell>Onayla</Table.HeaderCell>
            <Table.HeaderCell>Vazgeç</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employers.map((employer) => (
            <Table.Row key={employer.id}>
              <Table.Cell>{employer.companyName}</Table.Cell>
              <Table.Cell>{employer.webAddress}</Table.Cell>
              <Table.Cell>{employer.email}</Table.Cell>
              <Table.Cell>{employer.phoneNumber}</Table.Cell>
              <Table.Cell>
                <Button color="green" onClick={() => handleIsActive()}>Onayla</Button>
              </Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => handleNotActive()}>Vazgeç</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
