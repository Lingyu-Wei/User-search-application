const axios = require("axios");

async function CallDatabase() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users")
  return response;
}

function printData() {
  console.log(CallDatabase())
}