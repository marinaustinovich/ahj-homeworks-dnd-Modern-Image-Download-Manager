import createImageBlock from './createImageBlock';
import isValidUrl from './isValidUrl';
import Picture from './Picture';

export default class Gallery {
  constructor() {
    this.container = null;
    this.images = [];
    this.list = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;

    this.drawUi();
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Gallery not bind to DOM');
    }
  }

  drawUi() {
    this.checkBinding();
    this.container.innerHTML = `
    <div class="gallery-field-wrapper">
      <div class="gallery-field gallery-field_form">
            <form name="imageForm">
              <div class="title-wrapper">
                <label class="title title_label" for="name-image">Название</label>
                <input class="gallery-field__input" data-id="image" type="text" name="name" placeholder="Enter title of your picture" autocomplete="off" required>
              </div>
                
              <div class="title-wrapper">
                <label class="title title_label" for="url-image">Ссылка на изображение</label>
                <input class="gallery-field__input" type="url" name="url" placeholder="//johndoe.png|webp|avif|gif|svg" autocomplete="off" required pattern="(https?://.*.(png|webp|avif|gif|svg)$)">
              </div>
              <div class="error-url hidden">Неверный URL изображения</div>
              <button class="btn-add" type="submit">Добавить</button>
            </form>
            
          </div>
          <div class="gallery-field">
            <input data-id="file" class="overlapped" type="file" accept="image/*">
            <span data-id="overlap" class="title overlap">Drag and Drop files here <br> or Click to select</span>
          </div>
    </div>
    <div class="gallery-list"></div>
      `;
    this.list = document.querySelector('.gallery-list');
    this.events();
  }

  events() {
    const btn = document.querySelector('.btn-add');
    const fileEl = document.querySelector('[data-id=file]');
    const overlapEl = document.querySelector('[data-id=overlap]');
    btn.addEventListener('click', () => this.addImage());
    overlapEl.addEventListener('click', () => fileEl.dispatchEvent(new MouseEvent('click')));
    fileEl.addEventListener('change', (e) => this.onChange(e));
  }

  async addImage() {
    const formData = document.forms.imageForm;
    const url = formData.url.value;
    const name = formData.name.value;

    if (url !== '' && isValidUrl(url)) {
      const image = new Picture(name, url, Date.now());
      this.images.push(image);

      createImageBlock(image, this.list);
      formData.reset();
    }
  }

  onChange(e) {
    const data = e.target.files[0];
    const reader = new FileReader();

    if (data.type.startsWith('image/')) {
      reader.onload = (event) => {
        const image = new Picture(data.name, event.target.result, Date.now());
        this.images.push(image);
        createImageBlock(image, this.list);
      };
      reader.readAsDataURL(data);
    } else {
      reader.onload = (event) => {
        document.querySelector('.file-container').appendChild(document.createTextNode(event.target.result));
      };
      reader.readAsText(data);
    }
  }
}
