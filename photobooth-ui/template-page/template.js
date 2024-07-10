

//const randomWord = ['Great choice', 'Excellent pick', 'Fine selection', 'Superb choice', 'Wonderful pick', 'Fantastic pick', 'Brilliant  choice', 'Splendid choice', 'Awesome pick', 'Nice choice', 'Good Taste'];

const takePhotoBtn = document.getElementById('takePhotoBtn');
const selectedImageContainer = document.getElementById('selectedImageContainer');
const selectedImage = document.getElementById('selectedImage');
const backIcon = document.getElementById('backIcon');

const displayCategory = document.querySelector('.displayCategory');
const displayContent = document.querySelector('.displayContent');
const category = document.querySelector('.category');
const categoryContainer = document.querySelector('.categoryContainer');
const gallery = document.querySelector('.gallery');

const data = [
    {
        id: 1,
        text: `category 1`,
        icon1: 'fa-solid',
        icon2: 'fa-folder'
    },
    {
        id: 2,
        text: `category 2`,
        icon1: 'fa-solid',
        icon2: 'fa-folder'
    },
    {
        id: 3,
        text: `category 3`,
        icon1: 'fa-solid',
        icon2: 'fa-folder'
    },
    {
        id: 4,
        text: `category 4`,
        icon1: 'fa-solid',
        icon2: 'fa-folder'
    },
];

data.map(obj => {
    const div = document.createElement('div');
    const icon = document.createElement('i');
    const text = document.createElement('p');
    div.onclick = function(){handleCategory()};
    div.classList.add('category');
    icon.classList.add(obj.icon1, obj.icon2);
    text.textContent = obj.text
    div.appendChild(icon);
    div.appendChild(text);
    categoryContainer.appendChild(div);
})

takePhotoBtn.addEventListener('click', () => {
    if(!selectedImage.src){
        alert('Please Select a Template!')
    } else{
        window.location.href = '../start-photo/start-photo.html'
    }
})

const selectImage = (imgElement) => {
    const images = document.querySelectorAll('.gallery img');
    images.forEach(img => img.classList.remove('selected'));
    imgElement.classList.add('selected');
    //const randomNum = Math.floor(Math.random() * randomWord.length);
    selectedImage.src = imgElement.src;
}

backIcon.addEventListener('click', () => {
    displayContent.style.display = 'none';
    displayCategory.style.display = 'flex';
    selectedImage.removeAttribute('src');
})

const handleCategory = () => {
    displayCategory.style.display = 'none';
    displayContent.style.display = 'flex';
}