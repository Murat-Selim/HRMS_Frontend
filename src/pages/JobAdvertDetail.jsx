import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";

export default function JobAdvertDetail() {
  let { id } = useParams();

  const [jobAdvert, setJobAdvert] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getById(id)
      .then((result) => setJobAdvert(result.data.data));
  });

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header
            style={{fontWeight: "bold", height: "30px", marginTop: "7px", color: "purple" }}
            content={jobAdvert?.employer?.companyName}
          />
          <hr/>
          <div style={{textAlign:"left"}}>
            <Card.Description>
              <h3>
                <b>Pozisyon : </b> 
                <strong>{jobAdvert?.jobPosition?.jobTitle}</strong>
              </h3>
            </Card.Description>
            <Card.Description>
              <div style={{ margin: "10px" }}>
                <b> İş Tanımı : </b> {jobAdvert.jobDescription}
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ margin: "10px" }}>
                <b> Maaş Aralığı : </b> 
                  <b><ins>
                    {jobAdvert.minSalary} - {jobAdvert.maxSalary}
                  </ins></b>
              </div>
            </Card.Description>
            <Card.Description>
              <b>Şehir : </b> {jobAdvert?.city?.name} 
            </Card.Description>
          </div>
        </Card.Content>
        <Card.Content extra>
          <div className="ui buttons">
            <Button basic color="green">
              Başvur
            </Button>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
