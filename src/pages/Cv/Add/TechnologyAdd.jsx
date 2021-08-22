import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import TechnologyService from '../../../services/technologyService';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'semantic-ui-react';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';

export default function TechnologAdd({cvId}) {
    
    const [open, setOpen] = useState(false);
    
    const initialValues = {   
        id: "" ,
        cvId: cvId,
        techName: ""
    };

    const validationSchema = Yup.object({
        techName:Yup.string().required("Teknoloji ismi boş bırakılamaz")
    });

    const handleOnSubmit = (values) => {
        let technologyModal = {
            id: values.id,
            cvId: values.cvId,
            techName: values.techName
        }
        let technologyService = new TechnologyService()
        technologyService.add(technologyModal).then(result => result.data.data)
        console.log(technologyModal)
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
        <Modal.Header style={{textAlign: "center", color: "teal"}}>Teknoloji Ekle</Modal.Header>
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
                  <HrmsTextInput name="techName" placeholder="Teknoloji"/> 
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
