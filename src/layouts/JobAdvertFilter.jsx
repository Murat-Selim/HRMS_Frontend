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
    const jobPositionOptions = []
    const cityOptions = []

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
            label: workTime.name,
            value: workTime.id
        })
    )

    workPlaces.map(workPlace =>
        workPlaceOptions.push({
            key: workPlace.id,
            label: workPlace.name,
            value: workPlace.id
        })
    )

    cities.map(city =>
        cityOptions.push({
            key: city.id,
            text: city.name,
            value: city.id
        })
    )

    jobPositions.map(jobPosition =>
        jobPositionOptions.push({
            key: jobPosition.id,
            text: jobPosition.jobTitle,
            value: jobPosition.id
        })
    )

    const formik = useFormik({
        initialValues: {
            workPlaceId: filters.workPlaceId,
            workTimeId: filters.workTimeId,
            cityId: filters.cityId,
            jobPositionId: filters.jobPositionId
        },
        
        onSubmit: (values) => {
            dispatch(addFilter(values))
        },
    })

    function handleRemoveFilters() {
        dispatch(removeFilter())
        formik.resetForm(formik.values)
    }

    function handleChange(e) {
        formik.setFieldValue(e.target.value);
      }

  return (
    <div>
      <Card fluid color="green">
          <h2 style={{fontWeight:"bold", color:"green"}}>Filtreler</h2>
      </Card>
      <Card fluid color="teal">
        <Card.Content>
          <Form>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  options={jobPositionOptions}
                />
              </Segment>

              <Divider />

              <Segment color="blue">
                <h4 style={{ fontWeight: "bold", color: "teal" }}>Çalışma Zamanı</h4>
                 {workTimeOptions.map((workTimeOption) => (
                   <Form.Checkbox
                      key={workTimeOption.key}
                      label={workTimeOption.label}
                      value={workTimeOption.value}
                      onChange={handleChange}
                   />
                 ))}
        
              </Segment>

              <Divider />

              <Segment color="blue">
                <h4 style={{fontWeight:"bold", color:"teal"}}>Çalışma Yeri</h4>
                 {workPlaceOptions.map((workPlaceOption) => (
                  <Form.Checkbox
                    key={workPlaceOption.key}
                    value={workPlaceOption.value}
                    label={workPlaceOption.label}
                    onChange={handleChange}
                  />
                 ))}
              </Segment>

              <Divider />

              <Button basic color="blue" onClick={formik.handleSubmit}>İŞ ARA</Button>
              <Button basic color="blue" onClick={handleRemoveFilters}>Filtreyi Kaldır</Button>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
