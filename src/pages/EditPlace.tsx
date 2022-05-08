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

  const base = "http://172.16.129.244:8080";
  //this id is currently static, for Hitesh Medicals, bring it from other screen!
  //Also, the placeholders for the text fields are currently static, bring it from the local store/API call.
  const updatePlaceRequest = async (spId: string,enteredName: string, enteredPhone: string,enteredPrice: string) => {
    const updateData = {
        id: spId,
      name: enteredName,
      phone: enteredPhone,
      price: enteredPrice
    };
  
    const response = await axios.put(base + "/vendor/update_storage_point", updateData);
    //   console.log(response);
    if(response.data==="success"){
        console.log("updated succesfully");
    }
    return response.data;
  };

const EditPlace: React.FC = () =>{ 
    const  spId:any  = useParams();
    const history = useHistory();
    const [error, setError] = useState("");
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const nameRef = useRef<HTMLIonInputElement>(null);
    const phoneRef = useRef<HTMLIonInputElement>(null);
    const priceRef = useRef<HTMLIonInputElement>(null);
    //const closed = useRef<HTMLIonInputElement>(null);
    const [present, dismiss] = useIonLoading();
    const saveHandler = () => {
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
        updatePlaceRequest(spId,enteredName as string,enteredPhone as string,enteredPrice as string).then(()=>{
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
                    ></IonInput>
                  </IonCard>
                </IonCol>
              </IonRow>
                  </IonGrid>
              <IonButton
              onClick={saveHandler}
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

export default EditPlace;