import React from "react";

function CustomerTable({ customers, onDelete }) {
  return (
    <div className="table-wrapper">
      <h3>Customer List</h3>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="4">No Customers Found</td>
            </tr>
          ) : (
            customers.map((customer, index) => (
              <tr
                key={customer.id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}
              >
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
