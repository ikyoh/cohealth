// from .env
export const ENV = process.env.REACT_APP_ENV;
export const URL = ENV === "dev" ? "http://localhost:9000" : '';
export const API_URL = URL + '/api';


export const API_AUTHENTICATION = API_URL + "/login_check"; 
export const API_COMMENTS= API_URL + "/comments";
export const API_CURRENT_USER = API_URL + "/current_user";
export const API_ASSURANCES = API_URL + "/assurances";
export const API_DOCTORS = API_URL + "/doctors";
export const API_MEDIAS = API_URL + "/media_objects";
export const API_MISSIONS = API_URL + "/missions";
export const API_PATIENTS = API_URL + "/patients";
export const API_PARTNERS = API_URL + "/partners";
export const API_PRESCRIPTIONS = API_URL + "/prescriptions";
export const API_SERVICES = API_URL + "/services";
export const API_USERS = API_URL + "/users";