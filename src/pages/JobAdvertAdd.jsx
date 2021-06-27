import React, { useEffect, useState } from "react";
import JobPositionService from "../services/jobPositionService";
import JobAdvertService from "../services/jobAdvertService";
import WorkTimeService from "../services/workTimeService";
import WorkPlaceService from "../services/workPlaceService";
import CityService from "../services/cityService";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Button, Card, Grid } from "semantic-ui-react";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import HrmsTextArea from "../utilities/customFormControls/HrmsTextArea";
import HrmsTextSelect from "../utilities/customFormControls/HrmsTextSelect";

export default function JobAdvertAdd() {
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

  let workTimeOption = workTimes.map((workTime) => ({
    key: workTime.id,
    text: workTime.name,
    value: workTime.id,
  }));

  let workPlaceOption = workPlaces.map((workPlace) => ({
    key: workPlace.id,
    text: workPlace.name,
    value: workPlace.id,
  }));

  let cityOption = cities.map((city) => ({
    key: city.id,
    text: city.name,
    value: city.id,
  }));

  let jobPositionOption = jobPositions.map((jobPosition) => ({
    key: jobPosition.id,
    text: jobPosition.jobTitle,
    value: jobPosition.id,
  }));

  let validateSchema = yup.object().shape({
    createdDate: yup.date().required("Zorunlu Alan"),
    applicationDeadline: yup.date().required("Zorunlu Alan"),
    numberOfOpenPosition: yup.number().required("Zorunlu Alan"),
    jobDescription: yup.string().required("Zorunlu Alan"),
    minSalary: yup.number().required("Zorunlu Alan"),
    maxSalary: yup.number().required("Zorunlu Alan"),
    jobPositionId: yup.number().required("Zorunlu Alan"),
    workPlaceId: yup.number().required("Zorunlu Alan"),
    workTimeId: yup.number().required("Zorunlu Alan"),
    employerId: yup.number().required("Zorunlu Alan"),
    cityId: yup.number().required("Zorunlu Alan"),
  });

  const initialValues = {
    createdDate: "",
    applicationDeadline: "",
    numberOfOpenPosition: "",
    jobDescription: "",
    minSalary: "",
    maxSalary: "",
    jobPositionId: "",
    workPlaceId: "",
    workTimeId: "",
    employerId: "",
    cityId: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .addJobAdvert(values)
      .then((response) => console.log(response.data.message));

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header 
           content="İş İlanı Formu"
           style={{ fontWeight: "bold", color: "teal" }}
          />

          <hr/>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, { setSubmitting })
        }
      >
        <Form className="ui form">
          <Grid columns={1}>
            <Grid.Column>
              <HrmsTextInput
                type="number"
                min="0"
                name="employerId"
                placeholder="İş Veren Id"
              />
            </Grid.Column>
            <Grid.Column>
              <HrmsTextInput
                type="number"
                name="numberOfOpenPosition"
                placeholder="Açık Pozisyon Adedi"
              />
            </Grid.Column>
          </Grid>

          <Grid columns={2}>
            <Grid.Column width={8}>
              <HrmsTextInput
                type="number"
                min="0"
                name="minSalary"
                placeholder="Min Maaş"
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <HrmsTextInput
                type="number"
                min="0"
                name="maxSalary"
                placeholder="Maks Maaş"
              />
            </Grid.Column>
          </Grid>

          <Grid columns={2}>
            <Grid.Column width={8}>
              <HrmsTextSelect name="cityId" options={cityOption}>
                <option placeholder="Şehir seçiniz" defaultValue>
                  Şehir seçiniz
                </option>
              </HrmsTextSelect>
            </Grid.Column>
            <Grid.Column width={8}>
              <HrmsTextSelect name="jobPositionId" options={jobPositionOption}>
                <option placeholder="Pozisyon seçiniz" defaultValue>
                  Pozisyon seçiniz
                </option>
              </HrmsTextSelect>
            </Grid.Column>
          </Grid>

          <Grid columns={2}>
            <Grid.Column width={8}>
              <HrmsTextSelect name="workTimeId" options={workTimeOption}>
                <option placeholder="Çalışma Zamanı Seçiniz" defaultValue>
                  Çalışma Zamanı Seçiniz
                </option>
              </HrmsTextSelect>
            </Grid.Column>
            <Grid.Column width={8}>
              <HrmsTextSelect name="workPlaceId" options={workPlaceOption}>
                <option placeholder="Çalışma yerini seçiniz" defaultValue>
                  Çalışma yerini seçiniz
                </option>
              </HrmsTextSelect>
            </Grid.Column>
          </Grid>

          <Grid columns={2}>
            <Grid.Column width={8}>
              <HrmsTextInput
                type="date"
                name="createdDate"
                placeholder="Oluşturma tarihi"
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <HrmsTextInput
                type="date"
                name="applicationDeadline"
                placeholder="Bitiş tarihi"
              />
            </Grid.Column>
          </Grid>

           <Grid columns={1}>
            <Grid.Column>
              <HrmsTextArea
                name="jobDescription"
                placeholder="Açıklama"
              />
            </Grid.Column>
          </Grid>

          <Button color="green" type="submit">
            Ekle
          </Button>
        </Form>
      </Formik>
     </Card.Content>
    </Card>
   </div>
  );
}
