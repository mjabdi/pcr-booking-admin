import API from './api';

export default class BookService {

   static findBookingByRefBirthDate = (bookingRef, birthDate) =>
   {
      return API.get(`/api/book/getbookingsbyrefandbirthdate?ref=${bookingRef}&birthdate=${birthDate}`);
   }

   static updateBooking = (payload) =>
   {
      return API.post(`/api/book/updatebookappointment`, payload);
   } 

   static updateBookingTime = (payload) =>
   {
      return API.post(`/api/book/updatebookappointmenttime`, payload);
   } 

   static deleteBooking = (id) =>
   {
      return API.post(`/api/book/deletebookappointment?id=${id}`);
   } 

   static unDeleteBooking = (id) =>
   {
      return API.post(`/api/book/undeletebookappointment?id=${id}`);
   } 
   
   
    static getBookingsByRef = (ref) =>
    {
       return API.get(`/api/book/getbookingsbyref?ref=${ref}`);
    }

    static getAllBookings= () =>
    {
       return API.get(`/api/book/getallbookings`);
    }

    static getDeletedBookings= () =>
    {
       return API.get(`/api/book/getdeletedbookings`);
    }

    static getLiveBookings= () =>
    {
       return API.get(`/api/book/getlivebookings`);
    }

    static getCompletedBookings= () =>
    {
       return API.get(`/api/book/getcompletedbookings`);
    }

    static getPositiveBookings= () =>
    {
       return API.get(`/api/book/getpositivebookings`);
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

    static getUnmatchedRecords= () =>
    {
       return API.get(`/api/book/getunmatchedrecords`);
    }

    static getUnmatchedRecordsArchived= () =>
    {
       return API.get(`/api/book/getunmatchedrecordsarchived`);
    }

    static archiveRecord = (id) =>
    {
       return API.post(`/api/book/archiverecord?id=${id}`);
    }

    static unArchiveRecord = (id) =>
    {
       return API.post(`/api/book/unarchiverecord?id=${id}`);
    }


}