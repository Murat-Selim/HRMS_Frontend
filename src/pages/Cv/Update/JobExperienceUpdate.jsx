import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from "yup";
import { Form, Modal, Button, Label, Message } from "semantic-ui-react";
import JobPositionService from '../../../services/jobPositionService';
import JobExperienceService from "../../../services/jobExperienceService";
import { toast } from 'react-toastify';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';

export default function JobExperienceUpdate({cvId, jobExperience}) {
    
    const [jobPositions, setJobPositions] = useState([])
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        let jobPositionService = new JobPositionService()
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data))
    }, [])

    const initialValues = {
        id: jobExperience.id,
        cvId: cvId,
        companyName: jobExperience.companyName,
        jobPositionId: jobExperience.jobPosition?.id,
        startDate: jobExperience.startDate,
        exitDate: jobExperience.exitDate,
    };

    const validationSchema = Yup.object({
        jobPositionId: Yup.string().required("İş pozisyonu boş bırakılamaz"),
        companyName: Yup.string().required("Şirket ismi boş bırakılamaz"),
        startDate: Yup.date().required("Başladığı tarih boş bırakılamaz"),
        exitDate: Yup.date().required("Çıkış tarihi boş bırakılamaz"),
    });

    const handleOnSubmit = (values) => {
        let jobExperienceModal = {
            id: jobExperience.id,
            cvId: cvId,
            jobPosition: {
                id: values.jobPositionId
            },
            companyName: values.companyName,
            startDate: values.startDate,
            exitDate: values.exitDate
        }
        let jobExperienceService = new JobExperienceService()
        jobExperienceService.update(jobExperienceModal).then(result => result.data.data)
        toast.success("İş tecrübesi güncellendi")
        setOpen(false)
        window.location.reload(2000)
    }
  
    const handleChangeSemantic = (prop, field, value) => {
        prop.setFieldValue(field, value);
    }

    const jobPositionOptions = jobPositions.map((jobPosition, index) => ({
        key: index,
        text: jobPosition.jobTitle,
        value: jobPosition.id
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
                <Form.Group widths={2}>
                   <Form.Field>
                        <Label basic>Şirket</Label>
                        <HrmsTextInput name="companyName" placeholder="Şirket"/> 
                   </Form.Field>
                   <Form.Field>
                        <Label basic>Job Position</Label>
                        <Form.Dropdown selection search value={formikprops.values.jobPositionId} placeholder="Select Job" options={jobPositionOptions} onChange={(event, data) => {
                                handleChangeSemantic("jobPositionId", data.value)}} />
                        {formikprops.errors.jobPositionId && formikprops.touched.jobPositionId ? (
                            <Message color="red">{formikprops.errors.jobPositionId}</Message>
                        ) : null}
                    </Form.Field>
                </Form.Group>
                <Form.Group widths={2}>
                    <Form.Field>
                        <Label basic>Started Date</Label>
                        <HrmsTextInput type="date" name="startDate" placeholder="YYYY-AA-GG"/>  
                    </Form.Field>
                    <Form.Field>
                        <Label basic>Exit Date</Label>
                        <HrmsTextInput type="date" name="exitDate" placeholder="YYYY-AA-GG"/>   
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