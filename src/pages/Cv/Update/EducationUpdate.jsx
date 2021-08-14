import React, { useEffect, useState } from 'react';
import {Formik} from 'formik';
import * as Yup from "yup";
import EducationService from '../../../services/educationService';
import GraduateService from '../../../services/graduateService';
import { Form, Message, Modal, Button, Label} from "semantic-ui-react";
import { toast } from 'react-toastify';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';

export default function EducationUpdate({cvId, education}) {
    
    const [graduates, setGraduates] = useState([])
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        let graduateService = new GraduateService()
        graduateService.getAll().then(result => setGraduates(result.data.data))
    }, [])

    const initialValues = {
        id: education.id,
        cvId: cvId,
        graduateId: education.graduate?.id,
        schoolName: education.schoolName,
        department: education.department,
        startDate: education.startDate,
        endDate: education.endDate
    };

    const validationSchema = Yup.object({
        graduateId: Yup.string().required("Okul derecesi boş bırakılamaz"),
        schoolName: Yup.string().required("Okul ismi boş bırakılamaz"),
        department: Yup.string().required("Okul bölümü boş bırakılamaz"),
        startDate: Yup.date().required("Başladığı tarih boş bırakılamaz"),
        endDate: Yup.date().required("Bitirdiği tarih boş bırakılamaz"),
    });

    const handleOnSubmit = (values) => {
        let educationModal = {
            id: education.id,
            cvId: cvId,
            graduate: {
                id: values.graduateId
            },
            schoolName: values.schoolName,
            department: values.department,
            startDate: values.startDate,
            endDate: values.endDate
        }
        let educationService = new EducationService()
        educationService.update(educationModal).then(result => result.data.data)
        toast.success("Okul bilgisi güncellendi")
        setOpen(false)
        window.location.reload(2000)
    }
  
    const handleChangeSemantic = (prop, field, value) => {
        prop.setFieldValue(field, value);
    }

    const graduateOptions = graduates.map((graduate, index) => ({
        key: index,
        text: graduate.description,
        value: graduate.id
    }))

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button color="green" size="mini" icon="undo"/>}
      >
        <Modal.Header>Bilgilerini Güncelle</Modal.Header>
        <Modal.Content>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit = {() => handleOnSubmit()}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
                   <Form.Field>
                        <Label basic>Okul</Label>
                        <HrmsTextInput name="schoolName" placeholder="Okul"/> 
                   </Form.Field>
                <Form.Group widths={2}>
                   <Form.Field>
                        <Label basic>Okul Bölümü</Label>
                        <HrmsTextInput name="department" placeholder="Okul Bölümü"/> 
                   </Form.Field>
                   <Form.Field>
                        <Label basic>Okul Derecesi</Label>
                        <Form.Dropdown selection search value={formikprops.values.graduateId} placeholder="Okul Derecesi" options={graduateOptions} onChange={(event, data) => {
                                handleChangeSemantic("graduateId", data.value)}} />
                        {formikprops.errors.graduateId && formikprops.touched.graduateId ? (
                            <Message color="red">{formikprops.errors.graduateId}</Message>
                        ) : null}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Field>
                        <Label basic>Start Date</Label>
                        <HrmsTextInput type="date" name="startDate" placeholder="YYYY-AA-GG"/>  
                    </Form.Field>
                    <Form.Field>
                        <Label basic>End Date</Label>
                        <HrmsTextInput type="date" name="endDate" placeholder="YYYY-AA-GG"/>   
                    </Form.Field>
                </Form.Group>
              <Modal.Actions>
                <Button content="Güncelle" type="submit" color="blue"/>
                <Button content="Vazgeç" color="red" onClick={() => setOpen(false)}/>
              </Modal.Actions>
            </Form>
          )}
          </Formik>
        </Modal.Content>
      </Modal>
    </div>
  );
}