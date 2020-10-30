import axios from 'axios'

export const createTent = async (owner) => {
  const result = await fetch("api/new-tent", {
    method: "POST",
    body: JSON.stringify({ owner }),
  });
  const response = await result.json();
  return response._id;
};

export const updateTent = async (tentId, data) => {
  const result = await fetch("api/update-tent", {
    method: "POST",
    body: JSON.stringify({
      _id: tentId,
      data,
    }),
  });
  const response = await result.json();
  console.log(response);
};

export const uploadImage = async (tentId, filename, file) => {
  const bodyFormData = new FormData();

  bodyFormData.append("filename", filename);
  bodyFormData.append("tentId", tentId);
  bodyFormData.append("file", file);

  const url = "/api/upload-image";
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return await axios.post(url, bodyFormData, config)
}

export const removeArrayItem = (arr, index) => {
  arr.splice(index, 1)
  return arr 
}