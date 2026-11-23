
// =================================
// PATRIOT MOBILE AUTO REPAIR
// =================================

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");


// STICKY HEADER

function updateHeader() {
    header.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );
}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


// MOBILE NAVIGATION

function closeMenu() {
    navigation.classList.remove("open");
    menuToggle.classList.remove("active");
    header.classList.remove("menu-active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}


menuToggle.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    header.classList.toggle("menu-active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

});


document.querySelectorAll(".navigation a").forEach(link => {

    link.addEventListener("click", closeMenu);

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape" &&
        navigation.classList.contains("open")) {

        closeMenu();
        menuToggle.focus();

    }

});


window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
        closeMenu();
    }

});


// SERVICE CATEGORY SELECTOR

const tabs = document.querySelectorAll(".service-tab");
const panels = document.querySelectorAll("[data-panel]");


tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const selectedCategory = tab.dataset.category;

        tabs.forEach(item => {

            const active = item === tab;

            item.classList.toggle("active", active);

            item.setAttribute(
                "aria-pressed",
                String(active)
            );

        });


        panels.forEach(panel => {

            panel.hidden =
                panel.dataset.panel !== selectedCategory;

        });

    });

});


// CUSTOMER REPUTATION CAROUSEL
// These are review themes, not direct customer quotations.

const reviews = [

    {
        title: "Honest Communication",
        text: "Customers appreciate straightforward explanations and knowledgeable automotive advice."
    },

    {
        title: "Convenient Mobile Service",
        text: "Professional automotive service at a customer's location reduces the inconvenience of visiting a traditional repair shop."
    },

    {
        title: "Knowledgeable Diagnostics",
        text: "A thorough approach to identifying automotive problems helps customers better understand their vehicle's needs."
    },

    {
        title: "Personal Accountability",
        text: "Patriot's reputation emphasizes a personal approach to service and a willingness to explain repair decisions."
    }

];


let currentReview = 0;

const reviewTitle = document.getElementById("reviewTitle");
const reviewText = document.getElementById("reviewText");
const reviewDots = document.getElementById("reviewDots");


// CREATE DOT NAVIGATION

reviews.forEach((review, index) => {

    const dot = document.createElement("button");

    dot.className = "review-dot";

    dot.setAttribute(
        "aria-label",
        `Show reputation theme ${index + 1}`
    );

    dot.addEventListener("click", () => {

        showReview(index);

    });

    reviewDots.appendChild(dot);

});


// DISPLAY SELECTED REVIEW THEME

function showReview(index) {

    currentReview =
        (index + reviews.length) % reviews.length;

    reviewTitle.textContent =
        reviews[currentReview].title;

    reviewText.textContent =
        reviews[currentReview].text;


    document.querySelectorAll(".review-dot")
        .forEach((dot, index) => {

            const active = index === currentReview;

            dot.classList.toggle("active", active);

            dot.setAttribute(
                "aria-pressed",
                String(active)
            );

        });

}


document.getElementById("previousReview")
    .addEventListener("click", () => {

        showReview(currentReview - 1);

    });


document.getElementById("nextReview")
    .addEventListener("click", () => {

        showReview(currentReview + 1);

    });


showReview(0);


// SCROLL REVEAL ANIMATIONS

if ("IntersectionObserver" in window) {

    document.documentElement.classList.add("js");

    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.05
        }

    );


    document.querySelectorAll(".reveal")
        .forEach(element => {

            revealObserver.observe(element);

        });

}


// DYNAMIC FOOTER YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();
