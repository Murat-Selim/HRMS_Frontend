import React, { useState } from "react";
import EmployeeService from "../../services/employeeService";
import { Button, Form, Modal } from "semantic-ui-react";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput";

export default function EmployeeUpdate({ employee }) {
 
    const [open, setOpen] = useState(false);
    
    const initialValues = {
      id:employee.id,
      email:employee.email,
      password:employee.password,
      passwordRepeat: employee.passwordRepeat,
      firstName:employee.firstName,
      lastName:employee.lastName
    };

    const validationSchema = Yup.object({
      email:Yup.string().required("email boş bırakılamaz"),
      password:Yup.string().required("şifre boş bırakılamaz"),
      passwordRepeat:Yup.string().required("şifre tekrarı boş bırakılamaz"),
      firstName:Yup.string().required("ad boş bırakılamaz"),
      lastName:Yup.string().required("soyad boş bırakılamaz")
    });

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button content="Güncelle" color="green"/>}
      >
        <Modal.Header>Bilgilerini Güncelle</Modal.Header>
        <Modal.Content>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit = {(values) => {
                const {firstName, lastName, email, password, passwordRepeat} = values
                let data = {
                  id:employee.id,
                  firstName,
                  lastName,
                  email,
                  password,
                  passwordRepeat
                }
                let employeeService = new EmployeeService();
                employeeService.updateEmployee(data)
                toast.success("Bilgiler güncellendi!");
                setOpen(false)
                window.location.reload(2000)
              }}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
              <Form.Field>
                  <HrmsTextInput name="firstName" placeholder="Ad"/> 
              </Form.Field>
              <Form.Field>
                  <HrmsTextInput name="lastName" placeholder="Soyad"/>         
              </Form.Field>
              <Form.Field>
                  <HrmsTextInput name="email" placeholder="Email"/> 
              </Form.Field> 
              <Form.Field>
                  <HrmsTextInput name="password" placeholder="Şifre"/>    
              </Form.Field>
              <Form.Field>
                  <HrmsTextInput name="passwordRepeat" placeholder="Şifre Tekrarı"/>    
              </Form.Field>
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
