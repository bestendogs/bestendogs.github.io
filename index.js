window.addEventListener('DOMContentLoaded', (event) => {
  const imageGrid = document.getElementById("image-grid");
  const cutoffLength = imageData.images.length - (imageData.images.length % 3);
  const filteredImages = imageData.images.slice(0, cutoffLength);

  filteredImages.forEach(image => {
    const imageContainer = generateImageContainer({ 
      image,
	    isSelected: false,
      onClick: (e) => {
        const overlay = document.getElementById("overlay");
        overlay.innerHTML = '';
        
        const selectedImageContainer = generateImageContainer({
          image,
		      isSelected: true,
          onClick: (e) => {
            overlay.style.display = 'none';
			      overlay.removeChild(selectedImageContainer);
          }
        });

        overlay.appendChild(selectedImageContainer);

		    overlay.style.display = 'block';
      }
    });

    imageGrid.appendChild(imageContainer);
  });

  function generateImageContainer({image, isSelected, onClick}) {	
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image");
    imageContainer.id = isSelected ? 'selected-image' : image.dogId;

    imageContainer.addEventListener("click", onClick);

    const img = document.createElement("img");
    img.src = `${imageData.root}/${image.dogId}.jpg`;
    img.alt = image.alt;

    imageContainer.appendChild(img);

    return imageContainer;
  }
});
