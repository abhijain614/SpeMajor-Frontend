import { Toast } from "@capacitor/toast";
import axios from "axios";
import {CONFIG} from '../constants';

    const base = CONFIG.API_ENDPOINT;
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

  const response = await axios.post(base + "authenticate", loginData);
  //   console.log(response);

  return response.data;
};

//export default logInRequest; 