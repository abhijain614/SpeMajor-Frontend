import { IonButton, IonTabBar,IonTabButton,IonFabList,IonCard,IonFab,IonFabButton, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonIcon, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { arrowForward,listOutline,personOutline, navigateOutline,arrowBackCircle,logOut,powerOutline, arrowUpCircle } from 'ionicons/icons';
import { RatingStar } from '../components/RatingStar';
import VendorRecordsStore, { vendorSetStore } from '../store/VendorRecordsStore';
import { fetchRecords } from '../store/Selectors';
//import { get } from '../services/IonicStorage';
import styles from "../styles/ViewAll.module.scss";
import { getVendorRecords } from '../main/yelp';
import { useAuth } from '../stores/auth';
//import { setStore } from '../store/RecordsStore';
import { createStore, get,set } from '../services/IonicStorage';
import { useState } from 'react';
import { add } from 'ionicons/icons';
const Dashboard = () => {

	const [logO, setLogO] = useState(false);

	let {userJWT} = useAuth();
	console.log("This is JWT ",userJWT);
	const records = VendorRecordsStore.useState(fetchRecords);

	useIonViewWillEnter(async () => {
		getVendorRecords(userJWT);
	});

	const handleLogout = () => {
		//console.log("Hello");
		createStore("APPDB");
    	set("jwt", "none");
    	set("userId", "none");
		setLogO(true);
	};

	if (logO) {
		window.location.assign("/");
		// return <Redirect to="/dashbord" />;
	  }

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Your Storage Points</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Feeling hungry?</IonTitle>
					</IonToolbar>
				</IonHeader>
				
				{ records.map((record, index) => {
					//console.log(record.id);
					const imageURL = record.imageURL ? record.imageURL : "/placeholder.jpeg";
					const rating = Math.floor(record.rating).toFixed(0);

					return (
						<IonCard key={ `record_${ index }` } className={ `${ styles.viewCard } animate__animated animate__faster animate__fadeIn` } routerLink={ `/dashboard/${ record.id }` }>
							<div className={ styles.cardImage } style={{ backgroundImage: `url(${ imageURL })` }} />
							<IonCardHeader>

								{ Array.apply(null, { length: 5 }).map((e, i) => (

									<RatingStar key={ i } rated={ rating > i } />
								))}

								<IonCardSubtitle>{ record.name }</IonCardSubtitle>
								<IonNote color="medium">{ record.displayAddress }</IonNote>

								<IonRow className="ion-justify-content-between ion-align-items-center">
									<IonText color="primary">
										<p>
											Currently Open
										</p>
									</IonText>

									<IonButton size="small" color="primary">
										<IonIcon icon={ arrowForward } />
									</IonButton>
								</IonRow>
							</IonCardHeader>
						</IonCard>
					);
				})}
				{/* <IonFab vertical="top" horizontal="end" edge slot="fixed">
          	<IonFabButton onClick={handleLogout} >  
            <IonIcon icon={powerOutline} />	
          	</IonFabButton>
       		 </IonFab> */}
				{/* <IonFab vertical="bottom" horizontal="start" slot="fixed" routerLink={`/addSP`}>
							<IonFabButton>
								<IonIcon icon={add} />
							</IonFabButton>
						</IonFab>
				<IonFab vertical="bottom" horizontal="end" slot="fixed">
							<IonFabButton>
								<IonIcon icon={powerOutline} />
							</IonFabButton>
						</IonFab> */}
				 <IonFab vertical="bottom" horizontal="end" slot="fixed">
				 <IonFabButton>
						<IonIcon icon={arrowUpCircle} />
					</IonFabButton>
					<IonFabList side="top">
            <IonFabButton><IonIcon icon={add} /></IonFabButton>
			<IonFabButton><IonIcon onClick={handleLogout} icon={powerOutline} /></IonFabButton>
          			</IonFabList>
				 </IonFab>
			</IonContent>
			
			{/* <IonTabBar slot="bottom">
			<IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={ listOutline } />
          </IonTabButton>
          <IonTabButton tab="profilePage" href="./profilePage">
          <IonIcon icon={personOutline} />
        </IonTabButton>
        </IonTabBar> */}
		</IonPage>
	);
};

export default Dashboard;
