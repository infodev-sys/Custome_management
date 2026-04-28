import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CustomerForm from "./components/CustomerForm";
import CustomerTable from "./components/CustomerTable";
import "./App.css";
import Swal from "sweetalert2";
import { getCustomers, deleteCustomer } from "./api/customerApi";

function App() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();

      setCustomers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This customer will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
     await deleteCustomer(id);

      await fetchCustomers();

      Swal.fire({
        title: "Deleted!",
        text: "Customer removed successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Delete failed",
        icon: "error",
      });

      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <CustomerForm onCustomerAdded={fetchCustomers} />

        <CustomerTable customers={customers} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
