import React from "react";
import { Grid } from 'semantic-ui-react'
import JobAdvertList from '../pages/jobAdvertList'
import JobPositionList from '../pages/jobPositionList'
import { Route } from 'react-router-dom'
import EmployerList from "../pages/employerList";
import CandidateList from "../pages/candidateList";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <EmployerList/>
          </Grid.Column>
          <Grid.Column width={12}>
            <Route exact path="/" component={CandidateList}/>
            <Route exact path="/candidateList" component={CandidateList}/>
            <Route exact path="/employerList" component={EmployerList}/>
            <Route exact path="/jobAdvertList" component={JobAdvertList}/>
            <Route exact path="/jobPositionList" component={JobPositionList}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
