import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";

export default function JobAdvertList() {
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdverts = new JobAdvertService();
    jobAdverts.getJobAdverts().then((result) => setJobAdverts(result.data.data));
  }, []);

  return (
    <div>
      
      <Card.Group>

      {jobAdverts.map((jobAdvert) => (
      
      <Card fluid color="blue" key={jobAdvert.id}>
       
        <Card.Content>
          <Card.Header
            style={{fontWeight: "bold", height: "30px", marginTop: "7px", color: "purple" }}
            content={jobAdvert.employerCompanyName}
          />
          <hr/>
          <div>
            <Card.Description>
              <h3>
                <b>Pozisyon : </b> 
                <strong>{jobAdvert.jobTitle}</strong>
              </h3>
            </Card.Description>
            <Card.Description>
              <div style={{ margin: "10px" }}>
                <b> Açık Pozisyon : </b> {jobAdvert.numberOfOpenPosition}
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ margin: "10px" }}>
                <b> Oluşturma Tarihi : </b> {jobAdvert.createdDate}
              </div>
            </Card.Description>
            <Card.Description>
              <b>Kapanış Tarihi : </b> {jobAdvert.applicationDeadline} 
            </Card.Description>
          </div>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button as={NavLink} to={`/jobAdverts/${jobAdvert.id}`} basic color="green">
              Detaylar
            </Button>
            <Button basic color="red">
              Favorilere Ekle
            </Button>
          </div>
         </Card.Content>
         </Card>
        ))}
      </Card.Group>
  </div>
 );
}