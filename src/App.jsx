import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon,IonLoading, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { listOutline, mapOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import { AuthContext, useAuthInit } from "./stores/auth";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';


/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import ViewPlace from './pages/ViewPlace';
import LoginPage from './pages/login_page';
import Dashboard from './pages/dashboard';
import EditPlace from './pages/EditPlace';
import SignupPage from './pages/signup_page';

setupIonicReact({});

const App = () => {
  const { loading, auth } = useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }

return (
  <IonApp>
    <AuthContext.Provider value={auth}>
      <IonReactRouter>
        {/* <Route exact path="/login">
          <LoginPage />
        </Route> */}
      <IonTabs>
        <IonRouterOutlet> 
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <SignupPage />
        </Route>
          <Route exact path="/map">
            <Tab1 />
          </Route>
          <Route exact path="/list">
            <Tab2 />
          </Route>
          <Route exact path="/list/:id">
            <ViewPlace />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/dashboard/:id">
            <EditPlace />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/map">
            <IonIcon icon={ mapOutline } />
          </IonTabButton>
          <IonTabButton tab="tab2" href="/list">
            <IonIcon icon={ listOutline } />
          </IonTabButton>
        </IonTabBar>
        </IonTabs>
    </IonReactRouter>
    

   
    </AuthContext.Provider>
  </IonApp>
);
}
export default App;
