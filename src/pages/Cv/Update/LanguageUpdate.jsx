import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import LanguageService from '../../../services/languageService';
import { Form, Modal, Button } from "semantic-ui-react";
import { toast } from 'react-toastify';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';

export default function LanguageUpdate({cvId, language}) {
    
    const [open, setOpen] = useState(false);
    
    const initialValues = {
        id: language.id,
        cvId: cvId,
        languageName: language.languageName,
        level: language.level
    };

    const validationSchema = Yup.object({
        languageName:Yup.string().required("Dil seçimi boş bırakılamaz"),
        level:Yup.string().required("Derece seçimi boş bırakılamaz")
    });

    const handleOnSubmit = (values) => {
        let languageModal = {
            id: language.id,
            cvId: values.cvId,
            langaugeName: values.languageName,
            level: values.level
        }
        let languageService = new LanguageService()
        languageService.update(languageModal).then(result => result.data.data)
        toast.success("Dil bilgisi güncellendi")
        setOpen(false)
        window.location.reload(2000)
    }
  
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
              onSubmit = {(values) => handleOnSubmit(values)}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
              <Form.Field>
                  <HrmsTextInput name="languageName" placeholder="Dil"/> 
              </Form.Field>
              <Form.Field>
                  <HrmsTextInput name="level" placeholder="Derece"/> 
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