import React from "react";
import { Grid } from 'semantic-ui-react'
import JobAdvertList from '../pages/JobAdvertList'
import JobPositionList from '../pages/JobPositionList'
import { Route } from 'react-router-dom'
import CityList from "../pages/CityList";
import CandidateList from "../pages/CandidateList";
import EmployerList from '../pages/EmployerList';
import CvList from "../pages/CvList";
import JobAdvertAdd from "../pages/JobAdvertAdd";
import SideBar from "./SideBar";
import JobAdvertDetail from "../pages/JobAdvertDetail";
import EmployeeList from "../pages/EmployeeList";
import FavoriteJobAdvertList from "../pages/FavoriteJobAdvertList";
import JobAdvertWaitingConfirm from "../pages/JobAdvertWaitingConfirm";
import EmployerWaitingConfirm from "../pages/EmployerWaitingConfirm";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={12}>
            <Route exact path="/" component={JobAdvertList}/>
            <Route exact path="/candidateList" component={CandidateList}/>
            <Route exact path="/employerList" component={EmployerList}/>
            <Route exact path="/employerWaitingConfirm" component={EmployerWaitingConfirm}/>
            <Route exact path="/employeeList" component={EmployeeList}/>
            <Route exact path="/jobAdvertList" component={JobAdvertList}/>
            <Route exact path="/jobAdverts/:id" component={JobAdvertDetail}/>
            <Route exact path="/jobAdvertAdd" component={JobAdvertAdd}/>
            <Route exact path="/jobAdvertWaitingConfirm" component={JobAdvertWaitingConfirm}/>
            <Route exact path="/jobAdvertAdd" component={JobAdvertAdd}/>
            <Route exact path="/jobPositionList" component={JobPositionList}/>
            <Route exact path="/cvList" component={CvList}/>
            <Route exact path="/cv/:id" component={CvList}/>
            <Route exact path="/cityList" component={CityList}/>
            <Route exact path="/favorites" component={FavoriteJobAdvertList} />
            <Route exact path="/favorites/:id" component={FavoriteJobAdvertList} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
