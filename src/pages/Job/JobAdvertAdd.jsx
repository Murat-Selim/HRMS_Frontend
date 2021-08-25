import React, { useEffect, useState } from "react";
import JobPositionService from "../../services/jobPositionService";
import JobAdvertService from "../../services/jobAdvertService";
import WorkTimeService from "../../services/workTimeService";
import WorkPlaceService from "../../services/workPlaceService";
import CityService from "../../services/cityService";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Card, FormField, FormGroup, Form, Dropdown } from "semantic-ui-react";
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput";
import HrmsTextArea from "../../utilities/customFormControls/HrmsTextArea";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import "moment/locale/tr";

export default function JobAdvertAdd() {
  
  moment.locale("tr");

  const history = useHistory();

  const [jobPositions, setJobPosition] = useState([]);
  const [cities, setCities] = useState([]);
  const [workTimes, setWorkTime] = useState([]);
  const [workPlaces, setWorkPlace] = useState([]);

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    let cityService = new CityService();
    let workTimeService = new WorkTimeService();
    let workPlaceService = new WorkPlaceService();
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPosition(result.data.data));
    cityService.getCities().then((result) => setCities(result.data.data));
    workPlaceService
      .getWorkPlaces()
      .then((result) => setWorkPlace(result.data.data));
    workTimeService
      .getWorkTimes()
      .then((result) => setWorkTime(result.data.data));
  }, []);

  let workTimeOption = workTimes.map((workTime, index) => ({
    key: index,
    text: workTime.name,
    value: workTime.id,
  }));

  let workPlaceOption = workPlaces.map((workPlace, index) => ({
    key: index,
    text: workPlace.name,
    value: workPlace.id,
  }));

  let cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));

  let jobPositionOption = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.jobTitle,
    value: jobPosition.id,
  }));

  const initialValues = {
    createdDate: new Date(),
    applicationDeadline: new Date(),
    numberOfOpenPosition: "",
    jobDescription: "",
    minSalary: "",
    maxSalary: "",
    jobPositionId: "",
    workPlaceId: "",
    workTimeId: "",
    cityId: "",
  };

  const validateSchema = Yup.object().shape({
    createdDate: Yup.date().required("Zorunlu Alan"),
    applicationDeadline: Yup.date().required("Zorunlu Alan"),
    numberOfOpenPosition: Yup.number().required("Zorunlu Alan"),
    jobDescription: Yup.string().required("Zorunlu Alan"),
    minSalary: Yup.number().required("Zorunlu Alan"),
    maxSalary: Yup.number().required("Zorunlu Alan"),
    jobPositionId: Yup.string().required("Zorunlu Alan"),
    workPlaceId: Yup.string().required("Zorunlu Alan"),
    workTimeId: Yup.string().required("Zorunlu Alan"),
    cityId: Yup.string().required("Zorunlu Alan"),
  });

  const handleSubmit = (values) => {
    values.employerId = 24; // Session tamamlandığında employer değerini sessiondan alacak...
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .addJobAdvert(values)
      .then((result) => {
      console.log(result.data.message);
      history.push("/jobAdvertWaitingConfirm");
      toast.success("İş ilanı başarıyla eklendi, Personelin onayının ardından yayınlanacaktır.");    
      })
  };

  const handleOnChange = (prop, value, fieldName) => {
    prop.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header
            content="İş İlanı Formu"
            style={{ fontWeight: "bold", color: "teal" }}
          />
          </Card.Content>
          <Card.Content extra>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={(values) => {
              handleSubmit(values)
            }}
          >
            {(formikprops) => (
              <Form onSubmit={formikprops.handleSubmit} className="ui form">
                
                <FormField>
                  <HrmsTextInput type="number" name="numberOfOpenPosition" placeholder="Açık Pozisyon Adedi"/>
                </FormField>

                 <FormGroup widths="equal">
                  <FormField>
                    <HrmsTextInput type="number" min="0" name="minSalary" placeholder="Min Maaş"/>
                  </FormField>

                  <FormField>
                    <HrmsTextInput type="number" min="0" name="maxSalary" placeholder="Maks Maaş"/>
                  </FormField>
                </FormGroup>

                <FormGroup widths="equal">
                  <FormField>
                  <Dropdown
                    selection
                    clearable
                    name="cityId"
                    placeholder="Şehir Seçiniz"
                    onChange={(event, data) =>
                      handleOnChange(formikprops, data.value, "cityId")
                    }
                    onBlur={formikprops.onBlur}
                    value={formikprops.values.cityId}
                    options={cityOption}
                  />
                  {formikprops.errors.cityId && formikprops.touched.cityId && (
                    <div className={"ui pointing red basic label"}>
                      {formikprops.errors.cityId}
                    </div>
                  )}
                  </FormField>

                  <FormField>
                  <Dropdown
                    selection
                    clearable
                    name="jobPositionId"
                    placeholder="İş Pozisyonu Seçiniz"
                    onChange={(event, data) =>
                      handleOnChange(formikprops, data.value, "jobPositionId")}
                    onBlur={formikprops.onBlur}
                    value={formikprops.values.jobPositionId}
                    options={jobPositionOption}
                  />
                  {formikprops.errors.jobPositionId && formikprops.touched.jobPositionId && (
                      <div className={"ui pointing red basic label"}>
                        {formikprops.errors.jobPositionId}
                      </div>
                    )}
                  </FormField>
                </FormGroup>

                <FormGroup widths="equal">
                 <FormField>
                   <Dropdown
                    selection
                    clearable
                    name="workTimeId"
                    placeholder="Çalışma Zamanı Seçiniz"
                    onChange={(event, data) =>
                      handleOnChange(formikprops, data.value, "workTimeId")}                    
                    onBlur={formikprops.onBlur}
                    value={formikprops.values.workTimeId}
                    options={workTimeOption}
                  />
                  {formikprops.errors.workTimeId && formikprops.touched.workTimeId && (
                      <div className={"ui pointing red basic label"}>
                        {formikprops.errors.workTimeId}
                      </div>
                    )}
                  </FormField>

                  <FormField>
                  <Dropdown
                    selection
                    clearable
                    name="workPlaceId"
                    placeholder="Çalışma Yeri Seçiniz"
                    onChange={(event, data) =>
                      handleOnChange(formikprops, data.value, "workPlaceId")}
                    onBlur={formikprops.onBlur}
                    value={formikprops.values.workPlaceId}
                    options={workPlaceOption}
                  />
                  {formikprops.errors.workPlaceId && formikprops.touched.workPlaceId && (
                      <div className={"ui pointing red basic label"}>
                        {formikprops.errors.workPlaceId}
                      </div>
                    )}
                  </FormField>
                </FormGroup>

                <FormGroup widths="equal">
                  <FormField>
                    <HrmsTextInput type="date" name="createdDate" placeholder="YYYY-AA-GG"/>
                  </FormField> 

                  <FormField>
                    <HrmsTextInput type="date" name="applicationDeadline" placeholder="YYYY-AA-GG"/>
                  </FormField>
                </FormGroup>

                <FormField>
                  <HrmsTextArea style={{ height: "100px" }} name="jobDescription" placeholder="Açıklama"/>
                </FormField>
                
                <FormField>
                  <Button color="green" type="submit">Yayınla</Button>
                </FormField>
                
              </Form>
            )}
          </Formik>
          </Card.Content>
      </Card>
    </div>
  );
}
