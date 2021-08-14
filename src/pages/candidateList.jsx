import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Pagination, Select, Table } from "semantic-ui-react";
import CandidateService from "../services/candidateService";

export default function CandidateList() {

  const [totalPage, setTotalPage] = useState(1);

  const [pageNo, setPageNo] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    let candidates = new CandidateService();
    candidates.getCandidates(pageNo, pageSize)
      .then((result) => {
        setCandidates(result.data.data.content)
        setTotalPage(result.data.data.totalPages)
      });
  }, [pageNo, pageSize]);

  console.log(candidates)
  
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
                 <Button as={NavLink} to={`/candidateCv/${candidate.id}`} content="Cv Görüntüle" basic color="green" />
              </Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <br/>
      <Pagination
         defaultActivePage = {pageNo}
         onPageChange = {(e, data) => handlePaginationChange(data.activePage)}
         totalPages={totalPage}
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
