import React from "react";
import { Grid } from 'semantic-ui-react'
import JobAdvertList from '../pages/Job/JobAdvertList'
import { Route } from 'react-router-dom'
import CandidateList from "../pages/CandidateList";
import EmployerList from '../pages/EmployerList';
import Cv from "../pages/Cv/Cv";
import JobAdvertAdd from "../pages/Job/JobAdvertAdd";
import JobAdvertDetail from "../pages/Job/JobAdvertDetail";
import EmployeeList from "../pages/Admin/EmployeeList";
import FavoriteJobAdvertList from "../pages/Job/FavoriteJobAdvertList";
import JobAdvertWaitingConfirm from "../pages/Admin/JobAdvertWaitingConfirm";
import EmployerWaitingConfirm from "../pages/Admin/EmployerWaitingConfirm";
import JobAdvertFilter from "./JobAdvertFilter";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <JobAdvertFilter style={{height:"639px"}}/>
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
            <Route exact path="/cv" component={Cv}/>
            <Route exact path="/cv/:id" component={Cv}/>
            <Route exact path="/favorites" component={FavoriteJobAdvertList} />
            <Route exact path="/favorites/:id" component={FavoriteJobAdvertList} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
