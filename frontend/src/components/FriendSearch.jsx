import React, { useState } from "react";

const FriendSearch = ({ currentUserUsername }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchUsers = async () => {
    try {
      const response = await fetch(
        `/api/friendships/search?query=${searchQuery}&requesterUsername=${currentUserUsername}`
      );
      if (!response.ok) {
        throw new Error("Error fetching users");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const addFriend = async (recipientUsername) => {
    try {
      const response = await fetch(`/api/friendships/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requesterUsername: currentUserUsername,
          recipientUsername,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        console.error(data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return (
    <div className="friend-search">
      <h2>Search for Friends</h2>
      <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={searchUsers}>Search</button>

      <ul>
        {results.map((user) => (
          <li key={user.username}>
            <img
              src={user.profilePicture || "default-profile.png"}
              alt={`${user.username}'s profile`}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <span>{user.username}</span>
            <button onClick={() => addFriend(user.username)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendSearch;
