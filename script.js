// Button
// Start at top when page loads
window.onload = function () {
    window.scrollTo(0, 0);
};

// Prevent scrolling while loader is visible
document.body.classList.add("loading");

const openInvite = document.getElementById("openInvite");

openInvite.addEventListener("click", function () {

    const envelope = document.querySelector("#loader .envelope");
    const loader = document.getElementById("loader");

    // Open the flap
    envelope.classList.add("open");

    // Start flower petals
    createPetals();

    // Wait for opening animation
    setTimeout(function () {

        // Fade out loader
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        // Remove loader completely
        setTimeout(function () {

            loader.remove();

            document.body.classList.remove("loading");

            // Show hero section
            document.getElementById("home").scrollIntoView({
                behavior: "smooth"
            });

        }, 800);

    }, 1200);

});


const exploreBtn = document.getElementById("exploreBtn");

exploreBtn.addEventListener("click", () => {

    document.querySelector(".events").scrollIntoView({
        behavior: "smooth"
    });

});

// Countdown
const weddingDate = new Date("October 25, 2026 12:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) return;

    document.getElementById("days").textContent =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").textContent =
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("minutes").textContent =
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("seconds").textContent =
        Math.floor((distance % (1000 * 60)) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);
function createPetals(){

    const container = document.getElementById("petals");

    for(let i=0;i<40;i++){

        const petal=document.createElement("div");

        petal.classList.add("petal");

        petal.style.left=Math.random()*100+"vw";

        petal.style.animationDuration=(4+Math.random()*3)+"s";

        petal.style.animationDelay=(Math.random()*1)+"s";

        petal.style.transform=`rotate(${Math.random()*360}deg)`;

        container.appendChild(petal);

        setTimeout(()=>{

            petal.remove();

        },7000);

    }

}
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");
const status = document.getElementById("status");

uploadBtn.addEventListener("click", () => {

    fileInput.click();

});

fileInput.addEventListener("change", async () => {

    const files = fileInput.files;

    if(files.length===0) return;

    for(let i=0;i<files.length;i++){

        const formData = new FormData();

        formData.append("file", files[i]);

        formData.append("upload_preset","wedding_upload");

        status.innerHTML="Uploading "+files[i].name;

        const xhr = new XMLHttpRequest();

        xhr.open(
            "POST",
            "https://api.cloudinary.com/v1_1/n7gdozqb/auto/upload"
        );

        xhr.upload.onprogress=(e)=>{

            const percent=Math.round((e.loaded/e.total)*100);

            progressBar.style.width=percent+"%";

        };

        xhr.onload=()=>{

            progressBar.style.width="100%";

            status.innerHTML = `
<div class="success-card">

<h3>🎉 Thank You!</h3>

<p>Your memories have been uploaded successfully.</p>

<p>May Allah bless you ❤️</p>

</div>
`;

        };

        xhr.onerror=()=>{

            status.innerHTML="❌ Upload Failed";

        };

        xhr.send(formData);

    }

});
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", function () {

    reveals.forEach(function (element) {

        const top = element.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            element.classList.add("active");

        }

    });

});