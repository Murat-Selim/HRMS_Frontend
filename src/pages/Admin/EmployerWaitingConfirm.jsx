import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Pagination, Select, Table } from "semantic-ui-react";
import EmployerService from "../../services/employerService";

export default function EmployerWaitingConfirm() {

  const [totalPage, setTotalPage] = useState(1);

  const [pageNo, setPageNo] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employers = new EmployerService();
    employers.getByNotActive(pageNo, pageSize).then((result) => {
      setEmployers(result.data.data)
      setTotalPage(result.data.data.totalPages)
    });
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

  const handleIsActive = (id) => {
    let changeActive = new EmployerService();
    changeActive.updateChangeActive(id);
    const removeList = employers.filter((employer) => employer.id !== id);
    setEmployers(removeList);
    toast.success("İş Veren Onaylandı!")
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
            <Table.HeaderCell>Onay Bekleyen</Table.HeaderCell>
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
                <Button color="green" onClick={() => handleIsActive(employer.id)}>Onayla</Button>
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
