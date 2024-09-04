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
  created_at: "2024-09-04T09:20:05.425574Z",
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
  const [postData, setPostData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const images = e.target.value;
    setPostData((prevFormData) => ({
      ...prevFormData,
      images: images,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `sites/get/site/`,
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
          setPostData(response?.data);
        } else {
          console.error("Fetch error:", response);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchData();
  }, []);

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
            // Authorization: `Bearer ${
            //   JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            // }`,
          },
          method: "POST",
          body: formDataToSend,
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        console.log("Success");
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("Error");
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
            {threads.map((thread) => (
              <Card key={thread.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Avatar sx={{ mr: 1 }}>{thread.author[0]}</Avatar>
                    <Typography variant="subtitle1">{thread.author}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      {thread.time} • in {thread.category}
                    </Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {thread.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {thread.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton size="small">
                    <BookmarkIcon />
                  </IconButton>
                  <IconButton size="small">
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {thread.likes}
                  </Typography>
                  <IconButton size="small">
                    <CommentIcon />
                  </IconButton>
                  <Typography variant="body2">{thread.comments}</Typography>
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
