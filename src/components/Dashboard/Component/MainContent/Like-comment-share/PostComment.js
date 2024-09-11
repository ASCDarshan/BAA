import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ajaxCall from "../../../../helpers/ajaxCall";

const PostComment = ({ postId, userId, commentCounts }) => {
  const initialData = {
    content: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    post: postId,
    user: userId,
  };

  const [open, setOpen] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [comment, setComment] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasComments, setHasComments] = useState(true);

  const commentCount = commentCounts?.length || 0;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCommentChange = (e) => {
    setComment((prevComment) => ({
      ...prevComment,
      content: e.target.value,
      updated_at: new Date().toISOString(),
    }));
  };

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(`posts/comments/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 200) {
        const filteredComments = response.data.filter(
          (comment) => comment.post.id === postId
        );
        setCommentsList(filteredComments);
        setHasComments(filteredComments.length > 0);
      } else {
        console.error("Error fetching comments:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (open) {
      fetchComments();
    }
  }, [open]);

  const handleSubmitComment = async () => {
    if (comment.content.trim() === "") return;
    setIsSubmitting(true);

    try {
      const response = await ajaxCall(`posts/comment-create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });

      if ([200, 201].includes(response.status)) {
        setCommentsList((prev) => [...prev, response.data]);
        setComment((prev) => ({
          ...prev,
          content: "",
        }));
        setHasComments(true);
      } else {
        console.error("Error submitting comment:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <CommentIcon />
        {commentCount}
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <CircularProgress />
          ) : hasComments ? (
            <Paper elevation={3} style={{ padding: 16 }}>
              <List>
                {commentsList.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem
                      alignItems="flex-start"
                      style={{
                        borderRadius: 8,
                        marginBottom: 8,
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <ListItemText
                        secondary={
                          <Typography variant="body2" color="textSecondary">
                            {comment.content} - {comment.user.username}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No comments for this post
            </Typography>
          )}

          <TextField
            size="small"
            margin="dense"
            fullWidth
            value={comment.content}
            onChange={handleCommentChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isSubmitting ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Button
                      onClick={handleSubmitComment}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Post
                    </Button>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostComment;
