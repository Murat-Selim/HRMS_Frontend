import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";
import CityService from "../services/cityService";

export default function CityList() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  }, []);

  function handleChange(e) {
    console.log(e.target.value);
  }

  let cityOption = cities.map((city) => ({
    key: city.id,
    text: city.name,
    value: city.id,
  }));

  return (
    <div>
      <h4 style={{fontWeight:"bold", color:"teal"}}>Şehir</h4>
      <Dropdown
        search
        clearable
        icon="search"
        iconPosition="left"
        className="search"
        placeholder="Şehir Seçiniz..."
        fluid
        selection
        options={cityOption}
        onChange={handleChange}
      />
    </div>
  );
}
