import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Input,
} from "@mui/material";
import {
  Add as AddIcon,
  Bookmark as BookmarkIcon,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
} from "@mui/icons-material";
import ajaxCall from "../../../helpers/ajaxCall";

const initialData = {
  images: [],
  likes: [],
  comments: [],
  shares: [],
  content: "",
  created_at: new Date().toISOString(),
  allow_likes: true,
  allow_comments: true,
  allow_sharing: true,
  author: 1,
  category: 1,
};

const MainContent = ({
  tabValue,
  handleTabChange,
  threads,
  recommendedTopics,
  events,
  initiatives,
  suggestedAlumni,
}) => {
  const [gettingData, setGettingData] = useState([]);
  const [postData, setPostData] = useState(initialData);
  const [refreshData, setRefreshData] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const images = e.target.files;
    setPostData((prevFormData) => ({
      ...prevFormData,
      images: images,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await ajaxCall(
        `posts/posts/`,
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
        // Ensure the data is in array format
        const data = Array.isArray(response?.data)
          ? response.data
          : [response.data];
        setGettingData(data);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("content", postData.content);
    formDataToSend.append("images", postData.images);
    formDataToSend.append("category", postData.category);
    formDataToSend.append("author", postData.author);
    formDataToSend.append("allow_likes", postData.allow_likes);
    formDataToSend.append("allow_comments", postData.allow_comments);
    formDataToSend.append("allow_sharing", postData.allow_sharing);

    try {
      const response = await ajaxCall(
        "posts/posts/",
        {
          headers: {
            Accept: "application/json",
          },
          method: "POST",
          body: formDataToSend,
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        console.log("Success");
        setRefreshData((prev) => !prev);
        setPostData({ initialData });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const differenceInSeconds = Math.floor((now - postTime) / 1000);

    const minutes = Math.floor(differenceInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `posted ${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `posted ${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `posted ${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "posted just now";
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              variant="outlined"
              name="content"
              value={postData.content}
              onChange={handleChange}
              placeholder="Add Post"
              sx={{ mb: 2, backgroundColor: "white" }}
            />
            <Input
              size="small"
              id="upload-document"
              name="images"
              type="file"
              onChange={handleFileChange}
              sx={{ mb: 2, backgroundColor: "white" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Button variant="contained" startIcon={<AddIcon />} type="submit">
                Add Post
              </Button>
            </Box>
          </form>
          <Paper sx={{ p: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{ mb: 2 }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Recent Thread" />
              <Tab label="Popular This Week" />
              <Tab label="Saved" />
            </Tabs>
            {Array.isArray(gettingData) &&
              gettingData.map((data) => (
                <Card key={data.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Avatar sx={{ mr: 1 }}>{data.author[0]}</Avatar>
                      <Typography variant="subtitle1">{data.author}</Typography>
                      <Typography
                        variant="body2"
                        sx={{ ml: 1, color: "text.secondary" }}
                      >
                        {timeAgo(data.created_at)} • {data.category}
                      </Typography>
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {data.title}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {data.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton size="small">
                      <BookmarkIcon />
                    </IconButton>
                    <IconButton size="small">
                      <FavoriteIcon />
                    </IconButton>
                    <Typography variant="body2" size="small">
                      {data.likes}
                    </Typography>
                    <IconButton size="small">
                      <CommentIcon />
                    </IconButton>
                    <Typography variant="body2">{data.comments}</Typography>
                  </CardActions>
                </Card>
              ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recommended Topics
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {recommendedTopics.map((topic) => (
                <Chip key={topic} label={topic} sx={{ m: 0.5 }} />
              ))}
            </Box>
          </Paper>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              {events.map((event) => (
                <ListItem key={event.id}>
                  <ListItemText primary={event.title} secondary={event.date} />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Current Initiatives
            </Typography>
            <List>
              {initiatives.map((initiative) => (
                <ListItem key={initiative.id}>
                  <ListItemText
                    primary={initiative.title}
                    secondary={initiative.description}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              People You May Know
            </Typography>
            <List>
              {suggestedAlumni.map((alumni) => (
                <ListItem key={alumni.id}>
                  <ListItemAvatar>
                    <Avatar>{alumni.name[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={alumni.name}
                    secondary={`Class of ${alumni.graduationYear}`}
                  />
                  <Button variant="outlined" size="small">
                    Connect
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainContent;
