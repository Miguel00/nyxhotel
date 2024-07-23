import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://a7a4-2806-10be-8-2ebf-a118-39d-5ce4-b5d8.ngrok-free.app/';

class UserService {

  getRestaurants() {
    return axios.get(API_URL + 'restaurants', { headers: authHeader() });
  }

  checkAvailability(idReservation) {
    return axios.post(API_URL + 'client-validation', idReservation);
  }

  createReservation(reservation) {
    console.log("D4ta: ", reservation)
    return axios.post(API_URL + 'reservations', reservation, { headers: authHeader() });
  }

  deleteReservation(idReservation) {
    return axios.delete(API_URL + 'reservations/'+idReservation.id,{ headers: authHeader() });
  }

  verifyReservation(reservation) {
    return axios.post(API_URL + 'client-validation/validate-dates', reservation);
  }

  preCheckAvailability(reservation) {
    return axios.post(API_URL + 'client-validation/availability', reservation);
  }

  getReservations() {
    return axios.get(API_URL + 'reservations', { headers: authHeader() });
  }

  getAvailabilityReservations() {
    return axios.get(API_URL + 'restaurant-availabilities', { headers: authHeader() });
  }

  dateRange(dateRange) {
    return axios.post(API_URL + 'restaurant-availabilities/update-date-range', dateRange, { headers: authHeader() });
  }

  getPublicContent() {
    return axios.get(API_URL + 'restaurants');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
