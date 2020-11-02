import API from './api';

export default class PDFService {

    static downloadCovidForm1 = (id) =>
    {
       return API.get(`/api/pdf/downloadcovidform1?id=${id}`, {
        responseType: 'arraybuffer',
        id: id,
        headers: {
            Accept: 'application/pdf',
        }
        });
    }

    static downloadCovidForm2 = (id) =>
    {
       return API.get(`/api/pdf/downloadcovidform2?id=${id}`, {
        responseType: 'arraybuffer',
        headers: {
            Accept: 'application/pdf',
        }
        });
    }


}