import { Formik } from 'formik'
import * as Yup from "yup";
import React, { useState } from 'react'
import { Form, Modal, Button, Segment, Image, Menu, Icon } from "semantic-ui-react";
import CvService from "../../../services/cvService";
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';
import HrmsTextArea from '../../../utilities/customFormControls/HrmsTextArea';
import LanguageAdd from "../Add/LanguageAdd";
import TechnologyAdd from "../Add/TechnologyAdd";
import EducationAdd from "../Add/EducationAdd";
import JobExperienceAdd from "../Add/JobExperienceAdd";
import { toast } from 'react-toastify';

export default function CvAdd() {
    
    const [imageFile, setImageFile] = useState("")

    const [open, setOpen] = useState(false);
    
    const initialValues = {
        candidateId: "",
        githubLink: "",
        linkedinLink: "",
        description: "",
        image: "",
        createdDate: "",
        updatedDate: ""
    };

    const validationSchema = Yup.object({
        githubLink: Yup.string().required("Github hesabı boş bırakılamaz"),
        linkedinLink: Yup.string().required("Linkedin hesabı boş bırakılamaz"),
        description: Yup.string().required("Açıklama kısmı boş bırakılamaz"),
        image: Yup.string().required("Resim alanı boş bırakılamaz"),
        createdDate: Yup.date().required("Oluşturma tarihi boş bırakılamaz"),
        updatedDate: Yup.date().required("Güncellenme tarihi boş bırakılamaz")
    });

    const handleOnSubmit = (values) => {
        let cvModal = {
            candidate: {
                id: 29
            },
            githubLink: values.githubLink,
            linkedinLink: values.linkedinLink,
            description: values.description,
            createdDate: values.createdDate,
            updatedDate: values.updatedDate,
            image: values.image
        }
        let cvService = new CvService()
        cvService.addCv(cvModal).then(result => result.data.data)
        cvService.saveImage(imageFile, 1).then(result=>result.data.data)
        toast.success("Cv bilgisi eklendi")
        setOpen(false)
        window.location.reload(2000)
    }
  
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button content="Ekle" color="blue" icon="pencil"/>}
      >
        <Modal.Header>Cv Ekle</Modal.Header>
        <Modal.Content>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit = {() => handleOnSubmit()}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
                   <Segment>
                        <Image
                            style={{ width: "170px", height: "170px", objectFit: "cover" }}
                            fluid
                        />
                        <Button fluid style={{ marginTop: "10px" }} icon="photo" >
                            <input id="file" name="file" type="file" onChange={(event) => {
                                setImageFile("file", event.currentTarget.files[0]);
                            }} />
                        </Button>
                    </Segment>
                <Form.Group widths="2">
                   <Form.Field>
                        <Icon name="github" size="big" />
                        <HrmsTextInput name="githubLink" placeholder="Github"/> 
                   </Form.Field>
                   <Form.Field>
                        <Icon name="linkedin" size="big" color="blue" />  
                        <HrmsTextInput name="linkedinLink" placeholder="linkedin"/> 
                   </Form.Field>
                </Form.Group>
                <Form.Group widths="2">
                   <Form.Field>
                        <HrmsTextInput type="date" name="createdDate" placeholder="YYYY-AA-GG"/> 
                   </Form.Field>
                   <Form.Field>
                        <HrmsTextInput type="date" name="updatedDate" placeholder="YYYY-AA-GG"/> 
                   </Form.Field>
                </Form.Group>
                   <Form.Field>
                        <HrmsTextArea style={{ height: "100px" }} name="description" placeholder="Biyografi"/> 
                   </Form.Field>
             <Modal.Actions>
                <Button content="Ekle" type="submit" color="blue"/>
                <Button content="Vazgeç" color="red" onClick={() => setOpen(false)}/>
              </Modal.Actions>
              
              <Menu widths={4}>
                    <Menu.Item><LanguageAdd /></Menu.Item>
                    <Menu.Item><TechnologyAdd /></Menu.Item>
                    <Menu.Item><EducationAdd /></Menu.Item>
                    <Menu.Item><JobExperienceAdd /></Menu.Item>
              </Menu>

            </Form>
          )}
          </Formik>
        </Modal.Content>
      </Modal>
    </div>
  );
}
  

