import React, { useEffect, useState } from "react";
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

const PostShare = ({ postId, userId, shareCounts, postContent }) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const shareCount = shareCounts?.length || 0;

  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const userID = loginInfo?.userId;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async (url, setData) => {
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
        setData(response?.data || {});
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchData(`profiles/user-profile/${userID}/`, setUserData);
  }, [userID]);

  const handleShare = async (platform) => {
    const { phone_number, facebook_profile } = userData;

    try {
      let shareUrl = "";
      if (platform === "WHATSAPP" && phone_number) {
        shareUrl = `https://wa.me/${phone_number}?text=${encodeURIComponent(
          `Check out this post: ${postContent}`
        )}`;
      } else if (platform === "FACEBOOK" && facebook_profile) {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          `https://facebook.com/${facebook_profile}`
        )}&quote=${encodeURIComponent(postContent)}`;
      }

      const response = await ajaxCall("posts/shares/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
        body: JSON.stringify({
          shared_to: platform,
          created_at: new Date().toISOString(),
          post: postId,
          user: userId,
          contact_info:
            platform === "WHATSAPP" ? phone_number : facebook_profile,
        }),
      });

      if ([200, 201].includes(response.status)) {
        toast.success("Post shared successfully!");

        if (shareUrl) {
          window.open(shareUrl, "_blank");
        }
      } else {
        toast.error("Error sharing the post");
      }
    } catch (error) {
      toast.error("Error sharing the post");
    }

    setOpen(false);
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <ShareIcon />
        {shareCount}
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
