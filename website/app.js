/* Global Variables */
const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
const apiId = "&APPID=456e60bea0654b01db79e49f4bf14762";
const zipCode = document.querySelector("#zip");
const userInput = document.querySelector("#feelings");
// dive holders
const tempId = document.querySelector("#temp");
const dateId = document.querySelector("#date");
const contentId = document.querySelector("#content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// get data function
const getTheData = async (url = "") => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// POST Data function
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
};

const updateUI = async () => {
  const projectData = await getTheData("/data");
  dateId.innerHTML = projectData.date;
  tempId.innerHTML = `${projectData.temperature} &#8457`;
  contentId.innerHTML = projectData.feelings;
};

const generateData = async () => {
  const feelings = userInput.value;
  const zip = zipCode.value;
  const response = await fetch(`https://${baseURL}${zip}${apiId}`);
  try {
    const data = await response.json();
    data.feelings = feelings;
    data.date = newDate;
    await postData("/", data);
    updateUI();
  } catch (error) {
    console.error("error", error);
  }
};

document.querySelector("#generate").addEventListener("click", generateData);
