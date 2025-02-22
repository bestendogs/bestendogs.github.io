/* Init state */
const imageIds = Object.keys(imageData.images).sort();

window.addEventListener('DOMContentLoaded', (event) => {
  const imageGrid = document.getElementById("image-grid");

  imageIds.forEach(id => {
    const imageContainer = generateImageContainer({ 
      id: id,
	  isSelected: false,
      onClick: (e) => {
        const overlay = document.getElementById("overlay");

        const selectedImageContainer = generateImageContainer({
          id: id,
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

  function generateImageContainer({id, isSelected, onClick}) {	
	const image = imageData.images[id];	
    const dogId = `dog_${id}`;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image");
    imageContainer.id = isSelected ? 'selected-image' : dogId;

    imageContainer.addEventListener("click", onClick);

    const img = document.createElement("img");
    img.src = `${imageData.root}/${dogId}.jpg`;
    img.alt = image.alt;

    imageContainer.appendChild(img);

    return imageContainer;
  }
});
