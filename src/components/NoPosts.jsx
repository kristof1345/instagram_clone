import React from "react";

const NoPosts = ({ styles }) => {
  return (
    <div className="no-posts-holder" style={styles}>
      <dir>No posts available!</dir>
    </div>
  );
};

export default NoPosts;
