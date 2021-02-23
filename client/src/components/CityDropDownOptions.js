import React from "react";

export default function CityDropDownOptions({ city, handleChange }) {
  const cities = {
    "Cape Town": [1, 2, 3],
    London: [1, 2, 3, 4, 5, 6, 7],
    "North West": [1, 2, 3, 4],
    Rome: [1, 2, 3],
    Scotland: [1, 2, 3, 4, 5],
    "West Midlands": [1, 2, 3, 4],
  };
  console.log(city);
  const cityDropDown = () => {
    if (city) {
      return (
        <>
          <label for="userClassId">Choose a Class</label>
          <select
            className="style-select"
            name="userClassId"
            onChange={handleChange}
          >
            <option value="select">Select</option>
            {cities[city].map((cohort, index) => (
              <option key={index} value={cohort}>
                {cohort}
              </option>
            ))}
          </select>
        </>
      );
    }
  };

  return (
    <>
      <label for="cyfCity">Location</label>
      <select className="style-select" name="cyfCity" onChange={handleChange}>
        <option value="select"> Select </option>

        {Object.keys(cities).map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

      {cityDropDown()}
    </>
  );
}
