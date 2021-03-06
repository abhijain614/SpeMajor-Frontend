import React from "react";
import {
      IonCard,
      IonContent,
      IonHeader,
      IonList,
      IonLoading,
      IonPage,
      IonText,
      IonToolbar,
      IonGrid,
      IonRow,
      IonCol,
      IonItem,
      IonInput,
      IonButton,
      IonIcon,
      IonAlert,
      IonTitle,
      IonImg
    } from "@ionic/react";
    import { personCircle,homeOutline } from "ionicons/icons";
    import { useState } from "react";
    import axios from "axios";
    import {CONFIG} from '../constants';

    const base = CONFIG.API_ENDPOINT;
    const signupRequest = async (email: string, mobile: string, password: string) => {
        const signupData = {
            email: email,
            mobile: mobile,
            password: password,
            role: "ADMIN"
          };
        const response = await axios.post(base + "vendor/signup", signupData);
        return response.data;
    };

const SignupPage: React.FC = () => {
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSignup = () => {
        if (!email || email.toString().trim().length === 0) {
            setMessage("Email Can't be empty!");
            setIserror(true);
            return;
          }
          if (!mobile || mobile.toString().trim().length === 0) {
            setMessage("Mobile Number Can't be empty!");
            setIserror(true);
            return;
          }
        if (!password || password.toString().trim().length === 0) {
            setMessage("Password Can't be empty!");
            setIserror(true);
            return;
        }
        signupRequest(email,mobile,password).then((data)=>{
            console.log("Successfully signed up!");
        }).catch((error) => {
            if (error.response) {
              console.log(error.response.status);
              if (error.response.status == 403)
                setMessage("Username/password is incorrect!");
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
            //setLoading(false);
          });
    };
    return (
        <IonPage>
          <IonHeader className="IonHeader">
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
                  <IonRow>
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
                        <strong>{"Become a Storage Provider!"}</strong>
                      </IonText>
                    </IonCol>
                  </IonRow>
                  
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonText className="ion-text-subhead">{"Email"}</IonText>
              </IonItem>
              <IonCard className="ion-card">
                <IonInput
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonCard>
              <IonItem>
                <IonText className="ion-text-subhead">{"Mobile"}</IonText>
              </IonItem>
              <IonCard className="ion-card">
                <IonInput
                  value={mobile}
                  onIonChange={(e) => setMobile(e.detail.value!)}
                ></IonInput>
              </IonCard>
              <IonItem>
                <IonText className="ion-text-subhead">{"Password"}</IonText>
              </IonItem>
              <IonCard className="ion-card">
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonCard>
              <IonItem className="spacing"></IonItem>
              <IonButton
                className="button-submit my_iontitle"
                slot="end"
                expand="block"
                color="primary"
                fill="solid"
                shape="round"
                onClick={handleSignup}
                 routerLink="/login"
                >
                Create Account
              </IonButton>
              
            </IonList>
            
            <IonLoading isOpen={loading} />
          </IonContent>
        </IonPage>
      );
    };

export default SignupPage;