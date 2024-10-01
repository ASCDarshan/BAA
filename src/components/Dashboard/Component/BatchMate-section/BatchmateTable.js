import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  CardContent,
  Paper,
  TextField,
  createTheme,
} from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Breadcrumb from "../../../../Ul/Breadcrumb";
import { Link } from "react-router-dom";

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

const BatchmateTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [searchYear, setSearchYear] = useState("");

  const columns = [
    {
      headerName: "Username",
      field: "username",
      width: 150,
      renderCell: (params) => {
        const userId = params?.row?.user?.id;
        const username = params?.row?.user?.username;
        return userId ? (
          <Link
            to={`/dashboard/userProfile/${userId}`}
            style={{ textDecoration: "none" }}
          >
            {username}
          </Link>
        ) : (
          " - "
        );
      },
      valueGetter: (params) => params?.row?.user?.username || " - ",
    },
    {
      headerName: "Phone Number",
      field: "phone_number",
      width: 150,
      valueGetter: (params) => params?.row?.phone_number || " - ",
    },
    {
      headerName: "Batch Year",
      field: "school_graduation_year",
      width: 150,
      renderCell: (params) => {
        const email = params?.row?.school_graduation_year || " - ";
        return email;
      },
      valueGetter: (params) => params?.row?.school_graduation_year || " - ",
    },
    {
      headerName: "Email",
      field: "email",
      width: 200,
      renderCell: (params) => {
        const email = params?.row?.user?.email || " - ";
        return email;
      },
      valueGetter: (params) => params?.row?.user?.email || " - ",
    },
  ];

  const fetchData = async (year = "", setData) => {
    setIsLoading(true);
    try {
      const url = year
        ? `profiles/year-user/?year=${year}`
        : "profiles/user-profile/";
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
        const currentUserId = JSON.parse(
          localStorage.getItem("loginInfo")
        )?.userId;
        const filteredData =
          response?.data?.filter((user) => user.user.id !== currentUserId) ||
          [];
        setData(filteredData);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data without any filter
    fetchData("", setEventData);
  }, []);

  const handleSearchChange = (e) => {
    const year = e.target.value;
    setSearchYear(year);

    if (year.length === 4) {
      fetchData(year, setEventData); // Fetch data by year
    } else if (year.length === 0) {
      fetchData("", setEventData); // Fetch all data when input is cleared
    }
  };

  const rows = eventData.map((event, index) => ({
    id: event.id || index,
    ...event,
  }));

  return (
    <>
      <Breadcrumb title="Batchmates" main="Dashboard" />
      <Paper
        elevation={3}
        sx={{ backgroundColor: theme.palette.background.paper, mt: 2 }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <TextField
              label="Search by Year"
              variant="outlined"
              value={searchYear}
              onChange={handleSearchChange}
              sx={{ width: 200 }}
            />
          </Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : eventData?.length > 0 ? (
            <Box sx={{ height: "100%", width: "100%" }}>
              <DataGrid
                rows={rows}
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
                    showQuickFilter: false, // Disabling default DataGrid quick filter
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
              No Data Available !!
            </Typography>
          )}
        </CardContent>
      </Paper>
    </>
  );
};

export default BatchmateTable;
