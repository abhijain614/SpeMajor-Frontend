import {
    IonButton,
    IonCard,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonPage,
    IonRow,
    IonText,
    IonToolbar,
    IonIcon,
    useIonLoading,
    IonAlert,
    IonButtons,
    IonBackButton,
  } from "@ionic/react";
  import {
    chevronBackOutline,
    refreshOutline,
  } from "ionicons/icons";
import { update } from "pullstate";
  import React, { useContext, useEffect, useRef, useState } from "react";
  import { useHistory, useParams } from "react-router";
  import { useAuth } from "../stores/auth";
  import "../theme/home.css"
  import axios from "axios";


  import {CONFIG} from '../constants';

    const base = CONFIG.API_ENDPOINT;
  //Also, the placeholders for the text fields are currently static, bring it from the local store/API call.
  const updatePlaceRequest = async (userJWT: any,spId:number,enteredName: string, enteredPhone: string,enteredPrice: string) => {
    console.log(spId);
    const updateData = {  
      storagepoint_id: spId,
      name: enteredName,
      phone: enteredPhone,
      price: enteredPrice
    };
    let axiosConfig = {
      headers: {
          Authorization: userJWT,
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    const response = await axios.put(base + "vendor/update_storage_point",
     updateData,axiosConfig
     );
    //   console.log(response);
    if(response.data==="success"){
        console.log("updated succesfully");
    }
    return response.data;
  };

const AddPlace: React.FC = () =>{ 
    const {userJWT} = useAuth();
    const spId   = useParams();
    const id = JSON.parse(JSON.stringify(spId));
    const history = useHistory();
    const [error, setError] = useState("");
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const nameRef = useRef<HTMLIonInputElement>(null);
    const phoneRef = useRef<HTMLIonInputElement>(null);
    const priceRef = useRef<HTMLIonInputElement>(null);
    //const closed = useRef<HTMLIonInputElement>(null);
    const [present, dismiss] = useIonLoading();
    const addHandler = () => {
        const enteredName = nameRef.current!.value;
    const enteredPhone = phoneRef.current!.value;
    const enteredPrice = priceRef.current!.value;
    if(
        !enteredName
        ||!enteredPhone
        ||!enteredPrice
        ||enteredName.toString().trim().length===0
        ||enteredPhone.toString().trim().length===0
        ||enteredPrice.toString().trim().length===0)
        {
            setError("Please enter a valid data!");
            return;
        }
        setError("");
        updatePlaceRequest(userJWT,id.id,enteredName as string,enteredPhone as string,enteredPrice as string).then(()=>{
            console.log("Reaching this line should mean... successfully updated data!");
        }).catch((error)=>{
                console.log(error.response.status);
              
        });
    };
    return (
        <IonPage>
          <IonHeader className="IonHeader">
            <IonToolbar>
              <IonButton
                onClick={() => {
                  history.goBack();
                }}
                slot="start"
                fill="clear"
              >
                <IonIcon
                  icon={chevronBackOutline}
                  color="primary"
                  size="large"
                  onClick={() => {
                    history.goBack();
                  }}
                />
              </IonButton>
              </IonToolbar>
              </IonHeader>
              <IonList>
                  <IonGrid>
                  <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      value="Sample Name"
                      inputmode="text"
                      ref = {nameRef}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      value="Sample Phone"
                      inputmode="text"
                      ref = {phoneRef}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="col-no-top">
                  <IonCard className="ion-card">
                    <IonInput
                      value="Sample Price"
                      inputmode="text"
                      ref = {priceRef}
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
                  </IonGrid>
              <IonButton
              onClick={addHandler}
              className="button-submit"
              slot="end"
              expand="block"
              color="primary"
              fill="solid"
              shape="round"
              // routerLink="/homePage"
            >
              Submit
            </IonButton>
              </IonList>
              </IonPage>)
};

export default AddPlace;