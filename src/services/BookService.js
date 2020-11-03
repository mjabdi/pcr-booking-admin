import API from './api';

export default class BookService {

    static getBookingsByRef = (ref) =>
    {
       return API.get(`/api/book/getbookingsbyref?ref=${ref}`);
    }

}