import getFiles from './getFiles';
import './files-table.css';

export default class FilesTable {
  constructor() {
    this.container = null;
    this.table = null;
  }

  bindToDOM(container) {
    this.container = container;

    this.drawUi();
    this.events();
  }

  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="table-field">
        <div class="title title-file">Avialable files (without sms and registration):</div>
      </div>
      <div class="title title-file">You have already downloaded: <span id="weight-sum">0</span> Mb</div>
      <div class="iframe-list"></div>
      `;

    getFiles().forEach((file) => this.createFile(file));
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Table not bind to DOM');
    }
  }

  events() {
    const downloadItems = this.container.querySelectorAll('a');
    downloadItems.forEach((a) => {
      a.addEventListener('click', (e) => this.download(e));
    });
  }

  createFile(o) {
    const file = document.createElement('div');
    file.classList.add('file');
    let dataWeight = o.weight;
    if (o.weightUnit === '  КБ') {
      dataWeight = o.weight / 1000;
    }
    file.innerHTML = `
      <span class="file-name">${o.name}</span>
      <span class="file-weight">${o.weight}${o.weightUnit}</span>
      <a class="download-link" href="${o.url}" download="${o.name}.pdf" data-weight="${dataWeight}">Download</a>
    `;
    const tableField = this.container.querySelector('.table-field');
    tableField.append(file);
  }

  download(e) {
    e.preventDefault();

    const weightSum = document.getElementById('weight-sum');
    weightSum.innerText = +weightSum.innerText + +e.target.dataset.weight;

    const iframeField = this.container.querySelector('.iframe-list');

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('iframe');

    const iframeFile = document.createElement('iframe');
    iframeFile.src = e.target.href;
    containerDiv.appendChild(iframeFile);

    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.classList.add('btn-close');
    btnClose.innerHTML = `
        <div class='preview-file'>
          <span class="sr-only">Close</span>
          <span class="span-close" aria-hidden="true">×</span>
        </div>
    `;

    btnClose.addEventListener('click', () => {
      iframeField.removeChild(containerDiv);
    });

    containerDiv.appendChild(btnClose);
    iframeField.appendChild(containerDiv);
}
}
