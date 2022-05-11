import { IonButton, IonCard,IonButtons,IonBackButton, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonIcon, IonNote, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { arrowForward, navigateOutline } from 'ionicons/icons';
import { RatingStar } from '../components/RatingStar';
import RecordsStore from '../store/RecordsStore';
import { fetchRecords } from '../store/Selectors';

import styles from "../styles/ViewAll.module.scss";

const Tab2 = () => {

	const records = RecordsStore.useState(fetchRecords);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
				<IonTitle className='my_iontitle'>Explore Storage Points</IonTitle>
				<IonButtons slot="start">
				<IonBackButton size="small"/>
				</IonButtons>
					
				</IonToolbar>
				
			</IonHeader>
			<IonContent fullscreen>

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
								
								<IonText className='price'>
								₹​{record.price}
								</IonText>
								

								<IonCardSubtitle className='my_iontitle'>{ record.name }</IonCardSubtitle>
								<IonNote color="medium">{ record.displayAddress }</IonNote>

								<IonRow className="ion-justify-content-between ion-align-items-center">
									<IonText color="primary">
										<p>
											<IonIcon icon={ navigateOutline } />
											{ record.distance } miles away
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
		</IonPage>
	);
};

export default Tab2;
