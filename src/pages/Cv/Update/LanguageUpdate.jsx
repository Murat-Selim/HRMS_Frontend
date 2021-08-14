import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup";
import LanguageService from '../../../services/languageService';
import { Form, Modal, Button, Label } from "semantic-ui-react";
import { toast } from 'react-toastify';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';

export default function LanguageUpdate({cvId, language}) {
    
    const [open, setOpen] = useState(false);
    
    const initialValues = {
        id: language.id,
        cvId: cvId,
        language: language.language,
        level: language.level
    };

    const validationSchema = Yup.object({
        language:Yup.string().required("Dil seçimi boş bırakılamaz"),
        level:Yup.string().required("Derece seçimi boş bırakılamaz")
    });

    const handleOnSubmit = (values) => {
        let languageModal = {
            id: language.id,
            cvId: cvId,
            langauge: values.language,
            level: values.level
        }
        let languageService = new LanguageService()
        languageService.update(languageModal).then(result => result.data.data)
        toast.success("Teknoloji bilgisi güncellendi")
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
              onSubmit = {() => handleOnSubmit()}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
              <Form.Field>
                  <Label basic>Dil</Label>
                  <HrmsTextInput name="language" placeholder="Dil"/> 
              </Form.Field>
              <Form.Field>
                  <Label basic>Derece</Label>
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