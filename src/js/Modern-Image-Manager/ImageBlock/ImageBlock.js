import "./image-block.css";

export default class ImageBlock {
  constructor(data, onError) {
    this.data = data;
    this.element = null;
    this.onError = onError;

    this.create();
    this.addEventListeners();
  }

  create() {
    this.element = document.createElement("div");
    this.element.classList.add("image-block");
    this.element.innerHTML = `
        <img  class="image" src=${this.data.url} alt=${this.data.name} data-id=${this.data.id}">
        <button type="button" class="btn-close">
          <span class="sr-only">Close</span>
          <span class="span-close" aria-hidden="true">×</span>
        </button>
      `;

    const btnClose = this.element.querySelector(".btn-close");
    btnClose.addEventListener("click", (e) => {
      e.stopPropagation();
      this.removeImage();
    });
    this.element.addEventListener("click", () => ImageBlock.openImageInNewWindow(this.data.url));
  }

  addEventListeners() {
    const imgElement = this.element.querySelector(".image");
    if (this.onError) {
      imgElement.addEventListener("error", () => {
        this.onError();
        this.element.remove();
      });
    }
    imgElement.addEventListener("load", () =>
      console.log("Image loaded successfully!")
    );
  }

  static openImageInNewWindow(url) {
    window.open(url, "_blank");
  }

  removeImage() {
    this.element.remove();
    URL.revokeObjectURL(this.data.url);
  }
}
