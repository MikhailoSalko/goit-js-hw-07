import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const galleryEl = document.querySelector(".gallery");
// console.log(galleryEl);

const markupToGallery = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      loading='lazy'
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
  )
  .join("");

// console.log(markupToGallery);

galleryEl.insertAdjacentHTML("afterbegin", markupToGallery);

function onClickImgToOpenModal() {
  const openImgInModal = basicLightbox.create(
    `
      <img src="${event.target.dataset.source}" width="1280" height="auto">
  `
  );
  openImgInModal.show();

  const handleKeydownClick = (event) => {
    // console.log(event);
    if (event.code === "Escape") {
      // console.log(event);
      openImgInModal.close();
      window.removeEventListener("keydown", handleKeydownClick);
    }
  };

  window.addEventListener("keydown", handleKeydownClick);

  if (openImgInModal.visible()) {
    window.addEventListener("keydown", handleKeydownClick);
  } else {
    window.removeEventListener("keydown", handleKeydownClick);
  }

  return openImgInModal;
}

const handleImgClick = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  onClickImgToOpenModal();
};

galleryEl.addEventListener("click", handleImgClick);
