import React from "react";
import { useState } from "react";
import axios from "axios";

function NewLeagueForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    // do not navigate the browser on form submit
    event.preventDefault();
    await axios.post("https://ih-beers-api2.herokuapp.com/beers/new", formData);
    setFormData({
      name: "",
      tagline: "",
      description: "",
      first_brewed: "",
      brewers_tips: "",
      attenuation_level: 0,
      contributed_by: "",
    });
  };

  const handleChanges = (event) => {
    const { value, name } = event.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  };

  return (
    <div className="formContainer">
      <h1> Add new beer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="name">Name</label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label for="tagline">tagline</label>
          <Input
            id="tagline"
            name="tagline"
            value={formData.tagline}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label for="description">description</label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label for="first_brewed">first_brewed</label>
          <Input
            id="first_brewed"
            name="first_brewed"
            value={formData.first_brewed}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label for="brewers_tips">brewers_tips</label>
          <Input
            id="brewers_tips"
            name="brewers_tips"
            value={formData.brewers_tips}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label for="attenuation_level">attenuation_level</label>
          <Input
            id="attenuation_level"
            name="attenuation_level"
            value={formData.attenuation_level}
            type="number"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label for="contributed_by">contributed_by</label>
          <Input
            id="contributed_by"
            name="contributed_by"
            value={formData.contributed_by}
            type="text"
            onChange={handleChanges}
          />
        </div>
        <div>
          <button type="submit">Add new</button>
        </div>
      </form>
    </div>
  );
}

export default NewLeagueForm;
