export const API_URL =  process.env.REACT_APP_ENV === "prod" ? '/api' : 'https://localhost/api';

export const IRI = "/api"; 

export const API_LOGIN = "/login"; 
export const API_LOGOUT = "/logout"; 
export const API_COMMENTS= "/comments";
export const API_CURRENT_USER = "/current_user";
export const API_ASSURANCES = "/assurances";
export const API_DOCTORS = "/doctors";
export const API_MANDATES = "/mandates";
export const API_MANDATE_GROUPS = "/mandate_groups";
export const API_MEDIAS = "/media_objects";
export const API_MISSIONS = "/missions";
export const API_PATIENTS = "/patients";
export const API_PARTNERS = "/partners";
export const API_PRESCRIPTIONS = "/prescriptions";
export const API_SERVICES = "/services";
export const API_USERS = "/users";
export const API_PASSWORD = "/forgot_password/";

export const itemsPerPage = 40