import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Table } from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";

export default function JobAdvertWaitingConfirm() {
  
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdverts = new JobAdvertService();
    jobAdverts.getByNotActive().then((result) => setJobAdverts(result.data.data));
  }, []);

  const handleIsActive = (id) => {
      let changeActive = new JobAdvertService();
      changeActive.updateChangeActive(id)
      const removeList = jobAdverts.filter((jobAdvert)=>jobAdvert.id !== id);
      setJobAdverts(removeList);
      toast.success("İş ilanı onaylandı!")
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
            <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobAdverts.map((jobAdvert) => (
            <Table.Row key={jobAdvert.id}>
              <Table.Cell>{jobAdvert.employerCompanyName}</Table.Cell>
              <Table.Cell>{jobAdvert.jobTitle}</Table.Cell>
              <Table.Cell>{jobAdvert.numberOfOpenPosition}</Table.Cell>
              <Table.Cell>{jobAdvert.createdDate}</Table.Cell>
              <Table.Cell>{jobAdvert.applicationDeadline}</Table.Cell>
              <Table.Cell>
                <Button color="red" onClick={() => handleIsActive(jobAdvert.id)}>Onay Bekleyen</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
