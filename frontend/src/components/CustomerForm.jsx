import React, { useState } from "react";
import { createCustomer } from "../api/customerApi";
import Swal from "sweetalert2";

function CustomerForm({ onCustomerAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // allow numbers only
      const numericValue = value.replace(/[^0-9]/g, "");

      setFormData({
        ...formData,
        phone: numericValue.slice(0, 10),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    /* remove error while typing */
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createCustomer(formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
      });

      setErrors({});

      onCustomerAdded();

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Customer created successfully",
        confirmButtonColor: "#2563eb",
      });
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      }

      console.error(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Add Customer</h3>

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "input-error" : ""}
        />

        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />

        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          maxLength={10}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (
              !/[0-9]/.test(e.key) &&
              e.key !== "Backspace" &&
              e.key !== "Delete" &&
              e.key !== "Tab" &&
              e.key !== "ArrowLeft" &&
              e.key !== "ArrowRight"
            ) {
              e.preventDefault();
            }
          }}
          className={errors.phone ? "input-error" : ""}
        />

        {errors.phone && <p className="error-text">{errors.phone}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default CustomerForm;
