import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import WorkPlaceService from "../services/workPlaceService";

export default function WorkPlaceList() {
  const [workPlaces, setWorkPlaces] = useState([]);

  useEffect(() => {
    let workPlaceService = new WorkPlaceService();
    workPlaceService
      .getWorkPlaces()
      .then((result) => setWorkPlaces(result.data.data));
  }, []);

  function handleChange(e) {
    console.log(e.target.value);
  }

  let workPlaceOption = workPlaces.map((workPlace) => ({
    key: workPlace.id,
    text: workPlace.name,
    value: workPlace.id,
  }));

  return (
   <div>
      <h4 style={{fontWeight:"bold", color:"teal"}}>İş Yeri</h4>
      <Dropdown
        search
        clearable
        icon="search"
        iconPosition="left"
        className="search"
        placeholder="İş Yeri Seçiniz..."
        fluid
        selection
        options={workPlaceOption}
        onChange={handleChange}
      />
   </div>
   );
}
