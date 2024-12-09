const jwtDecode = require("jwt-decode");

export const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.id) {
      return decodedToken.id; // Assumes `id` was included in the JWT payload
    } else {
      console.error("Token does not contain 'id'");
      return null;
    }
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
