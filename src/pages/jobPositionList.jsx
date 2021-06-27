import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import JobPositionService from "../services/jobPositionService";

export default function JobPositionList() {
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  function handleChange(e) {
    console.log(e.target.value);
  }

  let jobPositionOption = jobPositions.map((jobPosition) => ({
    key: jobPosition.id,
    text: jobPosition.jobTitle,
    value: jobPosition.id,
  }));

  return (
    <div>
      <h4 style={{fontWeight:"bold", color:"teal"}}>Pozisyon</h4>
        <Dropdown
          search
          clearable
          icon="search"
          iconPosition="left"
          className="search"
          placeholder="Pozisyon Seçiniz..."
          fluid
          selection
          onChange={handleChange}
          options={jobPositionOption}
        />
      
    </div>
  );
}
