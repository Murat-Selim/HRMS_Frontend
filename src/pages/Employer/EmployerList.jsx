import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Pagination, Select, Table } from "semantic-ui-react";
import EmployerService from "../../services/employerService";
import EmployerUpdate from "../Employer/EmployerUpdate";

export default function EmployerList() {

  const [pageNo, setPageNo] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employers = new EmployerService();
    employers.getByIsActive(pageNo, pageSize).then((result) => setEmployers(result.data.data));
  }, [pageNo, pageSize]);

  const pageSizeOptions = [
    { key: "1", value: "10", text: "10" },
    { key: "2", value: "20", text: "20" },
    { key: "3", value: "50", text: "50" },
    { key: "4", value: "100", text: "100" },
  ];

  const handlePaginationChange = (pageNo) => {
    setPageNo(pageNo);
  }

  const handleSizeChange = (value) => {
    setPageSize(value)
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Şirket</Table.HeaderCell>
            <Table.HeaderCell>Web Site</Table.HeaderCell>
            <Table.HeaderCell>Telefon</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Web Site</Table.HeaderCell>
            <Table.HeaderCell>Güncelle</Table.HeaderCell>
            <Table.HeaderCell>Detaya git</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employers.map((employer) => (
            <Table.Row key={employer.id}>
              <Table.Cell>{employer.companyName}</Table.Cell>
              <Table.Cell>{employer.webAddress}</Table.Cell>
              <Table.Cell>{employer.phoneNumber}</Table.Cell>
              <Table.Cell>{employer.email}</Table.Cell>
              <Table.Cell>
                <Button color="blue" content="WebSite" />
              </Table.Cell>
              <Table.Cell>
                  <EmployerUpdate employer={employer} />
              </Table.Cell>
              <Table.Cell>
                <Button basic color="blue" content="Detaylar" as={NavLink} to={`/employer/${employer.id}`} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <br/>
      <Pagination
         defaultActivePage = {pageNo}
         onPageChange = {(e, data) => handlePaginationChange(data.activePage)}
         totalPages={2}
         pageSize={pageSize}
         siblingRange={1}
      />
      <Select
         style={{ marginLeft: "2em" }}
         options={pageSizeOptions}
         onChange={(e, value) => handleSizeChange(value)}
         placeholder="10"
         compact
      />
    </div>
  );
}
