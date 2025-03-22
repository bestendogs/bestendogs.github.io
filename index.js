window.addEventListener('DOMContentLoaded', (event) => {
  const imageGrid = document.getElementById("image-grid");
  const cutoffLength = imageData.images.length - (imageData.images.length % 3);
  let filteredImages = imageData.images.slice(0, cutoffLength);

  let draggedImg = null;

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

    imageContainer.addEventListener("dblclick", onClick);
    

    const img = document.createElement("img");
    img.src = `${imageData.root}/${image.dogId}.jpg`;
    img.alt = image.alt;
    img.setAttribute('data-dog-id', image.dogId);
    img.draggable = true;

    let clickCount = 0;
  
    imageContainer.addEventListener('click', () => {
      clickCount++;
  
      if (clickCount === 1) {
        // Wait for a possible double click
        setTimeout(() => {
          if (clickCount === 1) {
            // Single click: flip the image
            img.classList.toggle('flipped');
          }
          clickCount = 0;
        }, 250); // Timeout for double-click detection
      }
    });

    imageContainer.addEventListener("dblclick", onClick)

    imageContainer.addEventListener("dragstart", (e) => {
      if (e.target.tagName === "IMG") {
        draggedImg = e.target;
        console.log(draggedImg);
        
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", "dragging"); // Needed for Firefox
      }
    });
    
    imageContainer.addEventListener("dragover", (e) => {
      console.log(draggedImg);
      
      e.preventDefault(); // Necessary to allow drop
    });
    
    imageContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      
      if (!draggedImg || e.target === draggedImg || e.target.tagName !== "IMG") return;
    
      // Swap images
      [draggedImg.src, e.target.src] = [e.target.src, draggedImg.src];
      [draggedImg.alt, e.target.alt] = [e.target.alt, draggedImg.alt];
      [draggedImg.dataset.dogId, e.target.dataset.dogId] = [e.target.dataset.dogId, draggedImg.dataset.dogId];

      draggedImg = null; // Reset after drop
    });

    imageContainer.addEventListener("dragend", () => {
      draggedImg = null; // Reset after drop
    });

    imageContainer.appendChild(img);

    return imageContainer;
  }
});
