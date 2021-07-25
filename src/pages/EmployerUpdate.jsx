import React, { useState } from 'react'
import EmployerService from '../services/employerService';
import * as Yup from "yup";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import { Button, Modal, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

export default function EmployerUpdate({ employer }) {
    
    const [open, setOpen] = useState(false);

    const initialValues = {
      id:employer?.id,
      email:employer?.email,
      password:employer?.password,
      companyName:employer?.companyName,
      webAddress:employer?.webAddress,
      phoneNumber:employer?.phoneNumber,
      isActivated: true
    };

    const validationSchema = Yup.object({
      email:Yup.string().required("email boş bırakılamaz"),
      password:Yup.string().required("şifre boş bırakılamaz"),
      companyName:Yup.string().required("şirket ismi boş bırakılamaz"),
      webAddress:Yup.string().required("web adres boş bırakılamaz"),
      phoneNumber:Yup.string().required("Tel Numarası boş bırakılamaz")
    });

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button content="Güncelle" basic color="red"/>}
      >
        <Modal.Header>Bilgilerini Güncelle</Modal.Header>
        <Modal.Content>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit = {(values) => {
                let employerService = new EmployerService();
                employerService.updateEmployer(values)
                .then((result) => {
                console.log(result.data.message);
                toast.success("Bilgiler güncellendi!");
                })
              }}
          >
          {(handleSubmit) => (
            <Form onSubmit={handleSubmit} className="ui form">
               <Form.Field>
                    <HrmsTextInput name="companyName" placeholder="Şirket ismi" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput name="webAddress" placeholder="Web Site" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput type="number" name="phoneNumber" placeholder="Tel Numarası" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput name="email" placeholder="Email" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput name="password" placeholder="Şifre" />
               </Form.Field>
            <Modal.Actions>
              <Button content="Vazgeç" color="red" onClick={() => setOpen(false)}/>
              <Button content="Güncelle" type="submit" color="blue"/>
            </Modal.Actions>
          </Form>
          )}
          </Formik>
        </Modal.Content>
      </Modal>
    </div>
  );
}