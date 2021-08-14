import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card} from "semantic-ui-react";
import JobAdvertService from "../../services/jobAdvertService";
import moment from "moment";
import "moment/locale/tr";

export default function JobAdvertDetail() {

  moment.locale("tr");

  let { id } = useParams();

  const [jobAdvert, setJobAdvert] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getById(id)
      .then((result) => setJobAdvert(result.data.data));
  }, [id]);

  return (
    <div>
      <Card fluid color="blue">
        <Card.Content>
          <Card.Header
            style={{textAlign:"left", fontWeight: "bold", height: "30px", marginTop: "10px", color: "purple" }}
            content={jobAdvert?.jobPosition?.jobTitle}
          />
       </Card.Content>
       <Card.Content extra>          
         <div style={{textAlign:"left", color: "black"}}>
            <Card.Description>
              <div style={{ marginTop: "10px"}}>
                <b>Şirket : </b> 
                <strong style={{color: "green"}}>{jobAdvert?.employer?.companyName}</strong>
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ marginTop: "10px"}}>
                <b> İş Tanımı : </b> {jobAdvert.jobDescription}
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ marginTop: "10px" }}>
                <b> Açık Pozisyon : </b> {jobAdvert.numberOfOpenPosition}
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ marginTop: "10px" }}>
                <b> Maaş Aralığı : </b> 
                  <ins>
                    {jobAdvert.minSalary} - {jobAdvert.maxSalary}
                  </ins>
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ marginTop: "10px" }}>
                <b>Şehir : </b> {jobAdvert?.city?.name} 
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ marginTop: "10px" }}>
                <b>İş Yeri : </b> {jobAdvert?.workPlace?.name} 
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ marginTop: "10px" }}>
                <b>İş Zamanı : </b> {jobAdvert?.workTime?.name} 
              </div>
            </Card.Description>
            <Card.Description>
              <div style={{ marginTop: "10px" }}>
                <b>Kapanış Tarihi : </b> {moment(jobAdvert.applicationDeadline)
                          .endOf("day")
                          .fromNow()}
              </div>
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
