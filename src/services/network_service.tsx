import { Toast } from "@capacitor/toast";
import axios from "axios";
//import { Followup } from "../models/followup";

const base = "http://172.16.129.244:8080";
const showToast = async (msg: string) => {
  await Toast.show({
    text: msg,
  });
};

export const logInRequest = async (userId: string, password: string) => {
  const loginData = {
    email: userId,
    password: password,
    role: "ADMIN",
  };

  const response = await axios.post(base + "/authenticate", loginData);
  //   console.log(response);

  return response.data;
};

//export default logInRequest; 