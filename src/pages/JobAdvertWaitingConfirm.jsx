import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Table } from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";

export default function JobAdvertWaitingConfirm() {
  const [JobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let JobAdverts = new JobAdvertService();
    JobAdverts.getByNotActive().then((result) => setJobAdverts(result.data.data));
  }, []);

  const handleIsActive = () => {
      let changeActive = new JobAdvertService();
      changeActive.updateChangeActive();
      toast.success("İş ilanı onaylandı!")
  }

  const handleNotActive = () => {
    let changeActive = new JobAdvertService();
    changeActive.updateChangeFalse();
    toast.error("İş ilanı onaylanmadı!")
  }
 
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket</Table.HeaderCell>
            <Table.HeaderCell>Pozisyon</Table.HeaderCell>
            <Table.HeaderCell>Açık Pozisyon</Table.HeaderCell>
            <Table.HeaderCell>Oluşturma Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Kapanış Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Onayla</Table.HeaderCell>
            <Table.HeaderCell>Vazgeç</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {JobAdverts.map((JobAdvert) => (
            <Table.Row key={JobAdvert.id}>
              <Table.Cell>{JobAdvert.employerCompanyName}</Table.Cell>
              <Table.Cell>{JobAdvert.jobTitle}</Table.Cell>
              <Table.Cell>{JobAdvert.numberOfOpenPosition}</Table.Cell>
              <Table.Cell>{JobAdvert.createdDate}</Table.Cell>
              <Table.Cell>{JobAdvert.applicationDeadline}</Table.Cell>
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
