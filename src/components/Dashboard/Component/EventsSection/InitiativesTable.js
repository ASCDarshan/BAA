import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  CardContent,
  Paper,
  createTheme,
} from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    background: {
      default: "#f0f2f5",
      paper: "#ffffff",
    },
  },
});

const InitiativesTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [InitiativesData, setInitiativesData] = useState([]);

  const columns = [
    {
      headerName: "Name",
      field: "name",
      width: 250,
    },
    {
      headerName: "Description",
      field: "purpose",
      width: 350,
    },
    {
      headerName: "Start Date",
      field: "start_date",
      width: 150,
    },
    {
      headerName: "End Date",
      field: "end_date",
      width: 150,
    },
  ];

  const fetchData = async (url, setData) => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
        setIsLoading(false);
      } else {
        console.error("Fetch error:", response);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData("initiatives/initiatives/", setInitiativesData);
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <CardContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : InitiativesData?.length > 0 ? (
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={InitiativesData}
              columns={columns}
              disableColumnFilter
              disableDensitySelector
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "evenRow"
                  : "oddRow"
              }
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </Box>
        ) : (
          <Typography
            color="error"
            sx={{ mt: 2 }}
            align="center"
            variant="h6"
            component="div"
          >
            No Initiatives Available !!
          </Typography>
        )}
      </CardContent>
    </Paper>
  );
};

export default InitiativesTable;
