// import React, { useState } from "react";

// function PeerSupport() {
//   const [posts, setPosts] = useState([
//     { user: "Student A", text: "Feeling stressed about exams 😓" },
//     { user: "Student B", text: "Meditation helped me a lot!" },
//   ]);
//   const [newPost, setNewPost] = useState("");

//   const handlePost = (e) => {
//     e.preventDefault();
//     if (!newPost.trim()) return;
//     setPosts([...posts, { user: "Anonymous", text: newPost }]);
//     setNewPost("");
//   };

//   return (
//     <div className="peer-support">
//       <h2 className="mb-4 text-center">Peer Support Forum</h2>
//       <p className="text-muted text-center mb-4">
//         Share your thoughts and experiences. Be respectful and supportive.
//       </p>

//       <div className="mb-4">
//         <form onSubmit={handlePost} className="d-flex gap-2">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Share something..."
//             value={newPost}
//             onChange={(e) => setNewPost(e.target.value)}
//           />
//           <button type="submit" className="btn btn-primary">
//             Post
//           </button>
//         </form>
//       </div>

//       <div className="list-group">
//         {posts.map((post, i) => (
//           <div key={i} className="list-group-item">
//             <strong>{post.user}:</strong> {post.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PeerSupport;

import React, { useState } from "react";

function PeerSupportBox() {
  const [posts, setPosts] = useState([
    { type: "Anonymous User",  content: "Struggling with exam stress, anyone have tips?" },
    { type: "Volunteer Moderator", content: "Deep breathing exercises have helped me, let's discuss!" },
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { type: "Anonymous User", content: newPost }]);
      setNewPost("");
    }
  };

  return (
    <div className="peer-box p-3 mt-3 text-center">
      <div className="post-form">
        <textarea
          className="border rounded text-center mt-2 p-2"
          placeholder="How are you feeling today?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        style={{width:"45%"}} />
        <button className="btn btn-primary mb-5" onClick={handlePost} style={{marginLeft: "20px",width:"100px", height:"40px"}}>
          Post
        </button>
      </div>

      <div className="posts">
         {posts.map((post, index) => (
          <div key={index} className="post border-b py-2">
            <strong>{post.type}:</strong> {post.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeerSupportBox;
