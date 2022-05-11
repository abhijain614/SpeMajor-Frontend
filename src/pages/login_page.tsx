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
    IonFooter,
    IonToolbar,
    IonTabBar,
    IonTabButton,
    IonTab,
    IonTabs,
    IonNav,
    IonTitle,
    IonImg
  } from "@ionic/react";
  import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Dashboard from './dashboard';
import ViewPlace from './ViewPlace';
  import React, { useState } from "react";
  import axios from "axios";
  import { IonGrid, IonRow, IonCol, IonCardContent,IonCardTitle } from "@ionic/react";
  import { personCircle, mapOutline, listOutline, homeOutline } from "ionicons/icons";
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
  //import OneSignal from "onesignal-cordova-plugin";
  import { Toast } from "@capacitor/toast";
import { setStore } from "../store/RecordsStore";
import VendorRecordsStore, { vendorSetStore } from '../store/VendorRecordsStore';
import { getVendorRecords } from '../main/yelp';
import { IonReactRouter } from '@ionic/react-router';  
import {Action} from '../components/Action'
import {CONFIG} from '../constants';

  const base = CONFIG.API_ENDPOINT;
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
  
    const response = await axios.post(base + "vendor/login", loginData);
    //   console.log(response);
  
    return response.data;
  };

  const LoginPage: React.FC = () => {
    // const { t } = useTranslation();
  
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
        setMessage("Email can't be empty!");
        setIserror(true);
        return;
      }
  
      if (!password || password.toString().trim().length === 0) {
        setMessage("Password can't be empty!");
        setIserror(true);
        return;
      }
      setLoading(true);
  
      if (Network.type == Network.Connection.NONE) {
        setMessage("You are offline!");
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
                setMessage("username_password_incorrect_msg");
              else setMessage(error.response.status + error.message);
            } else if (error.request) {
              console.log(error.request);
              setMessage(error.toString());
            } else {
              console.log("error", error.message);
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
      console.log("Hello");
      return <Redirect to="./dashboard" />;
    }
    //console.log("error:", loggedIn);
  
    return (
      <IonPage>
        <IonHeader className="IonHeader">
          {/* <IonToolbar class='ion-text-center my_iontitle'><strong>Let's Sign In</strong></IonToolbar> */}
        <IonToolbar>
          <IonTitle>
            <IonImg className='logo-style' src='/AppLogo.png'></IonImg>
          </IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonItem className='spacing'></IonItem>
        <IonContent fullscreen>
          <IonAlert
            isOpen={iserror}
            onDidDismiss={() => setIserror(false)}
            cssClass="my-custom-class"
            header={"error!"}
            message={message}
            buttons={["dismiss"]}
          />
          <IonList>
            <IonItem>
              <IonGrid>
                <IonRow className='rest-of-app'>
                  <IonCol size="12" className="ion-text-center">
                    <IonIcon
                      color="primary"
                      style={{ fontSize: "50px", color: "#0040ff" }}
                      icon={homeOutline}
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="ion-text-center">
                    <IonText className="ion-text-head my_iontitle" color="primary">
                      <strong>{"Manage Your Storage Points"}</strong>
                    </IonText>
                  </IonCol>
                </IonRow>
                
              </IonGrid>
            </IonItem>
            <IonItem>
              <IonText className="ion-text-subhead my_iontitle">{"Email"}</IonText>
            </IonItem>
            <IonCard className="ion-card">
              <IonInput
                value={userId}
                onIonChange={(e) => setUserId(e.detail.value!)}
              ></IonInput>
            </IonCard>
            <IonItem>
              <IonText className="ion-text-subhead my_iontitle">{"Password"}</IonText>
            </IonItem>
            <IonCard className="ion-card">
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonCard>
            <IonItem className='spacing'></IonItem>
            <IonButton
              className="button-submit my_iontitle"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
              onClick={handleLogin}
              // routerLink="/dashboard"
              >
              Sign in
            </IonButton>
            <Action message="Don't have an account?" text="Signup" link="/signup" />
          </IonList>
          
          <IonLoading isOpen={loading} />
        </IonContent>
        <IonFooter>
				{/* <IonGrid className="ion-no-margin ion-no-padding">
                    <Action message="Don't have an account?" text="Signup" link="/signup" />
				</IonGrid> */}
			</IonFooter>
      </IonPage>
    );
  };
  

  export default LoginPage;