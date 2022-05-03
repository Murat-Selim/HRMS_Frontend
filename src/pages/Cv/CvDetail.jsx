import React, { useEffect, useState } from 'react'
import { Grid, Segment, Image, Header, Icon, Menu, Label, Rating, Divider, Item } from 'semantic-ui-react'
import CvService from '../../services/cvService'
import CvAdd from '../Cv/Add/CvAdd'
import LanguageAdd from "../Cv/Add/LanguageAdd";
import TechnologyAdd from "../Cv/Add/TechnologyAdd";
import EducationAdd from "../Cv/Add/EducationAdd";
import JobExperienceAdd from "../Cv/Add/JobExperienceAdd";
import CvUpdate from '../Cv/Update/CvUpdate'
import LanguageUpdate from '../Cv/Update/LanguageUpdate'
import TechnologyUpdate from '../Cv/Update/TechnologyUpdate'
import EducationUpdate from '../Cv/Update/EducationUpdate'
import JobExperienceUpdate from '../Cv/Update/JobExperienceUpdate'
import LanguageDelete from '../Cv/Delete/LanguageDelete'
import TechnologyDelete from '../Cv/Delete/TechnologyDelete'
import EducationDelete from '../Cv/Delete/EducationDelete'
import JobExperienceDelete from '../Cv/Delete/JobExperienceDelete'
import moment from "moment";
import "moment/locale/tr";

export default function CvDetail() {

    moment.locale("tr");

    const [cvList, setCvList] = useState([])

    useEffect(() => {
        let cvService = new CvService()
        cvService.getByCandidateId(29).then(result=>setCvList(result.data.data))
    }, [])

    return (
        <div>
        <Segment>
            <Segment inverted color="green">
               <Header textAlign="center">Özgeçmiş Bilgileri</Header>
            </Segment>
            {cvList.map((cv) => (    
                <Grid textAlign="left">
                    <Grid.Row>
                        <Grid.Column width={4}>
                                <Image circular centered src={cv.image} style={{ width: "255px", height: "255px", objectFit: "cover" }} />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Segment textAlign="left">
                                <Header size="small">İsim: {cv.candidateFirstName + " " + cv.candidateLastName}</Header>
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
                            <Segment>
                                <Header textAlign="left"><Icon name="code"/>Teknoloji Bilgisi</Header>
                                <Divider/>
                                {cv.technologies?.map(technology => (
                                    <Segment>
                                       <Item.Group key={technology.id}>
                                           <Item>
                                               <Item.Content><Label color="blue">{technology.techName}</Label></Item.Content>
                                               <TechnologyUpdate cvId={cv.id} technology={technology} />
                                               <TechnologyDelete technology={technology} />
                                           </Item>
                                        </Item.Group>
                                    </Segment>
                                ))}
                                <TechnologyAdd cvId={cv.id} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment>
                                <Header textAlign="left"><Icon name="language"/>Dil Bilgisi</Header>
                                <Divider/>
                                {cv.languages?.map(language => (
                                    <Segment>
                                        <Item.Group key={language.id}>
                                           <Item>
                                               <Item.Content>                                                   
                                                    <Label size="large">
                                                       {language.languageName}<br/><br/>
                                                       <Rating disabled defaultRating={language.level} maxRating={5} />
                                                    </Label>
                                               </Item.Content>
                                                <LanguageUpdate cvId={cv.id} language={language} />
                                                <LanguageDelete language={language} />                                              
                                            </Item>
                                        </Item.Group>                                       
                                    </Segment>
                                ))}
                                <LanguageAdd cvId={cv.id} />
                            </Segment>   
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>                           
                                <Segment>
                                    <Header textAlign="left"><Icon name="briefcase"/>İş Deneyimleri</Header>
                                    <Divider/>
                                    {cv.jobExperiences?.map(jobExperience => (
                                        <Segment>
                                           <Item.Group>
                                                <Item key={jobExperience.id}>
                                                    <Item.Content>
                                                        <Item.Header>{jobExperience.companyName}</Item.Header>
                                                        <Divider />
                                                        <Item.Description style={{color: "black"}}>{jobExperience.jobPosition?.jobTitle}</Item.Description>
                                                        <Item.Description>İşe başladığı tarih: {moment(jobExperience.startDate).startOf("day").fromNow()} </Item.Description>
                                                        {jobExperience.exitDate == null ? <Item.Description>Devam ediyor</Item.Description> : 
                                                        <Item.Description>İşten çıkış tarihi: {moment(jobExperience.exitDate).endOf("day").fromNow()}</Item.Description>}
                                                    </Item.Content>
                                                    <JobExperienceUpdate cvId={cv.id} jobExperience={jobExperience} />
                                                    <JobExperienceDelete jobExperience={jobExperience} />
                                                </Item>
                                            </Item.Group>
                                        </Segment>
                                    ))}
                                    <JobExperienceAdd cvId={cv.id} />
                               </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>                           
                                <Segment>
                                    <Header textAlign="left"><Icon name="graduation cap"/>Eğitim Bilgileri</Header>
                                    <Divider/>
                                    {cv.educations?.map(education => (
                                        <Segment>
                                            <Item.Group>
                                                <Item key={education.id}>
                                                    <Item.Content>
                                                        <Item.Header>{education.schoolName}</Item.Header>
                                                        <Divider />
                                                        <Item.Description>{education.department}</Item.Description>
                                                        <Item.Description>{education.graduate?.description}</Item.Description>
                                                        <Item.Description>Başlangıç tarihi: {moment(education.startDate).startOf("day").fromNow()}</Item.Description>
                                                        {education.endDate == null ? <Item.Description>Devam ediyor</Item.Description> : 
                                                        <Item.Description>Mezuniyet tarihi: {moment(education.endDate).endOf("day").fromNow()}</Item.Description>}
                                                    </Item.Content>
                                                    <EducationUpdate cvId={cv.id} education={education} />
                                                    <EducationDelete education={education} />
                                                </Item>
                                            </Item.Group>
                                        </Segment>                                    
                                    ))}
                                    <EducationAdd cvId={cv.id} />
                                </Segment>
                        </Grid.Column>
                    </Grid.Row> 
                </Grid>
            ))}
        </Segment>
    </div >
    )
}