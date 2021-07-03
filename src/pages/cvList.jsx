import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react';
import CvService from '../services/cvService'

export default function CvList() {
    const [cvList, setCvList] = useState([])

    useEffect(() => {
        let cvList = new CvService();
        cvList.getCvLists().then((result) => setCvList(result.data.data))
    },[])

    return (
        <div>
            <Table celled fixed>
                <Table.Header>
                    <Table.Row>                        
                        <Table.HeaderCell>İsim</Table.HeaderCell>
                        <Table.HeaderCell>Soyisim</Table.HeaderCell>
                        <Table.HeaderCell>Github</Table.HeaderCell>
                        <Table.HeaderCell>Linkedin</Table.HeaderCell>
                        <Table.HeaderCell>Resim</Table.HeaderCell>
                        <Table.HeaderCell>Ön yazi</Table.HeaderCell>
                        <Table.HeaderCell>Çalıştığı şirket</Table.HeaderCell>
                        <Table.HeaderCell>İş pozisyonu</Table.HeaderCell>                   
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {cvList.map((cv) => (
                        <Table.Row key={cv.id}>
                            
                            <Table.Cell>{cv.candidateFirstName}</Table.Cell>
                            <Table.Cell>{cv.candidateLastName}</Table.Cell>
                            <Table.Cell>{cv.githubLink}</Table.Cell>
                            <Table.Cell>{cv.linkedinLink}</Table.Cell>
                            <Table.Cell>{cv.image}</Table.Cell>
                            <Table.Cell>{cv.description}</Table.Cell>
                            <Table.Cell>{cv.jobExperiences[0].companyName}</Table.Cell>
                            <Table.Cell>{cv.jobExperiences[0].jobPosition.jobTitle}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
