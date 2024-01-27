import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "ingredient",
    headerName: "Ingredient",
    width: 150,
    editable: true,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 150,
    editable: true,
  },
];

export default function InventoryGrid() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInventory = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/inventory");
      console.log(res.data);

      // Assuming res.data is an object with properties base, sauce, cheese, veggies
      setInventory([
        {
          id: 1,
          ingredient: "base",
          quantity: res.data.base,
        },
        {
          id: 2,
          ingredient: "sauce",
          quantity: res.data.sauce,
        },
        {
          id: 3,
          ingredient: "cheese",
          quantity: res.data.cheese,
        },
        {
          id: 4,
          ingredient: "veggies",
          quantity: res.data.veggies,
        },
      ]);

      setLoading(false); // Set loading to false once data is fetched
    } catch (err) {
      console.error(err);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {loading ? (
        // Show a loading indicator or placeholder content while data is being fetched
        <p>Loading...</p>
      ) : (
        <DataGrid
          rows={inventory}
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
