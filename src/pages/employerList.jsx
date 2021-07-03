import React, { useEffect, useState } from "react";
import { Button, Card } from "semantic-ui-react";
import EmployerService from "../services/employerService";

export default function EmployerList() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employers = new EmployerService();
    employers.getEmployers().then((result) => setEmployers(result.data.data));
  }, []);

  return (
    <div>
      <Card.Group>
        <Card fluid>
          {employers.map((employer) => (
            <Card.Content key={employer.id}>
              <Card.Header>{employer.companyName}</Card.Header>
              <Card.Meta>{employer.webAddress}</Card.Meta>
              <Card.Meta>{employer.email}</Card.Meta>
              <Card.Description>{employer.phoneNumber}</Card.Description>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Ekle
                  </Button>
                  <Button basic color="red">
                    Güncelle
                  </Button>
                </div>
              </Card.Content>
            </Card.Content>
          ))}
        </Card>
      </Card.Group>
    </div>
  );
}
