import React from "react";
import JobAdvertList from '../pages/Job/JobAdvertList'
import { Route } from 'react-router-dom'
import CandidateList from "../pages/Candidate/CandidateList";
import EmployerList from '../pages/Employer/EmployerList';
import Cv from "../pages/Cv/Cv";
import CvDetail from "../pages/Cv/CvDetail";
import JobAdvertAdd from "../pages/Job/JobAdvertAdd";
import JobAdvertDetail from "../pages/Job/JobAdvertDetail";
import EmployeeList from "../pages/Admin/EmployeeList";
import FavoriteJobAdvertList from "../pages/Job/FavoriteJobAdvertList";
import JobAdvertWaitingConfirm from "../pages/Admin/JobAdvertWaitingConfirm";
import EmployerWaitingConfirm from "../pages/Admin/EmployerWaitingConfirm";
import EmployerDetail from "../pages/Employer/EmployerDetail";
import EmployerUpdateConfirm from "../pages/Admin/EmployerUpdateConfirm";
import Admin from "../pages/Admin/Admin";

export default function Dashboard() {
  return (
    <div>
          <Route exact path="/" component={JobAdvertList}/>
          <Route exact path="/candidateList" component={CandidateList}/>
          <Route exact path="/employerList" component={EmployerList}/>
          <Route exact path="/employer/:id" component={EmployerDetail}/>
          <Route exact path="/employerWaitingConfirm" component={EmployerWaitingConfirm}/>
          <Route exact path="/employerUpdateConfirm" component={EmployerUpdateConfirm}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/employeeList" component={EmployeeList}/>
          <Route exact path="/jobAdvertList" component={JobAdvertList}/>
          <Route exact path="/jobAdverts/:id" component={JobAdvertDetail}/>
          <Route exact path="/jobAdvertAdd" component={JobAdvertAdd}/>
          <Route exact path="/jobAdvertWaitingConfirm" component={JobAdvertWaitingConfirm}/>
          <Route exact path="/cv" component={Cv}/>
          <Route exact path="/cv/:id" component={CvDetail}/>
          <Route exact path="/candidateCv/:id" component={CvDetail}/>
          <Route exact path="/favorites/:candidateId" component={FavoriteJobAdvertList} />
   </div>
  );
}
