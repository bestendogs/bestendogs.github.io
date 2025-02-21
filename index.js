const imageIds = Object.keys(imageData.images).sort();
console.log(imageIds);
window.addEventListener('DOMContentLoaded', (event) => {
	const imageGrid = document.getElementById("image-grid");

	imageIds.forEach(id => {
		image = imageData.images[id];
		console.log(id);
		const imageContainer= document.createElement("div");
		imageContainer.classList.add("image");

		const img = document.createElement("img");
		img.src = getImgUrl(id);
		img.alt = image.alt;
		imageContainer.appendChild(img);

		imageGrid.appendChild(imageContainer);
	});
});

function getImgUrl(imageId) {
	return `${imageData.root}/dog_${imageId}.jpg`;
}