import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Pagination, Select, Table } from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";

export default function JobAdvertWaitingConfirm() {

  const [totalPage, setTotalPage] = useState(1);

  const [pageNo, setPageNo] = useState(1);

  const [pageSize, setPageSize] = useState(10);
  
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdverts = new JobAdvertService();
    jobAdverts.getByNotActive(pageNo, pageSize).then((result) => {
      setJobAdverts(result.data.data.content)
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
      let changeActive = new JobAdvertService();
      changeActive.updateChangeActive(id)
      const removeList = jobAdverts.filter((jobAdvert)=>jobAdvert.id !== id);
      setJobAdverts(removeList);
      toast.success("İş İlanı Onaylandı!")
      window.location.reload(2000)
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
            <Table.HeaderCell>Onay Bekleyen</Table.HeaderCell>
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
                <Button color="green" onClick={() => handleIsActive(jobAdvert.id)}>Onayla</Button>
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
