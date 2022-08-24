import React from "react";
import { AppBar, Paper, Toolbar, Typography } from "@mui/material";

export default function SubjectBar({ text }) {
  return (
    <AppBar sx={{ display: "contents" }}>
      <Toolbar
        sx={{
          backgroundColor: "#1a1a1a",
          borderRadius: "4px 4px 0 0",
        }}
      >
        <Typography variant="h7" component="div">
          {text}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
