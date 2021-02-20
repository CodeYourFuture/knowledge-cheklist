import React from "react";

export default function CityDropDownOptions({ city, handleChange }) {
  const cityDropDown = () => {
    if (city === "london") {
      return (
        <>
          <label for="userClassId">Choose a Class</label>
          <select name="userClassId" onChange={handleChange}>
            <option value="select">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </>
      );
    }
    if (city === "manchester") {
      return (
        <>
          <label for="userClassId">Choose a Class</label>
          <select name="userClassId" onChange={handleChange}>
            <option value="select">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
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
        <option value="london">London</option>
        <option value="manchester">Manchester</option>
      </select>
      {cityDropDown()}
    </div>
  );
}
