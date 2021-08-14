import React, { useEffect, useState } from 'react'
import { Grid, Segment, Image, Header, Icon, Menu, Label, Rating, Divider, Item } from 'semantic-ui-react'
import CvService from '../../services/cvService'
import CvAdd from '../Cv/Add/CvAdd'
import CvUpdate from '../Cv/Update/CvUpdate'
import LanguageUpdate from '../Cv/Update/LanguageUpdate'
import TechnologyUpdate from '../Cv/Update/TechnologyUpdate'
import EducationUpdate from '../Cv/Update/EducationUpdate'
import JobExperienceUpdate from '../Cv/Update/JobExperienceUpdate'
import LanguageDelete from '../Cv/Delete/LanguageDelete'
import TechnologyDelete from '../Cv/Delete/TechnologyDelete'
import EducationDelete from '../Cv/Delete/EducationDelete'
import JobExperienceDelete from '../Cv/Delete/JobExperienceDelete'
import { useParams } from 'react-router-dom'

export default function CvDetail() {

    let id = useParams()

    const [cvList, setCvList] = useState([])

    useEffect(() => {
        let cvService = new CvService()
        cvService.getByCandidateId(id).then(result=>setCvList(result.data.data))
    }, [id])

    return (
        <div>
        <Segment color="blue">
            {cvList.map((cv) => (
                <Grid textAlign="left">
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Segment>
                                <Image centered src={cv.image} style={{ width: "255px", height: "255px", objectFit: "cover" }} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Segment textAlign="left">
                                <Header size="small">Ad: {cv.candidateFirstName}</Header>
                                <Header size="small">Soyad: {cv.candidateLastName}</Header>
                                <Header size="small">Biyografi:</Header>
                                <Header.Content>{cv.description}</Header.Content>
                                <Menu widths="2">
                                    <Menu.Item href={cv.githubLink} target={"_blank"}><Icon size="large" name="github" /></Menu.Item>
                                    <Menu.Item href={cv.linkedinLink} target={"_blank"}><Icon size="large" name="linkedin" /></Menu.Item>
                                </Menu>
                                <Menu widths="2">
                                    <Menu.Item><CvAdd /></Menu.Item>
                                    <Menu.Item><CvUpdate cv={cv}/></Menu.Item>
                                </Menu>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header textAlign="left">Teknolojiler</Header>
                            <Segment>
                                {cv.technologies.map(technology => (
                                       <Item.Group key={technology.id}>
                                           <Item>
                                               <Item.Content><Label color="blue">{technology.techName}</Label></Item.Content>
                                               <TechnologyUpdate cvId={cv?.cvId} technology={technology} />
                                               <TechnologyDelete technology={technology} />
                                            </Item>
                                        </Item.Group>
                                ))}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header textAlign="left">Diller</Header>
                            <Segment>
                                {cv.languages.map(language => (
                                    <Label key={language.id} size="large" >
                                        {language.language}<br />
                                        <Rating disabled defaultRating={language.level} maxRating={3} />
                                        <LanguageUpdate cvId={cv?.cvId} language={language} />
                                        <LanguageDelete language={language} />
                                    </Label>
                                ))}
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header textAlign="left">İş Tecrübeleri</Header>
                                {cv.jobExperiences.map(jobExperience => (
                                    <Segment key={jobExperience.id}>
                                        <Item.Group>
                                            <Item >
                                                <Item.Content >
                                                    <Item.Header >{jobExperience.companyName}</Item.Header>
                                                    <Divider />
                                                    <Item.Meta >{jobExperience.jobPosition?.jobTitle}</Item.Meta>
                                                    <Item.Description>Başladığı tarih: {jobExperience.startDate}</Item.Description>
                                                    {jobExperience.exitDate == null ? <Item.Description>Devam ediyor</Item.Description> : 
                                                    <Item.Description>İş çıkış tarihi: {jobExperience.exitDate}</Item.Description>}
                                                </Item.Content>
                                                <JobExperienceUpdate cvId={cv?.cvId} jobExperience={jobExperience} />
                                                <JobExperienceDelete jobExperience={jobExperience} />
                                            </Item>
                                        </Item.Group>
                                    </Segment>
                                ))}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header textAlign="left">Eğitim bilgileri</Header>
                                {cv.educations.map(education => (
                                    <Segment key={education.id}>
                                        <Item.Group>
                                            <Item >
                                                <Item.Content>
                                                    <Item.Header >{education.schoolName}</Item.Header>
                                                    <Divider />
                                                    <Item.Description >{education.department}</Item.Description>
                                                    <Item.Description >{education.graduate?.description}</Item.Description>
                                                    <Item.Description>Başladığı tarih: {education.startDate}</Item.Description>
                                                    {education.endDate == null ? <Item.Description>Devam ediyor</Item.Description> : 
                                                    <Item.Description>Mezuniyet tarihi: {education.endDate}</Item.Description>}
                                                </Item.Content>
                                                <EducationUpdate cvId={cv?.cvId} education={education} />
                                                <EducationDelete education={education} />
                                            </Item>
                                        </Item.Group>
                                    </Segment>
                                ))}
                        </Grid.Column>
                    </Grid.Row> 
                </Grid>
                 ))}
        </Segment>
    </div >
    )
}