import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'
import EmployeeList from '../Admin/EmployeeList'

export default function Admin() {
    return (
        <div>
            <EmployeeList />
            <br/>
            <Menu widths="3">
                <Menu.Item><Button as={NavLink} to="/employerWaitingConfirm" color="green" content="Employer Confirm" /></Menu.Item>
                <Menu.Item><Button as={NavLink} to="/employerUpdateConfirm" color="green" content="Employer Update Confirm" /></Menu.Item>
                <Menu.Item><Button as={NavLink} to="/jobAdvertWaitingConfirm" color="green" content="JobAdvert Confirm" /></Menu.Item>
            </Menu>
        </div>
    )
}
