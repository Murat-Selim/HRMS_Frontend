import React from "react";
import { Button, Card } from "semantic-ui-react";
import CityList from "../pages/CityList";
import JobPositionList from "../pages/JobPositionList";
import WorkPlaceList from "../pages/WorkPlaceList";
import WorkTimeList from "../pages/WorkTimeList";

export default function SideBar() {
  return (
    <div>
      <Card>
        <Card.Content>
          <CityList />
          <br />
          <JobPositionList />
          <br/>
          <WorkPlaceList />
          <br/>
          <WorkTimeList />
          <br/>
          <Button color="blue">Uygula</Button>
        </Card.Content>
      </Card>
    </div>
  );
}
