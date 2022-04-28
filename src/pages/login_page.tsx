import { Redirect, Route } from 'react-router-dom';
import {
  IonRouterOutlet,
    IonCard,
    IonContent,
    IonHeader,
    IonList,
    IonLoading,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    IonTabBar,
    IonTabButton,
    IonTab,
    IonTabs
  } from "@ionic/react";
  import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Dashboard from './dashboard';
import ViewPlace from './ViewPlace';
  import React, { useState } from "react";
  import axios from "axios";
  import { IonGrid, IonRow, IonCol } from "@ionic/react";
  import { personCircle, mapOutline, listOutline } from "ionicons/icons";
  import { useHistory } from "react-router-dom";
 // import { Redirect } from "react-router";
  import { Network } from "@awesome-cordova-plugins/network";
  //import { Redirect, Route } from 'react-router-dom';  //import Tab1 from './Tab1'; 
  import {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonAlert,
  } from "@ionic/react";
  import { useAuth } from "../stores/auth";
  import { createStore, set } from "../services/IonicStorage";
  //import { logInRequest } from "../services/network_service";
  import { useTranslation } from "react-i18next";
  //import OneSignal from "onesignal-cordova-plugin";
  import { Toast } from "@capacitor/toast";
import { setStore } from "../store/RecordsStore";
import VendorRecordsStore, { vendorSetStore } from '../store/VendorRecordsStore';
import { getVendorRecords } from '../main/yelp';
import { IonReactRouter } from '@ionic/react-router';  


  const base = "http://172.16.129.244:8080";
  const showToast = async (msg: string) => {
    await Toast.show({
      text: msg,
    });
  };
  
  const logInRequest = async (userId: string, password: string) => {
    const loginData = {
      email: userId,
      password: password,
      role: "ADMIN"
    };
  
    const response = await axios.post(base + "/vendor/login", loginData);
    //   console.log(response);
  
    return response.data;
  };

  const LoginPage: React.FC = () => {
    const { t } = useTranslation();
  
    const history = useHistory();
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const { loggedIn } = useAuth();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [logS, setLogS] = useState(false);
  
    const handleLogin = () => {
      if (!userId || userId.toString().trim().length === 0) {
        setMessage(t("valid_userid_msg"));
        setIserror(true);
        return;
      }
  
      if (!password || password.toString().trim().length === 0) {
        setMessage(t("valid_pass_msg"));
        setIserror(true);
        return;
      }
      setLoading(true);
  
      if (Network.type == Network.Connection.NONE) {
        setMessage(t("offline_msg"));
        setIserror(true);
        setLoading(false);
      } else {
        logInRequest(userId, password)
          .then((data) => {
            createStore("APPDB");
            set("jwt", "Bearer " + data["jwt"].toString());
            set("userId", userId);

            console.log("success", data["jwt"]);
            setLoading(false);
            setLogS(true);

            // if (loggedIn) {
            //   return <Redirect to="/map" />;
            // }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.status);
              if (error.response.status == 403)
                setMessage(t("username_password_incorrect_msg"));
              else setMessage(error.response.status + error.message);
            } else if (error.request) {
              console.log(error.request);
              setMessage(error.toString());
            } else {
              console.log(t("error"), error.message);
              setMessage(error.message + "-");
            }
            // console.log("error:", error);
  
            setIserror(true);
            setLoading(false);
          });
      }
    };
    const showToast = async (msg: string) => {
      await Toast.show({
        text: msg,
      });
    };
  
    if (logS) {
      window.location.assign("/");
    }
  
    if (loggedIn) { 
      return <Redirect to="./dashboard" />;
    }
    //console.log("error:", loggedIn);
  
    return (
      <IonPage>
        <IonHeader className="IonHeader">
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonAlert
            isOpen={iserror}
            onDidDismiss={() => setIserror(false)}
            cssClass="my-custom-class"
            header={t("error!")}
            message={message}
            buttons={[t("dismiss")]}
          />
          <IonList>
            <IonItem>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" className="ion-text-center">
                    <IonIcon
                      color="primary"
                      style={{ fontSize: "90px", color: "#0040ff" }}
                      icon={personCircle}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="ion-text-center">
                    <IonText className="ion-text-head" color="primary">
                      <strong>{t("login")}</strong>
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem>
              <IonText className="ion-text-subhead">{t("userid")}</IonText>
            </IonItem>
            <IonCard className="ion-card">
              <IonInput
                value={userId}
                onIonChange={(e) => setUserId(e.detail.value!)}
              ></IonInput>
            </IonCard>
            <IonItem>
              <IonText className="ion-text-subhead">{t("password")}</IonText>
            </IonItem>
            <IonCard className="ion-card">
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonCard>
            <IonItem></IonItem>
            <IonButton
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
              onClick={handleLogin}
            >
              Login
            </IonButton>
          </IonList>
          <IonLoading isOpen={loading} />
        </IonContent>
      </IonPage>
    );
  };
  
  
  

  export default LoginPage;