import React, { useEffect, useRef, useState } from "react";
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
  InputAdornment,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Add as AddIcon } from "@mui/icons-material";
import { AddPhotoAlternate as UploadIcon } from "@mui/icons-material";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import PostLike from "./Like-comment-share/PostLike";
import PostComment from "./Like-comment-share/PostComment";
import PostShare from "./Like-comment-share/PostShare";
import DashboardEvents from "./DashboardEvents";
import DashboardInitiatives from "./DashboardInitiatives";
import DashboardUsers from "./DashboardUsers";
import { Link } from "react-router-dom";

const MainContent = ({ userID, eventsData, initiativesData }) => {
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
    author: userID,
    category: 1,
  };
  const fileInputRef = useRef(null);
  const [gettingData, setGettingData] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [postData, setPostData] = useState(initialData);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tabValue, setTabValue] = useState(1);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
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

  const fetchRecentPosts = async () => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        "posts/post-get/",
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
        const data = Array.isArray(response?.data)
          ? response.data
          : [response.data];

        const sortedData = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setGettingData(sortedData);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setIsLoading(false);
  };

  // for popular this week
  const fetchPopularPosts = async () => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        "posts/postlike-count/",
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
        const data = Array.isArray(response?.data)
          ? response.data
          : [response.data];
        setPopularPosts(data);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (tabValue === 1) {
      fetchRecentPosts();
    } else if (tabValue === 2) {
      fetchPopularPosts();
    }
  }, [tabValue, refreshData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("content", postData.content);
    // formDataToSend.append("images", postData.images[0]);
    formDataToSend.append("images", postData.images[0]);
    formDataToSend.append("category", postData.category);
    formDataToSend.append("allow_likes", postData.allow_likes);
    formDataToSend.append("allow_comments", postData.allow_comments);
    formDataToSend.append("allow_sharing", postData.allow_sharing);
    formDataToSend.append("author", userID);
    try {
      const response = await ajaxCall(
        "posts/post-create/",
        {
          method: "POST",
          body: formDataToSend,
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Post Created Successfully");
        setRefreshData((prev) => !prev);
        setPostData({
          images: [],
          content: "",
        });
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
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

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const renderPosts = (posts) => (
    <>
      {Array.isArray(posts) &&
        posts.map((data) => (
          <Card key={data.id} sx={{ display: "flex", mb: 2 }}>
            {data?.images && data.images.length > 0 ? (
              <Box sx={{ display: "flex" }}>
                {data.images.map((imageData, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    sx={{ width: 160 }}
                    image={imageData.image}
                    alt={data.title}
                  />
                ))}
              </Box>
            ) : null}
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Avatar sx={{ mr: 1 }}>
                    {data.author?.username
                      ? data.author?.username.charAt(0).toUpperCase()
                      : "A"}
                  </Avatar>
                  <Typography variant="subtitle1">
                    <Link
                      to={`/dashboard/userProfile/${data.author.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {data.author?.username}
                    </Link>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    {data.category?.name} • {timeAgo(data?.created_at)}
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
                <PostLike
                  postId={data.id}
                  userId={userID}
                  likeCounts={data.likes}
                />
                <PostComment
                  postId={data.id}
                  userId={userID}
                  commentCounts={data.comments}
                />
                <PostShare
                  postId={data.id}
                  userId={userID}
                  shareCounts={data.shares}
                  postContent={gettingData}
                />
              </CardActions>
            </Box>
          </Card>
        ))}
    </>
  );

  return (
    <Container sx={{ mt: 10 }}>
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {postData.images.length > 0 ? (
                      <>
                        <img
                          src={URL.createObjectURL(postData.images[0])}
                          alt="Uploaded"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                        <IconButton
                          onClick={() =>
                            setPostData((prev) => ({ ...prev, images: [] }))
                          }
                          color="primary"
                          component="span"
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        onClick={handleIconClick}
                        color="primary"
                        component="span"
                      >
                        <UploadIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <input
              ref={fileInputRef}
              type="file"
              name="images"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                type="submit"
                size="small"
              >
                Add Post
              </Button>
            </Box>
          </form>
          {isLoading ? (
            <Button variant="contained" color="primary" fullWidth disabled>
              <CircularProgress />
            </Button>
          ) : (
            <Paper sx={{ p: 2 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{ mb: 2 }}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Recent Thread" value={1} />
                <Tab label="Popular This Week" value={2} />
              </Tabs>

              {tabValue === 1 && renderPosts(gettingData)}
              {tabValue === 2 && renderPosts(popularPosts)}
            </Paper>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardEvents eventsData={eventsData} />
          <DashboardInitiatives initiativesData={initiativesData} />
          <DashboardUsers />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainContent;
