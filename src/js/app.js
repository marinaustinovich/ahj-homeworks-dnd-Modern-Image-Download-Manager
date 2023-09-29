import FilesTable from './Download-Manager/FilesTable';
import Gallery from './Modern-Image-Manager/Gallery';

/* eslint-disable */
console.log('it works!');

const gallery = new Gallery();
gallery.bindToDOM(document.querySelector('.gallery-container'));

const filesTable = new FilesTable();
filesTable.bindToDOM(document.querySelector('.download-container'));