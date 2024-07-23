document.addEventListener("DOMContentLoaded", function() {
    const filters = document.querySelectorAll(".card-image");
    const images1 = document.getElementById("img1");
    const images2 = document.getElementById("img2");

    filters.forEach(filter => {
        filter.addEventListener("click", function() {
        // Remove the 'selected' class from all items
            filters.forEach(filter => {
            filter.classList.remove("selected");
        });

        // Add the 'selected' class to the clicked item
        this.classList.add("selected");
        // Get the label text from the clicked item's <label>
        const label = this.querySelector("p").textContent.trim();
        // Add the class to the image
        images1.className = "img img1"; // clear existing classes
        images2.className = "img img2"; // clear existing classes
        images1.classList.add(`filter-${label.toLowerCase()}`); // add the label text as class
        images2.classList.add(`filter-${label.toLowerCase()}`); // add the label text as class
        });
    });
});

const nextBtn = () => {
    const loading = document.querySelector('.loadingContainer');
    loading.style.display = 'flex';
    setTimeout(function(){
        window.location.href = "../sharing-page/sharing-page.html"
    }, 2000);
}