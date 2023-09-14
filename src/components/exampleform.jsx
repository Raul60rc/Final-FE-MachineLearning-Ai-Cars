import React, { useState } from "react";

export const CarSaleForm = () => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    condition: "",
    contactInfo: {
      name: "",
      phone: "",
      email: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        [parentKey]: {
          ...prevState[parentKey],
          [childKey]: value
        }
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Do something with the form data here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Car Sale Form</h2>
      {/* Car Details */}
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={formData.make}
        onChange={handleChange}
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
      />
      <input
        type="text"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="condition"
        placeholder="Condition"
        value={formData.condition}
        onChange={handleChange}
      />

      {/* Contact Info */}
      <input
        type="text"
        name="contactInfo.name"
        placeholder="Name"
        value={formData.contactInfo.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contactInfo.phone"
        placeholder="Phone"
        value={formData.contactInfo.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contactInfo.email"
        placeholder="Email"
        value={formData.contactInfo.email}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};