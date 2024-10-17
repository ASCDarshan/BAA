import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Container,
  CircularProgress,
  Paper,
  CardContent,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ajaxCall from "../../../helpers/ajaxCall";
import Breadcrumb from "../../../Ul/Breadcrumb";

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

const InitiativeData = () => {
  const { InitiativeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [InitiativesData, setInitiativesData] = useState([]);

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
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
    fetchData("initiatives/initiatives/", setInitiativesData);
  }, []);

  const selectedInitiatives = InitiativesData.find(
    (item) => item.id === Number(InitiativeId)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box>
        <Breadcrumb title="Initiatives" main="Dashboard" />
        <Paper
          elevation={3}
          sx={{
            backgroundColor: theme.palette.background.paper,
            mt: 2,
            p: 2,
            boxShadow: "0 4px 8px rgba(251, 166, 69, 0.5)",
          }}
        >
          <CardContent>
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="300px"
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                      {selectedInitiatives.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {selectedInitiatives.purpose}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Starts from : {formatDate(selectedInitiatives.start_date)}{" "}
                      to {formatDate(selectedInitiatives.end_date)} <br />
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Total Funds Required :{" "}
                      {selectedInitiatives.total_funds_required}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Total Funds Raised : {selectedInitiatives.current_funds}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </CardContent>
        </Paper>
      </Box>
    </Container>
  );
};

export default InitiativeData;
