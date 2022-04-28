import React from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonLoading
} from "@ionic/react";

  import { optionsOutline, personCircle } from "ionicons/icons";
  import { useContext, useEffect, useState } from "react";
  import { useTranslation } from "react-i18next";
  import { CallNumber } from "@awesome-cordova-plugins/call-number";
  
  import { createStore, set } from "../services/IonicStorage";
  //import UserContext from "../stores/user_contex";
  const ProfilePage: React.FC = () => {
    // const userCtx = useContext(UserContext);
    // useEffect(() => {
    //   userCtx.initData();
    // }, []);
  
    const callHandler = () => {
      CallNumber.callNumber("7225810801", true)
        .then((res) => console.log("Launched dialer!", res))
        .catch((err) => console.log("Error launching dialer", err));
    };
    const [isAdding, setIsAdding] = useState(false);
  
    const [selectedType, setSelectedType] = useState<string>("en");
  
    const startLangTypeAddHandler = () => {
      setIsAdding(true);
    };
    const { t } = useTranslation();
  
    const { i18n } = useTranslation();
  
    const cancelAddLangTypeHandler = () => {
      setIsAdding(false);
    };
  
    const langTypeAddHandler = (curr: string) => {
      setSelectedType((old) => {
        return curr;
      });
      i18n.changeLanguage(curr);
  
      setIsAdding(false);
    };
  
    const [logO, setLogO] = useState(false);
  
    const [present, dismiss] = useIonLoading();
  
    // useEffect(() => {
    //   if (userCtx.isLoad == true) {
    //     present({
    //       message: t("loading"),
    //     });
    //   } else {
    //     dismiss();
    //   }
    // }, [userCtx.isLoad]);
  
    const handleLogout = () => {
      createStore("APPDB");
      set("jwt", "none");
      set("userId", "none");
      //OneSignal.removeExternalUserId();
      setLogO(true);
    };
  
    if (logO) {
      window.location.assign("/");
      // return <Redirect to="/dashbord" />;
    }
  
    return (
      <IonPage>
        <IonHeader className="IonHeader">
          <IonToolbar>
            <IonText slot="start" color="primary">
              <strong>{t("profile_page")}</strong>
            </IonText>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
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
                      <strong>{"Abhi"}</strong>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="ion-text-center">
                    <IonText className="ion-text-subhead" color="primary">
                      <strong>
                        {t("AWC_name")}: {"userCtx.curUser.awc.name"}
                      </strong>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="ion-text-center">
                    <IonText className="ion-text-subhead" color="primary">
                      <strong>{"userCtx.curUser.Spp.addres s"}</strong>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="ion-text-center">
                    <IonText className="ion-text-subhead" color="primary">
                      <strong>{"userCtx.curUser.awc.pincode"}</strong>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" className="ion-text-center">
                    <IonItem></IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            {/* <IonButton
              onClick={callHandler}
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
            >
              {t("contact_nrc")}
            </IonButton> */}
            <IonButton
              onClick={handleLogout}
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="outline"
              shape="round"
              routerLink="/login"
            >
              {t("logout")}
            </IonButton>
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default ProfilePage;
  