let path="http://"+process.env.REACT_APP_API_URL+":8082/"
export interface AppConfig {    
    API_ENDPOINT : string
  }  
  
export const CONFIG: AppConfig = {
    API_ENDPOINT : path?path:""
  };