import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import LanguageService from '../../../services/languageService';
import { Form, Modal, Button } from "semantic-ui-react";
import { toast } from 'react-toastify';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';

export default function LanguageAdd({cvId}) {
    
    const [open, setOpen] = useState(false);
    
    const initialValues = {
        id: "",
        cvId: cvId,
        languageName: "",
        level: ""
    };

    const validationSchema = Yup.object({
        languageName:Yup.string().required("Dil seçimi boş bırakılamaz"),
        level:Yup.string().required("Derece seçimi boş bırakılamaz")
    });

    const handleOnSubmit = (values) => {
        let languageModal = {
            id: values.id,
            cvId: values.cvId,
            langaugeName: values.languageName,
            level: values.level
        }
        let languageService = new LanguageService()
        languageService.add(languageModal).then(result => result.data.data)
        toast.success("Teknoloji bilgisi eklendi")
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
        <Modal.Header style={{textAlign: "center", color: "teal"}}>Dil Ekle</Modal.Header>
        <Modal.Content>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit = {(values) => handleOnSubmit(values)}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
              <Form.Field>
                  <HrmsTextInput name="language" placeholder="Dil"/> 
              </Form.Field>
              <Form.Field>
                  <HrmsTextInput name="level" placeholder="Derece"/> 
              </Form.Field>
             <Modal.Actions>
                <Button content="Kaydet" type="submit" color="blue"/>
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