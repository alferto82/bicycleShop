import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "../api/axios";

interface Part {
  id: number;
  name: string;
  type: string;
  price: number;
  inStock: boolean;
}

const AdminStock: React.FC = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get("/parts");
        setParts(response.data);
      } catch (error) {
        console.error("Error fetching parts:", error);
      }
    };

    fetchParts();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Stock
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>In Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((part) => (
                <TableRow
                  key={part.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell>{part.id}</TableCell>
                  <TableCell>{part.name}</TableCell>
                  <TableCell>{part.type}</TableCell>
                  <TableCell>${part.price}</TableCell>
                  <TableCell>{part.inStock ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={parts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AdminStock;
