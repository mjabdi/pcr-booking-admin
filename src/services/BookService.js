import API from './api';

export default class BookService {

   
   static changeBackToBookingMade = (id) =>
   {
      return API.post(`/api/book/changebacktobookingmade?id=${id}`);
   }

   static resendEmailsWithBookingId = (bookingId) =>
   {
      return API.post(`/api/book/resendemailswithbookingid?id=${bookingId}`);
   }

   static regenerateFilesWithBookingId  = (bookingId) =>
   {
      return API.post(`/api/book/regeneratefileswithbookingid?id=${bookingId}`);
   }


   static resendEmails  = (linkId) =>
   {
      return API.post(`/api/book/resendemails?id=${linkId}`);
   }

   static regenerateFiles  = (linkId) =>
   {
      return API.post(`/api/book/regeneratefiles?id=${linkId}`);
   }

   static matchRecords  = (bookingId, linkId) =>
   {
      return API.post(`/api/book/matchrecords?bookingid=${bookingId}&linkid=${linkId}`);
   }

   static findBestMatches = (id) =>
   {
      return API.get(`/api/book/getbestmatchedbookings?id=${id}`);
   } 

   static getLinkDetails = (id) =>
   {
      return API.get(`/api/book/getlinkdetails?id=${id}`);
   } 

   static getLinkDetailsWithBookingId = (id) =>
   {
      return API.get(`/api/book/getlinkdetailswithbookingid?id=${id}`);
   } 



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

    static getBookingById = (id) =>
    {
       return API.get(`/api/book/getbookingbyid?id=${id}`);
    }

    static getAllBookings= () =>
    {
       return API.get(`/api/book/getallbookings`);
    }

    static getLateBookings= () =>
    {
       return API.get(`/api/book/getlatebookings`);
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