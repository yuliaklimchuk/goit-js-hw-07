import { galleryItems } from './gallery-items.js';

// Change code below this line
const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createGalleryMarkup(images) { 
    return images.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>
        `
    }).join(''); 
}

function onGalleryContainerClick(event) { 
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) { 
        return;
    }
    const urlLargeImg = event.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${urlLargeImg}" width="800" height="600">`)
    instance.show();
    if (instance) { 
        document.addEventListener("keydown", event => {
            if (event.code === 'Escape') { 
                instance.close(() => document.removeEventListener("keydown", () => { }))   
            }
        });
    }
}