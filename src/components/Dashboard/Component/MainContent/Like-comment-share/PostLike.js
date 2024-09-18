import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ajaxCall from "../../../../helpers/ajaxCall";

const PostLike = ({ postId, userId, likeCounts }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likeCounts?.length || 0);

  useEffect(() => {
    const userHasLiked = likeCounts?.some((like) => like.user === userId);
    setIsLiked(userHasLiked);
  }, [likeCounts, userId]);

  const handleLikeClick = async () => {
    try {
      const response = await ajaxCall(
        `posts/likes/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify({
            post: postId,
            user: userId,
            created_at: new Date().toISOString(),
          }),
        },
        8000
      );

      if ([200, 201].includes(response.status)) {
        if (isLiked) {
          setLikeCount((prevCount) => prevCount - 1);
          setIsLiked(false);
        } else {
          setLikeCount((prevCount) => prevCount + 1);
          setIsLiked(true);
        }
      } else {
        console.error("Failed to like/unlike the post");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <IconButton
      size="small"
      onClick={handleLikeClick}
      color={isLiked ? "primary" : "default"}
    >
      <FavoriteIcon />
      <span>{likeCount}</span>
    </IconButton>
  );
};

export default PostLike;
