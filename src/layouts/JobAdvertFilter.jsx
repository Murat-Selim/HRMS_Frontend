import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Divider, Form, Segment } from "semantic-ui-react";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import WorkPlaceService from "../services/workPlaceService";
import WorkTimeService from "../services/workTimeService";
import {addFilter, removeFilter} from "../store/actions/filterActions";

export default function JobAdvertFilter() {
  
    const dispatch = useDispatch()

    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const [workTimes, setWorkTimes] = useState([])
    const [workPlaces, setWorkPlaces] = useState([])

    const filters = useSelector(state => state.filter.filters)

    const workTimeOptions = []
    const workPlaceOptions = []

    useEffect(() => {
        let cityService = new CityService()
        cityService.getCities().then(result => setCities(result.data.data))

        let jobPositionService = new JobPositionService()
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data))

        let workTimeService = new WorkTimeService()
        workTimeService.getWorkTimes().then(result => setWorkTimes(result.data.data))

        let workPlaceService = new WorkPlaceService()
        workPlaceService.getWorkPlaces().then(result => setWorkPlaces(result.data.data))
    }, [])

    workTimes.map(workTime =>
        workTimeOptions.push({
            key: workTime.id,
            text: workTime.name,
            value: workTime.id
        })
    )

    workPlaces.map(workPlace =>
        workPlaceOptions.push({
            key: workPlace.id,
            text: workPlace.name,
            value: workPlace.id
        })
    )

    let cityOptions = cities.map((city) => ({
      key: city.id,
      text: city.name,
      value: city.id,
    }));

    let jobPositionOptions = jobPositions.map((jobPosition) => ({
      key: jobPosition.id,
      text: jobPosition.jobTitle,
      value: jobPosition.id,
    }));

    const formik = useFormik({
        initialValues: {
            workPlaceId: filters.workPlaceId,
            workTimeId: filters.workTimeId,
            cityId: filters.cityId,
            jobPositionId: filters.jobPositionId
        },
        
        onSubmit: (values) => {
            dispatch(addFilter(values))
            console.log(values)
        },
    })

    function handleRemoveFilters() {
        dispatch(removeFilter())
        formik.resetForm(formik.values)
    }

  return (
    <div>
      <Card fluid color="green">
          <h2 style={{fontWeight:"bold", color:"green"}}>Filtreler</h2>
      </Card>
      
      <Card fluid color="teal">
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
              <Segment color="blue">
                <h4 style={{fontWeight:"bold", color:"teal"}}>Şehir</h4>
                <Form.Dropdown
                  multiple
                  search
                  clearable
                  icon="search"
                  iconPosition="left"
                  className="search"
                  placeholder="Şehir Seçiniz..."
                  fluid
                  selection
                  options={cityOptions}
                  onChange={(e, { value }) => {
                    formik.setFieldValue(
                        "cityId",
                        formik.values.cityId.includes(value)
                            ? [...formik.values.cityId.filter((i) => i !== value)]
                            : value
                    )
                  }}
                />
              </Segment>
              
              <Divider />
              
              <Segment color="blue">
                <h4 style={{fontWeight:"bold", color:"teal"}}>Pozisyon</h4>
                <Form.Dropdown
                  multiple
                  search
                  clearable
                  icon="search"
                  iconPosition="left"
                  className="search"
                  placeholder="Pozisyon Seçiniz..."
                  fluid
                  selection
                  options={jobPositionOptions}
                  onChange={(e, { value }) => {
                    formik.setFieldValue(
                        "jobPositionId",
                        formik.values.jobPositionId.includes(value)
                            ? [...formik.values.jobPositionId.filter((i) => i !== value)]
                            : value
                    )
                  }}
                />
              </Segment>

              <Divider />

              <Segment color="blue">
                <h4 style={{ fontWeight: "bold", color: "teal" }}>Çalışma Zamanı</h4>
                 {workTimeOptions.map((workTimeOption) => (
                   <Form.Checkbox
                      key={workTimeOption.key}
                      label={workTimeOption.text}
                      value={workTimeOption.value}
                      onChange={(e, { value }) => {
                        formik.setFieldValue(
                            "workTimeId",
                            formik.values.workTimeId.includes(value)
                                ? [...formik.values.workTimeId.filter((i) => i !== value)]
                                : [...formik.values.workTimeId, value]
                        )
                      }}
                   />
                 ))}
              </Segment>

              <Divider />

              <Segment color="blue">
                <h4 style={{fontWeight:"bold", color:"teal"}}>Çalışma Yeri</h4>
                 {workPlaceOptions.map((workPlaceOption) => (
                  <Form.Checkbox
                    key={workPlaceOption.key}
                    label={workPlaceOption.text}
                    value={workPlaceOption.value}
                    onChange={(e, { value }) => {
                      formik.setFieldValue(
                          "workPlaceId",
                          formik.values.workPlaceId.includes(value)
                              ? [...formik.values.workPlaceId.filter((i) => i !== value)]
                              : [...formik.values.workTimeId, value]
                      )
                    }}
                  />
                 ))}
              </Segment>

              <Divider />

              <Button type="submit" basic color="blue" onClick={formik.handleSubmit}>İŞ ARA</Button>
              <Button basic color="blue" onClick={handleRemoveFilters}>Filtreyi Kaldır</Button>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
