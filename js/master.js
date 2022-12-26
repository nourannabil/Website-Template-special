// Select Landing Page Element

let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgArray = ["image1.jfif", "image2.jfif", "image3.jfif", "image4.jfif", "image5.jfif"]

// Random background option
let backgroundOption = true;

// varibale to control the background interval 
let backgroundInterval;

// make function to random the background images 
function randomizeImgs() {

    if (backgroundOption === true) {
        // Function To Randomize Imgs 
        backgroundInterval = setInterval(() => {
            // Get Random Number 
            let randomNumber = Math.floor(Math.random() * imgArray.length);

            // Change Background Image Url 
            landingPage.style.backgroundImage = 'url("/images/' + imgArray[randomNumber] + '")';
        }, 4000);

    }
}

// call the function to work
randomizeImgs();


// -----------------------------------------------------------------------------------------------
// Click On Toggle Settings Gear

const toggleSettingsGear = document.querySelector(".toggle-settings .settings-icon");

const settingBox = document.querySelector(".settings-box");

toggleSettingsGear.onclick = function () {

    // Toggle Class Fa-spin For Rotation on Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    settingBox.classList.toggle("open");

};

document.addEventListener("click", (e) => {

    if (e.target !== toggleSettingsGear) {

        if (settingBox.classList.contains("open")) {

            settingBox.classList.toggle("open");

        }
    }
});
// ----------------------------------------------------------------------------------------------

// switch color

const colorLi = document.querySelectorAll(".color-list li");

// Loop On All List Items
colorLi.forEach(li => {
    // console.log(li); 

    // Click On Every List Items
    li.addEventListener("click", (e) => {

        // Set Color On Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color)

        //this function response to add and remove the active class 
        handleActive(e);
    });
});

// Check If There's Local Storage Random Background Item
let mainColor = localStorage.getItem("color_option");

// Check If Random Background Local Storage Is Not EMpty
if (mainColor !== null) {

    // Set Color On Root 
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
    // document.documentElement.style.setProperty("--main-color", mainColor);

    // Remove active class from all color list item 
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");

        // Add Active Class On Element With Data-Color === Local Storage Item
        if (element.dataset.color === mainColor) {
            // Add Active Class
            element.classList.add("active");
        }
    })
}

// --------------------------------------------------------------------------------------------

// switch random background option

const randomBackground = document.querySelectorAll(".random-background span");

// Loop On All span 
randomBackground.forEach(span => {

    // Click On Every span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === "yes") {
            // console.log("yes")
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        }
        else {
            // console.log("no")
            backgroundOption = false;
            clearInterval(backgroundInterval);
            randomizeImgs();
            localStorage.setItem("background_option", false)
        }
    });
});


let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;
    }
    else {
        backgroundOption = false;
        clearInterval(backgroundInterval);
    }

    document.querySelectorAll(".random-background span").forEach(element => {

        element.classList.remove("active");
    });

    if (backgroundLocalItem === "true") {
        document.querySelector(".random-background .yes").classList.add("active");
    } else {
        document.querySelector(".random-background .no").classList.add("active");
    }

};

// --------------------------------------------------------------------------------------------

// Select Skills Selector

// fill the span depend on data-progress

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height 
    let windowHeight = this.innerHeight;

    // Window ScrollTop 
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        // this.console.log('Skills Section Reached');

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

        // loop on each span (to assign the style of width)
        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        })
    }
}

// -------------------------------------------------------------------------------------------
// popup Gallery

let ourGallery = document.querySelectorAll(".gallery img");

// Loop on all image that are in the gallery
ourGallery.forEach(image => {
    image.addEventListener("click", (e) => {
        // create element (div) for the overlay
        let overlay = document.createElement("div");
        // create a class for the overlay 
        overlay.className = "popup-overlay";
        //add the overlay to the body in html  body 
        document.body.appendChild(overlay);
        // --------------------------------------------------------------------------------
        // create element (div) for the popupbox 
        let popupBox = document.createElement("div")
        // create a class for the popupbox
        popupBox.className = "popup-box"
        if (image.alt !== null) {
            // create heading 
            let imgHeading = document.createElement("h3");
            // create text to heading  
            let imgText = document.createTextNode(image.alt);
            // Add text to heading 
            imgHeading.appendChild(imgText);
            // Add heading to the popupBox
            popupBox.appendChild(imgHeading);
        }

        // create element (img) for popupImage 
        let popupImage = document.createElement("img");
        // create a class for the popupImage
        popupImage.className = "popup-image";
        // add each image source to popupImage when we click on the image
        popupImage.src = image.src;
        // add popupImage to the popupBox 
        popupBox.appendChild(popupImage);
        // add the popupBox to the body in html
        document.body.appendChild(popupBox);

        // ----------------------------------------------------------------------------------------

        // create a close button 
        let closeButton = document.createElement("span");
        // create the closeButton text (زي علامة الخروج X بدنا نكتب حرف )
        let closeButtonText = document.createTextNode("X");
        // Add closeButtonText to closeButton
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        // Add closeButton to popupBox
        popupBox.appendChild(closeButton);

        // ----------------------------------------------------------------------------------------

        document.addEventListener("click", function (e) {
            if (e.target.className === "close-button") {
                // remove the popupbox
                // e.target.parentNode.remove();
                document.querySelector(".popup-box").remove();
                // remove the overlay 
                document.querySelector(".popup-overlay").remove();
            }

            if (e.target.className == "popup-overlay") {
                // Remove popup Box
                document.querySelector(".popup-box").remove();
                // Remove Overlay
                document.querySelector(".popup-overlay").remove();
            }
        });

    });
});

// -------------------------------------------------------------------------------------------------

// go to the target section using the bullets  
function goToSection(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
            handleActive(e);
        });
    });
};

// select All bullets 
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select All Links 
const allLinks = document.querySelectorAll(".header-area .link");

// call the function two times for the bullets and another time for the links
goToSection(allBullets);
goToSection(allLinks);

// -------------------------------------------------------------------------------------------

function handleActive(ev) {
    // Remove the active class from all childs 
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    });
    // add the active class on the target element
    ev.target.classList.add("active");
}

// -------------------------------------------------------------------------------------------

// select all the options [span] (yes , no)
let bulletsOption = document.querySelectorAll(".bullets-option span");

// select all the bullets from the nav-bullets
let bulletsContainer = document.querySelector(".nav-bullets")

bulletsOption.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "block") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullet_option", "block");
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullet_option", "none");
        }
        // add class active function 
        handleActive(e);

    });
});
// save in localstorge
let bulletLocalItem = localStorage.getItem("bullet_option");

if (bulletLocalItem !== null) {
    // loop on span ( ) 
    bulletsOption.forEach(span => {
        span.classList.remove("active");
    });

    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active")

    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

// --------------------------------------------------------------------------------------------

document.querySelector(".reset-options").onclick = function () {

    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullet_option");
    window.location.reload();

};

// -------------------------------------------------------------------------------

let toggleBtn = document.querySelector(".toggle-icon");

let headLink = document.querySelector(".links-container .link");

toggleBtn.onclick = function (e) {

    // Stop Propagation on the toggle icon
    e.stopPropagation();

    // toggle open class to the toggle-icon (to show the after السهم ال)
    this.classList.toggle("show");

    // toggle open class to the link (اللائحة)
    headLink.classList.toggle("show");

}


document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== headLink) {
        if (headLink.classList.contains("show")) {
            toggleBtn.classList.toggle("show")
            headLink.classList.toggle("show")
        }
    }
});

// Stop Propagation On Menu 
headLink.onclick = function (e) {
    e.stopPropagation();
}
