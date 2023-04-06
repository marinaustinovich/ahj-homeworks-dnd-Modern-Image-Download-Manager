import filePathStorage from '../../files/Storage_Standard.pdf';
import filePathStreams from '../../files/Streams Standard.pdf';
import filePathXMLHttpRequest from '../../files/XMLHttpRequest_Standard.pdf';

const responseStorage = await fetch(filePathStorage);
const responseStreams = await fetch(filePathStreams);
const responseXMLHttpRequest = await fetch(filePathXMLHttpRequest);
/* eslint-disable */
export default function getFiles() {
  if (responseStorage && responseStreams && responseXMLHttpRequest) {
    return [
      {
        name: 'Storage Standard',
        weight: 303,
        weightUnit: '  КБ',
        url: responseStorage.url,
      },
      {
        name: 'Streams Standard',
        weight: 1.61,
        weightUnit: '  MБ',
        url: responseStreams.url,
      },
      {
        name: 'XMLHttpRequest Standard',
        weight: 813,
        weightUnit: '  КБ',
        url: responseXMLHttpRequest.url,
      },
    ];
  }
}
