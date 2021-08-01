import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import CandidateService from "../services/candidateService";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    let candidates = new CandidateService();
    candidates
      .getCandidates()
      .then((result) => setCandidates(result.data.data));
  }, []);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>İsim</Table.HeaderCell>
            <Table.HeaderCell>Soyisim</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Kimlik No</Table.HeaderCell>
            <Table.HeaderCell>Doğum tarihi</Table.HeaderCell>
            <Table.HeaderCell>Cv Görüntüle</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {candidates.map((candidate) => (
            <Table.Row key={candidate.id}>
              <Table.Cell>{candidate.firstName}</Table.Cell>
              <Table.Cell>{candidate.lastName}</Table.Cell>
              <Table.Cell>{candidate.email}</Table.Cell>
              <Table.Cell>{candidate.identityNumber}</Table.Cell>
              <Table.Cell>{candidate.dateOfBirth}</Table.Cell>
              <Table.Cell>
                 <Button content="Cv Görüntüle" basic color="green" />
              </Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
