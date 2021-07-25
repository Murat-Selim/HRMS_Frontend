import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import EmployeeService from "../../services/employeeService";
import * as Yup from "yup";
import { toast } from "react-toastify";
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput";

export default function EmployeeUpdate({ employee }) {
 
    const [open, setOpen] = useState(false);

    const initialValues = {
      id:employee.id,
      email:employee.email,
      password:employee.password,
      firstName:employee.firstName,
      lastName:employee.lastName
    };

    const validationSchema = Yup.object({
      email:Yup.string().required("email boş bırakılamaz"),
      password:Yup.string().required("şifre boş bırakılamaz"),
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
                let employeeModal = {
                  id:employee.id,
                  email:values.email,
                  password:values.password,
                  firstName:values.firstName,
                  lastName:values.lastName
                }
                console.log(values)
                let employeeService = new EmployeeService();
                employeeService.updateEmployee(employeeModal)
                .then((result) => result.data.data)
                toast.success("Bilgiler güncellendi!");
              }}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
               <Form.Field>
                    <HrmsTextInput name="firstName" placeholder="İsim" />
               </Form.Field>
               <Form.Field>
                    <HrmsTextInput name="lastName" placeholder="Soyisim" />
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
