import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import TechnologyService from '../../../services/technologyService';
import { toast } from 'react-toastify';
import { Button, Form, Modal } from 'semantic-ui-react';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';

export default function TechnologyUpdate({cvId, technology}) {
    
    const [open, setOpen] = useState(false);
    
    const initialValues = {
        id: technology.id,
        cvId: cvId,
        techName: technology.techName
    };

    const validationSchema = Yup.object({
        techName:Yup.string().required("Teknoloji ismi boş bırakılamaz")
    });

    const handleOnSubmit = (values) => {
        let technologyModal = {
            id: technology.id,
            cvId: values.cvId,
            techName: values.techName
        }
        let technologyService = new TechnologyService()
        technologyService.update(technologyModal).then(result => result.data.data)
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
              onSubmit = {(values) => handleOnSubmit(values)}
          >
          {(formikprops) => (
            <Form onSubmit={formikprops.handleSubmit} className="ui form">
              <Form.Field>
                  <HrmsTextInput name="techName" placeholder="Teknoloji"/> 
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