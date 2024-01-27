import * as React from "react";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import NavBar from "../../components/navbar";
import ProgressBars from "../../components/progressBar";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 300,
  height: 400,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

export default function TrackOrder() {
  return (
    <div>
      <NavBar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <DemoPaper variant="elevation">
          <ProgressBars />
        </DemoPaper>
      </div>
    </div>
  );
}
