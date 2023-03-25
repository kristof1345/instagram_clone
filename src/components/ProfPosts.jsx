import SmallPost from "../components/SmallPost";

const ProfPosts = ({ currUser }) => {
  let postIds = currUser.postIDs;
  return (
    <div className="posts-grid">
      {postIds.map((postID, i) => (
        <SmallPost postID={postID} key={i} />
      ))}
    </div>
  );
};

export default ProfPosts;
