import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div>
      <h1>Bike List</h1>
      <div className="bike-list">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            width: 200,
            border: "1px solid #ccc",
            borderRadius: 8,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6">
            <Link to="/bikes">Bikes</Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Home;
