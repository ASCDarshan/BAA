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
import { DataGrid } from "@mui/x-data-grid";
import Breadcrumb from "../../../Ul/Breadcrumb";
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
  const [batchMates, setBatchMates] = useState([]);
  const [searchYear, setSearchYear] = useState("");
  const [isYearSearchActive, setIsYearSearchActive] = useState(false);

  const columns = [
    {
      headerName: "Username",
      field: "username",
      width: 150,
      renderCell: (params) => {
        const userId = params?.row?.["user-id"];
        const username = params?.row?.username;
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
      valueGetter: (params) => params?.row?.username || " - ",
    },
    {
      headerName: "Phone Number",
      field: "phone_number",
      width: 150,
      valueGetter: (params) => params?.row?.phone_number || " - ",
    },
    {
      headerName: "Email",
      field: "email",
      width: 200,
      renderCell: (params) => {
        const email = params?.row?.email || " - ";
        return email;
      },
      valueGetter: (params) => params?.row?.email || " - ",
    },
    {
      headerName: "School Graduation Year",
      field: "school_graduation_year",
      width: 200,
      renderCell: (params) => {
        const year = params?.row?.school_graduation_year || " - ";
        return year;
      },
      valueGetter: (params) => params?.row?.school_graduation_year || " - ",
    },
    {
      headerName: "Education",
      field: "Education",
      width: 200,
      renderCell: (params) => {
        const education = params?.row?.Education || " - ";
        return education;
      },
      valueGetter: (params) => params?.row?.Education || " - ",
    },
  ];

  const fetchData = async (year = "", setData) => {
    setIsLoading(true);
    try {
      const url = year
        ? `profiles/year-user/?year=${year}`
        : "profiles/year-user/";
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
          response?.data?.filter(
            (user) =>
              user["user-id"] !== currentUserId &&
              user.user_type !== "Superuser"
          ) || [];
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
    if (!isYearSearchActive) {
      fetchData("", setBatchMates);
    }
  }, [isYearSearchActive]);

  const handleSearchChange = (e) => {
    const year = e.target.value;
    setSearchYear(year);

    if (year.length === 4) {
      setIsYearSearchActive(true);
      fetchData(year, setBatchMates);
    } else if (year.length === 0) {
      setIsYearSearchActive(false);
      fetchData("", setBatchMates);
    }
  };

  const rows = batchMates.map((BatchMate, index) => ({
    id: BatchMate["user-id"] || index,
    ...BatchMate,
  }));

  return (
    <>
      <Breadcrumb title="Batchmates" main="Dashboard" />
      <Paper
        elevation={3}
        sx={{
          backgroundColor: theme.palette.background.paper,
          mt: 2,
          boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            mb={2}
          >
            <TextField
              label="Search by Year"
              variant="outlined"
              value={searchYear}
              onChange={handleSearchChange}
              sx={{ width: 150 }}
              size="small"
            />
          </Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : batchMates?.length > 0 ? (
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
