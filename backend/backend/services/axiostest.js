const axios = require("axios");

const groupId = "6596f61d7d5d6d3d81dfd4f9"; // Zamijenite sa stvarnim groupId
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODQ3ZjVkNmYxOTBhNDIzODU2NjEzNSIsImlhdCI6MTcwNDM5MjMyNCwiZXhwIjoxNzA2OTg0MzI0fQ.EEazHf2vSVi2LOEP3vB9o4VlAkVYSjx8KoZInwP0wTY";

const url = `http://localhost:5000/api/group/get-todo-from-group/${groupId}`;

const headers = {
  Authorization: `Bearer ${token}`,
};

axios
  .get(url, { headers })
  .then((response) => {
    console.log("Response:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
