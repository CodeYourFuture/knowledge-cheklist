import React from "react";

export default function CityDropDownOptions({ city, handleChange }) {
  const cities = {
    "North-West": [1, 2, 3, 4],
    London: [1, 2, 3, 4, 5, 6, 7],
    Scotland: [1, 2, 3, 4, 5],
  };

  const cityDropDown = () => {
    if (city === "London") {
      return (
        <>
          <label for="userClassId">Choose a Class</label>
          <select name="userClassId" onChange={handleChange}>
            <option value="select">Select</option>
            {cities.London.map((cohort, index) => (
              <option key={index} value={cohort}>
                {cohort}
              </option>
            ))}
          </select>
        </>
      );
    }
    if (city === "North-West") {
      return (
        <>
          <label for="userClassId">Choose a Class</label>
          <select name="userClassId" onChange={handleChange}>
            <option value="select">Select</option>
            {cities["North-West"].map((cohort, index) => (
              <option key={index} value={cohort}>
                {cohort}
              </option>
            ))}
          </select>
        </>
      );
    }
    if (city === "Scotland") {
      return (
        <>
          <label for="userClassId">Choose a Class</label>
          <select name="userClassId" onChange={handleChange}>
            <option value="select">Select</option>
            {cities.Scotland.map((cohort, index) => (
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
    <div>
      <label for="cyfCity">City</label>
      <select name="cyfCity" onChange={handleChange}>
        <option value="select">Select</option>

        {Object.keys(cities).map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

      {cityDropDown()}
    </div>
  );
}
