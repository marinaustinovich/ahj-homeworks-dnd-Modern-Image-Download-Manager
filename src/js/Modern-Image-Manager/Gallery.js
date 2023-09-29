import ImageBlock from "./ImageBlock/ImageBlock";
import Picture from "./Picture";
import "./gallery.css";

export default class Gallery {
  constructor() {
    this.container = null;
    this.images = [];
    this.list = null;
    this.previewImage = null;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;

    this.drawUi();
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error("Gallery not bind to DOM");
    }
  }

  drawUi() {
    this.checkBinding();
    this.container.innerHTML = `
      <div class="gallery-field">
        <input data-id="file" class="overlapped" type="file" accept="image/*">
        <div data-id="overlap" class="title overlap">Drag and Drop files here or Click to select</div>
      </div>
      <div class="gallery-list"></div>
      <div class='error hidden'>It's no Picture!</div>
      `;
    this.list = this.container.querySelector(".gallery-list");
    this.fileInput = this.container.querySelector("[data-id=file]");
    this.galleryFieldEl = this.container.querySelector(".gallery-field");

    this.events();
  }

  events() {
    this.galleryFieldEl.addEventListener("click", (e) => {
      if (e.target !== this.fileInput) {
        this.fileInput.dispatchEvent(new MouseEvent("click"));
      }
    });
    this.fileInput.addEventListener("change", () => this.onChange());
  }

  onChange() {
    const file = this.fileInput.files && this.fileInput.files[0];
    if (!file) return;
    if (file.type.startsWith("image/")) {
      const blobUrl = URL.createObjectURL(file);

      const image = new Picture(file.name, blobUrl, Date.now());
      this.images.push(image);
      this.addImage(image);
    } else {
      console.log("no picture");
    }
    this.fileInput.value = null;
  }

  addImage(data) {
    const imageBlock = new ImageBlock(data, Gallery.showError.bind(this));
    this.list.appendChild(imageBlock.element);
  }

  static showError() {
    const container = document.querySelector(".gallery-container");
    const errorEl = container.querySelector(".error");
    errorEl.classList.remove("hidden");
  }
}
