import React, { useCallback, useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";

const PostsByFollowing = () => {
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

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
        setData(response?.data || []);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchData("profiles/following", setFollowing);
    fetchData("posts/post-get", setPosts);
  }, []);

  useEffect(() => {
    console.log("Following data:", following);
    console.log("Posts data:", posts);

    if (following.length > 0 && posts.length > 0) {
        const followingIds = following.map((user) => user.id);
        console.log(followingIds)
        console.log("Following IDs:", followingIds);
    
        const filtered = posts.filter((post) => {
            if (post.author && post.author.id) {
                const isPostByFollowing = followingIds.includes(post.author.id);
                console.log(`Post by ${post.author.id}, included: ${isPostByFollowing}`);
                return isPostByFollowing;
            } else {
                console.log(`Post with no valid author:`, post);
                return false;
            }
        });
    
        console.log("Filtered posts:", filtered);
        setFilteredPosts(filtered);
    }
    
  }, [following, posts]);

  return (
    <div>
      <h2>Posts by Following Users</h2>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} className="post">
            <h3>{post.content}</h3>
            <p>Posted by: {post.author.username}</p>
            {post.images && post.images.length > 0 && (
              <img src={post.images[0].image} alt="Post Image" />
            )}
          </div>
        ))
      ) : (
        <p>No posts from following users.</p>
      )}
    </div>
  );
};

export default PostsByFollowing;
