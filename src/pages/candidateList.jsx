import React, { useEffect, useState } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
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
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Isim</Table.HeaderCell>
            <Table.HeaderCell>Soyisim</Table.HeaderCell>
            <Table.HeaderCell>Kimlik No</Table.HeaderCell>
            <Table.HeaderCell>Dogum tarihi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {candidates.map((candidate) => (
            <Table.Row key={candidate.id}>
              <Table.Cell>{candidate.email}</Table.Cell>
              <Table.Cell>{candidate.firstName}</Table.Cell>
              <Table.Cell>{candidate.lastName}</Table.Cell>
              <Table.Cell>{candidate.identityNumber}</Table.Cell>
              <Table.Cell>{candidate.dateOfBirth}</Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
