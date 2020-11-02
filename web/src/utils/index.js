import axios from "axios";
import { Magic } from "magic-sdk";

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
  return await axios.post(url, bodyFormData, config);
};

export const removeArrayItem = (arr, index) => {
  arr.splice(index, 1);
  return arr;
};

export const authUser = async (email, onConfirm) => {
  try {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
    const didToken = await magic.auth.loginWithMagicLink({
      email,
    });
    console.log('send')
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      body: JSON.stringify(email),
    });
    if(res.status === 200){
      console.log("success")
      onConfirm();
    } else {
      console.log('fail')
    }
  } catch (error) {
    console.log("error")
    console.log(error)
  }
}

export const newReservation = async (tentId, email) => {
  const body = {
    tentId,
    email
  }
  const url = '/api/reservation'

  return await axios.post(url, body)
 
}
