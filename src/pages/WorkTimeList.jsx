import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
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

  let workTimeOption = workTimes.map((workTime) => ({
    key: workTime.id,
    text: workTime.name,
    value: workTime.id,
  }));

  return (
    <div>
      <h4 style={{ fontWeight: "bold", color: "teal" }}>İş Zamanı</h4>
      <Dropdown
        search
        clearable
        icon="search"
        iconPosition="left"
        className="search"
        placeholder="İş Zamanı Seçiniz..."
        fluid
        selection
        options={workTimeOption}
        onChange={handleChange}
      />
    </div>
  );
}
