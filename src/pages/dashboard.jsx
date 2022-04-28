import { IonButton, IonTabBar,IonTabButton,IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonIcon, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { arrowForward,listOutline,personOutline, navigateOutline } from 'ionicons/icons';
import { RatingStar } from '../components/RatingStar';
import VendorRecordsStore, { vendorSetStore } from '../store/VendorRecordsStore';
import { fetchRecords } from '../store/Selectors';

import styles from "../styles/ViewAll.module.scss";
import { getVendorRecords } from '../main/yelp';
//import { setStore } from '../store/RecordsStore';

const Dashboard = () => {

	const records = VendorRecordsStore.useState(fetchRecords);

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

					const imageURL = record.imageURL ? record.imageURL : "/placeholder.jpeg";
					const rating = Math.floor(record.rating).toFixed(0);

					return (
						<IonCard key={ `record_${ index }` } className={ `${ styles.viewCard } animate__animated animate__faster animate__fadeIn` } routerLink={ `/list/${ record.id }` }>
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
			</IonContent>
			<IonTabBar slot="bottom">
			<IonTabButton tab="dashboard" href="/dashboard">
            <IonIcon icon={ listOutline } />
          </IonTabButton>
          <IonTabButton tab="profilePage" href="./profilePage">
          <IonIcon icon={personOutline} />
        </IonTabButton>
        </IonTabBar>
		</IonPage>
	);
};

export default Dashboard;
