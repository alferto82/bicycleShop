import React, { useEffect } from "react";
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
  IconButton,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { RootState } from "../redux/store";
import {
  fetchParts,
  createPart,
  toggleStock,
  removePartAsync,
} from "../redux/slices/partSlice";

const AdminStock: React.FC = () => {
  const dispatch = useDispatch();
  const { parts, loading, error } = useSelector(
    (state: RootState) => state.parts
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    dispatch(fetchParts());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreatePart = async () => {
    const newPart = {
      name: "New Part",
      type: "Type",
      category: "Category",
      price: 100,
      inStock: true,
    };
    dispatch(createPart(newPart));
  };

  const handleToggleStock = (id: number) => {
    dispatch(toggleStock(id));
  };

  const handleDeletePart = (id: number) => {
    dispatch(removePartAsync(id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Admin Stock
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreatePart}>
        Create Part
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>In Stock</TableCell>
              <TableCell>Actions</TableCell>
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
                  <TableCell>
                    <IconButton onClick={() => handleDeletePart(part.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleToggleStock(part.id)}>
                      {part.inStock ? <ToggleOffIcon /> : <ToggleOnIcon />}
                    </IconButton>
                  </TableCell>
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
