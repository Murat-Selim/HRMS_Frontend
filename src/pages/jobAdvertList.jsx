import React, { useEffect, useState } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";

export default function JobAdvertList() {
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdverts = new JobAdvertService();
    jobAdverts.getJobAdverts().then((result) => setJobAdverts(result.data.data));
  }, []);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Sirket</Table.HeaderCell>
            <Table.HeaderCell>Pozisyon</Table.HeaderCell>
            <Table.HeaderCell>Olusturma tarihi</Table.HeaderCell>
            <Table.HeaderCell>Kapanis tarihi</Table.HeaderCell>
            <Table.HeaderCell>Acik Pozisyon sayisi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobAdverts.map((jobAdvert) => (
            <Table.Row key={jobAdvert.id}>
              <Table.Cell>{jobAdvert.employerCompanyName}</Table.Cell>
              <Table.Cell>{jobAdvert.jobTitle}</Table.Cell>
              <Table.Cell>{jobAdvert.createdDate}</Table.Cell>
              <Table.Cell>{jobAdvert.applicationDeadline}</Table.Cell>
              <Table.Cell>{jobAdvert.numberOfOpenPosition}</Table.Cell>
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
