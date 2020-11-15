import API from './api';

export default class BookService {

   static updateBooking = (payload) =>
   {
      return API.post(`/api/book/updatebookappointment`, payload);
   } 
   
    static getBookingsByRef = (ref) =>
    {
       return API.get(`/api/book/getbookingsbyref?ref=${ref}`);
    }

    static getAllBookings= () =>
    {
       return API.get(`/api/book/getallbookings`);
    }

    static getLiveBookings= () =>
    {
       return API.get(`/api/book/getlivebookings`);
    }

    static getCompletedBookings= () =>
    {
       return API.get(`/api/book/getcompletedbookings`);
    }


    static getTodayBookings= () =>
    {
       return API.get(`/api/book/gettodaybookings`);
    }

    static getOldBookings= () =>
    {
       return API.get(`/api/book/getoldbookings`);
    }

    static getFutureBookings= () =>
    {
       return API.get(`/api/book/getfuturebookings`);
    }

    static getRecentBookings= () =>
    {
       return API.get(`/api/book/getrecentbookings`);
    }

    static getRecentBookingsAll= () =>
    {
       return API.get(`/api/book/getrecentbookingsall`);
    }

}