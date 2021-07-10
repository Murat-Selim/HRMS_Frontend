import React, { useEffect, useState } from "react";
import { Checkbox, Segment } from "semantic-ui-react";
import WorkTimeService from "../services/workTimeService";

export default function WorkTimeList() {
  const [workTimes, setWorkTimes] = useState([]);

  useEffect(() => {
    let workTimeService = new WorkTimeService();
    workTimeService
      .getWorkTimes()
      .then((result) => setWorkTimes(result.data.data));
  }, []);

  function handleChange(e) {
    console.log(e.target.value);
  }

  return (
    <div>
      <Segment>
      <h4 style={{ fontWeight: "bold", color: "teal" }}>Çalışma Zamanı</h4>
      {workTimes.map((workTime)=>(
        <Checkbox
        key={workTime.id}
        value={workTime.id}
        label={workTime.name}
        onChange={handleChange}
        />
      ))}
      </Segment>
    </div>
  );
}
