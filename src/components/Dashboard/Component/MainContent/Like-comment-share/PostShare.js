import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const PostShare = ({ postId, userId }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShare = async (platform) => {
    setOpen(false);

    try {
      const response = await ajaxCall("posts/shares/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shared_to: platform,
          created_at: new Date().toISOString(),
          post: postId,
          user: userId,
        }),
      });

      if ([200, 201].includes(response.status)) {
        toast.success("Post Share Successfully");
      } else {
        toast.error("Error sharing the post");
      }
    } catch (error) {
      toast.error("Error sharing the post");
    }
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <ShareIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle> Share this post via:</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <IconButton
                color="primary"
                onClick={() => handleShare("FACEBOOK")}
              >
                <FacebookIcon fontSize="large" />
                <Typography variant="body2" style={{ marginLeft: 8 }}>
                  FACEBOOK
                </Typography>
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="success"
                onClick={() => handleShare("WHATSAPP")}
              >
                <WhatsAppIcon fontSize="large" />
                <Typography variant="body2" style={{ marginLeft: 8 }}>
                  WHATSAPP
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
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

export default PostShare;
