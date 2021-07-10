import React from "react";
import { Button, Card } from "semantic-ui-react";
import CityList from "../pages/CityList";
import JobPositionList from "../pages/JobPositionList";
import WorkPlaceList from "../pages/WorkPlaceList";
import WorkTimeList from "../pages/WorkTimeList";

export default function SideBar() {
  return (
    <div>
      <Card fluid color="green">
          <h2 style={{fontWeight:"bold", color:"green"}}>Filtreler</h2>
      </Card>
      <Card fluid color="teal">
        <Card.Content>
          <CityList />
          <br />
          <JobPositionList />
          <br/>
          <WorkPlaceList />
          <br/>
          <WorkTimeList />
          <br/>
          <Button basic color="blue">İŞ ARA</Button>
          <Button basic color="blue">Filtreyi Kaldır</Button>
        </Card.Content>
      </Card>
    </div>
  );
}
