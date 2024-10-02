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

const EventTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState([]);

  const columns = [
    {
      headerName: "Name",
      field: "name",
      width: 250,
      renderCell: (params) => {
        const eventId = params?.row?.id;
        const name = params?.row?.name;
        return eventId ? (
          <Link
            to={`/dashboard/eventData/${eventId}`}
            style={{ textDecoration: "none" }}
          >
            {name}
          </Link>
        ) : (
          " - "
        );
      },
    },
    { headerName: "Start Date", field: "start_date", width: 170 },
    { headerName: "End Date", field: "end_date", width: 170 },
    { headerName: "Description", field: "description", width: 500 },
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
    }
  };

  useEffect(() => {
    fetchData("events/events/", setEventData);
  }, []);

  const rows = eventData.map((event, index) => ({
    id: event.id || index,
    ...event,
  }));

  return (
    <>
      <Breadcrumb title="Upcoming Events" main="Dashboard" />
      <Paper
        elevation={3}
        sx={{ backgroundColor: theme.palette.background.paper, mt: 2 }}
      >
        <CardContent>
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
              No Events Available !!
            </Typography>
          )}
        </CardContent>
      </Paper>
    </>
  );
};

export default EventTable;
