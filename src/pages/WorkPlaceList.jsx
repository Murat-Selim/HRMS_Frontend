import React, { useEffect, useState } from "react";
import { Checkbox, Segment } from "semantic-ui-react";
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

  return (
   <div>
     <Segment>
      <h4 style={{fontWeight:"bold", color:"teal"}}>Çalışma Yeri</h4>
       {workPlaces.map((workPlace) => (
        <Checkbox
        key={workPlace.id}
        value={workPlace.id}
        label={workPlace.name}
        onChange={handleChange}
        />
       ))}
      
      </Segment>
   </div>
   );
}
