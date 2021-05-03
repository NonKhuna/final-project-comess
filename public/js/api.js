const API_HOST = "https://api.karnjj.tk";

async function Get(path) {
  const response = await fetch(API_HOST + path, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return await response
    .json()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return null;
    });
}

async function Post(path, data = undefined) {
  const response = await fetch(API_HOST + path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
