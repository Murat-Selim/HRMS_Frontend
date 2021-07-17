import React, { useEffect, useState } from "react";
import { Card, Image } from "semantic-ui-react";
import CvService from "../../services/cvService";

export default function CvList() {
   
  const [cvLists, setCvList] = useState([]);

  useEffect(() => {
    let cvService = new CvService();
    cvService.getCvLists().then((result) => setCvList(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group>
        {cvLists.map((cv) => (
          <Card fluid color="blue" key={cv.id}>
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
                floated='left'
                size='medium'
                src={cv.image}
              />
              <div>
                <Card.Description>
                  <h3>
                    <b>Github : </b>
                    <strong>{cv.githubLink}</strong>
                  </h3>
                </Card.Description>
                <Card.Description>
                  <div style={{ margin: "10px" }}>
                    <b> Linkedin : </b> {cv.linkedinLink}
                  </div>
                </Card.Description>
                <Card.Description>
                  <div style={{ margin: "10px" }}>
                    <b> Açıklama : </b> {cv.description}
                  </div>
                </Card.Description>
                <Card.Description>
                  <div style={{ margin: "10px" }}>
                    <b> Oluşturma Tarihi : </b> {cv.createdDate}
                  </div>
                </Card.Description>
                <Card.Description>
                  <b>Güncellenme Tarihi : </b> {cv.updatedDate}
                </Card.Description>
              </div>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
