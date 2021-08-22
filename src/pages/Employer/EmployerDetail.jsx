import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Button, Card, Icon, Pagination, Select } from "semantic-ui-react";
import EmployerService from "../../services/employerService";
import JobAdvertService from "../../services/jobAdvertService";
import moment from "moment";
import "moment/locale/tr";

export default function EmployerDetail() {
  
  moment.locale("tr");
  
  let { id } = useParams();

  const [totalPage, setTotalPage] = useState(1);

  const [pageNo, setPageNo] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [employer, setEmployer] = useState({});
  
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    let jobAdvertService = new JobAdvertService();
    employerService
      .getById(id)
      .then((result) => setEmployer(result.data.data));
    jobAdvertService
      .getByIsActiveAndEmployerId(id, pageNo, pageSize)
      .then((result) => {
        setJobAdverts(result.data.data.content);
        setTotalPage(result.data.data.totalPages);
      });
  }, [id, pageNo, pageSize]);

  const pageSizeOptions = [
    { key: "1", value: "10", text: "10" },
    { key: "2", value: "20", text: "20" },
    { key: "3", value: "50", text: "50" },
    { key: "4", value: "100", text: "100" },
  ];

  const handlePaginationChange = (pageNo) => {
    setPageNo(pageNo);
  };

  const handleSizeChange = (value) => {
    setPageSize(value);
  };

  return (
    <div>
      <Card.Group>
        <Card fluid color="blue">
          <Card.Content>          
            <Card.Header style={{textAlign: "left", fontWeight: "bold", height: "30px", marginTop: "10px", color: "purple"}}>
              <Icon name="building"/>             
              {employer.companyName}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <div style={{textAlign: "left", color: "purple"}}>
              <Card.Description>                        
                <div style={{marginTop: "10px"}}>  
                  <Icon name="world"/>             
                  <strong>
                     <a href="/#" target="_blank">{employer.webAddress}</a>
                  </strong>
                </div>
              </Card.Description>
              <Card.Description>
                <div style={{ marginTop: "10px" }}>
                  <Icon name="mail"/>                                
                  <strong><a href="/#">{employer.email}</a></strong>
                </div>
              </Card.Description>
              <Card.Description>
                <div style={{ marginTop: "10px" }}>
                <Icon name="phone"/>                              
                  <strong>{employer.phoneNumber}</strong>
                </div>
              </Card.Description>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>

      <Card fluid color="blue">
        <Card.Header style={{fontWeight: "bold", height: "30px", marginTop: "10px", color: "green",}} content="BU ŞİRKETE AİT İŞ İLANLARI"/>      
      </Card>

      <Card.Group>
        {jobAdverts.map((jobAdvert) => (
          <Card fluid color="blue" key={jobAdvert.id}>
          <Card.Content>
            <Card.Header style={{textAlign: "left", fontWeight: "bold", height: "30px", marginTop: "10px", color: "purple" }}>
              {jobAdvert.jobTitle}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>         
           <div style={{textAlign: "left", color: "black"}}>
              <Card.Description>
                <div style={{ marginTop: "10px" }}>
                  <strong style={{color: "green"}}>{jobAdvert.employerCompanyName}</strong>
                </div>
              </Card.Description>
              <Card.Description>
                <div style={{ marginTop: "10px"}}>
                  {jobAdvert.cityName}
                </div>
              </Card.Description>
              <Card.Description style={{marginTop: "10px"}}>
                  {jobAdvert.workTimeName} 
                <Card.Group style={{float: "right", marginTop: "0px"}}>
                    {moment(jobAdvert.createdDate)
                            .startOf("day")
                            .fromNow()}
                </Card.Group>
              </Card.Description>
            </div>
           </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button content="İş İlanına Git" as={NavLink} to={`/jobAdverts/${jobAdvert.id}`} basic color="green" />
              <Button content="Başvur" basic color="red" />
            </div>
          </Card.Content>
        </Card>
        ))}
      </Card.Group>
      <br />
      <Pagination
        defaultActivePage={pageNo}
        onPageChange={(e, data) => handlePaginationChange(data.activePage)}
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
