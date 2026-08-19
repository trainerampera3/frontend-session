let images = [
    "image_1.jpeg",
    "image_2.jpeg",
    "image_3.jpeg"
];

let index = 0;

let image = document.getElementById("image");
let next = document.getElementById("next");
let prev = document.getElementById("prev");

next.addEventListener("click", function() {
    index++;

    if (index >= images.length) {
        index = 0;
    }

    image.src = images[index];
});

prev.addEventListener("click", function() {
    index--;

    if (index < 0) {
        index = images.length - 1;
    }

    image.src = images[index];
});
setInterval(function() {
    next.click();
}, 2000);





let carouselImages = document.getElementById("images");

let carouselNext = document.getElementById("next_1");
let carouselPrev = document.getElementById("prev_1");

let position = 0;

carouselNext.addEventListener("click", function () {
    position=position+200
    if(position>1200){
        position=0
    }

    carouselImages.style.transform = `translateX(${position}px)`;
});

carouselPrev.addEventListener("click", function () {

    position=position-200
    if(position<-1200){
        position=0
    }
 

    carouselImages.style.transform = `translateX(${position}px)`;
});

let time=document.getElementById('time')
let cur=new Date()
time.innerHTML=cur.getFullYear()