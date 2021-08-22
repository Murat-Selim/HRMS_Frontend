import moment from "moment";
import "moment/locale/tr";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Card, Icon, Image, Menu } from "semantic-ui-react";
import CvService from "../../services/cvService";

export default function CvList() {
   
  moment.locale("tr")

  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    let cvService = new CvService();
    cvService.getCvs().then((result) => setCvs(result.data.data));
  }, []);

  return (
    <div>          
      <Card.Group>
        {cvs.map((cv) => (
           <Card as={NavLink} to={`/candidateCv/${cv.candidateId}`} fluid color="blue" key={cv.id}>
             <Card.Content>
               <Card.Header
                  style={{
                    fontWeight: "bold",
                    height: "30px",
                    marginTop: "7px",
                    color: "purple",
                  }}
                  content={`${cv.candidateFirstName} ${cv.candidateLastName}`}
                />
                <hr />
                <Image
                  style={{ width: "150px", height: "150px" }}
                  floated='left'
                  size='medium'
                  src={cv.image}
                />
                  <div>
                  <Card.Description>
                      <h3 style={{ margin: "10px" }}>
                        <b> Açıklama : </b> {cv.description}
                      </h3>
                  </Card.Description>
                  <Card.Description>
                    <h3 style={{ margin: "10px" }}>
                      <b> Oluşturma Tarihi : </b> {moment(cv.createdDate)
                          .startOf("day")
                          .fromNow()}
                    </h3>
                  </Card.Description>
                  <Card.Description>
                   <Menu widths="2">
                        <Menu.Item href={cv.githubLink}><Icon size="large" name="github" /></Menu.Item>
                        <Menu.Item href={cv.linkedinLink}><Icon size="large" name="linkedin" /></Menu.Item>
                   </Menu>
                  </Card.Description>
                </div>
              </Card.Content>
            </Card>
          ))}          
        </Card.Group>
    </div>
  );
}
