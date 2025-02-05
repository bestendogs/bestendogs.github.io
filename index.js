let gridImages = Array.from(images);

window.addEventListener('DOMContentLoaded', (event) => {
	const imageGrid = document.getElementById("image-grid");

	for (let i in gridImages) {
		const imageContainer= document.createElement("div");
		imageContainer.classList.add("image");

		const img = document.createElement("img");
		img.src = gridImages[i].url;
		imageContainer.appendChild(img);

		imageGrid.appendChild(imageContainer);
	}
});