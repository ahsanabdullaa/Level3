import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import AdminNav from "../../components/adminNav";
import AdminSideBar from "../../components/adminSideBar/AdminSideBar";
import InventoryGrid from "../../components/adminInventoryGrid/InventoryGrid";
import AdminOrders from "../../components/adminOrder/AdminOrders";
import UpdateInventory from "../../components/adminUpdateInventory/UpdateInventory";

export default function Admin() {
  const [inventory, setInventory] = useState(true);
  const [updateInventory, setUpdateInventory] = useState(false);
  const [orders, setOrders] = useState(false);

  const handleComponents = (component) => {
    if (component === "inventory") {
      setInventory(true);
      setUpdateInventory(false);
      setOrders(false);
    } else if (component === "updateInventory") {
      setInventory(false);
      setUpdateInventory(true);
      setOrders(false);
    } else if (component === "orders") {
      setInventory(false);
      setUpdateInventory(false);
      setOrders(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ zIndex: 2 }}>
          <AdminNav />
        </Grid>
        <Grid item xs={2} sx={{ zIndex: 1 }}>
          <AdminSideBar handleComponents={handleComponents} />
        </Grid>
        <Grid item xs={10} sx={{ zIndex: 0 }}>
          {/* You can pass the state values to InventoryGrid or any other component as needed */}
          {inventory && <InventoryGrid />}
          {updateInventory && <UpdateInventory />}
          {orders && <AdminOrders />}
        </Grid>
      </Grid>
    </Box>
  );
}
