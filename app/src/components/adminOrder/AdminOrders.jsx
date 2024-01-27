import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/order");
      const newOrders = res.data.map((order, index) => ({
        id: index + 1,
        orderId: order._id,
        userId: order.userId,
        email: order.email,
        pizzaId: order.pizzaId,
        status: order.status,
      }));

      setOrders(newOrders);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "orderId",
      headerName: "Order ID",
      width: 250,
      editable: true,
    },
    {
      field: "userId",
      headerName: "User ID",
      width: 250,
      editable: true,
    },
    {
      field: "email",
      headerName: "User Email",
      width: 250,
      editable: true,
    },
    {
      field: "pizzaId",
      headerName: "Pizza ID",
      width: 250,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <StatusCell {...params} handleChange={handleChange} />
      ),
    },
  ];

  const handleChange = (orderId) => async (event) => {
    try {
      const newStatus = event.target.value;

      const updatedOrders = orders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      await axios.put(`http://localhost:4000/api/order/update/${orderId}`, {
        status: newStatus,
      });

      console.log(`New status for order ${orderId}: ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const StatusCell = ({ value, row, handleChange }) => {
    const getStatusBackgroundColor = (status) => {
      switch (status) {
        case "received":
          return "#c8e6c9"; // Light green background for "received"
        case "in the kitchen":
          return "#ffcc80"; // Light orange background for "in the kitchen"
        case "sent to delivery":
          return "#81d4fa"; // Light blue background for "sent to delivery"
        default:
          return "transparent";
      }
    };

    return (
      <Select
        value={value}
        onChange={handleChange(row.orderId)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="" disabled>
          Select Status
        </MenuItem>
        {["received", "in the kitchen", "sent to delivery"].map((status) => (
          <MenuItem
            key={status}
            value={status}
            style={{ backgroundColor: getStatusBackgroundColor(status) }}
          >
            {status}
          </MenuItem>
        ))}
      </Select>
    );
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
