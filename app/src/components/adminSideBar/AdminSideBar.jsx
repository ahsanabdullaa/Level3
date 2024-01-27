import { React, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StoreIcon from "@mui/icons-material/Store";

const drawerWidth = 240;
function AdminSideBar(props) {
  const [inventory, setInventory] = useState(true);
  const [updateInventory, setUpdateInventory] = useState(false);
  const [orders, setOrders] = useState(false);

  const { handleComponents } = props;

  // Use a local function to handle the component state
  const handleSidebarClick = (component) => {
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

    // Call the handleComponents prop from the parent component
    handleComponents(component);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Toolbar />
      <List>
        <ListItem
          disablePadding
          onClick={() => handleSidebarClick("inventory")}
        >
          <ListItemButton>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Inventory" />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => handleSidebarClick("updateInventory")}
        >
          <ListItemButton>
            <ListItemIcon>
              <AddBusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Update Inventory" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={() => handleSidebarClick("orders")}>
          <ListItemButton>
            <ListItemIcon>
              <DeliveryDiningIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default AdminSideBar;
