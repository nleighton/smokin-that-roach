const dynamicBackground = document.querySelector('.dynamic-background');
let spheres = [];
let spheresMap = [];

// Function to create spheres
function createSpheres() {
    // Only create spheres once if not already created
    if (spheres.length === 0) {
        const numberOfSpheres = 100; // Increase number of spheres for more depth
        for (let i = 0; i < numberOfSpheres; i++) {
            const sphere = document.createElement('div');
            sphere.classList.add('sphere');
            const size = Math.random() * 100 + 50; // Random size between 50px and 150px

            const dx = Math.random();
            const dy = Math.random();

            const x = dx * window.innerWidth;
            const y = dy * window.innerHeight;

            // Apply a slight blur effect to all spheres
            const blurAmount = Math.random() * 5 + 2; // Random blur between 2px and 7px
            const opacityAmount = Math.random() * 0.5 + 0.3; // Random opacity between 0.3 and 0.8

            sphere.style.width = `${size}px`;
            sphere.style.height = `${size}px`;
            sphere.style.top = `${y}px`;
            sphere.style.left = `${x}px`;
            sphere.style.filter = `blur(${blurAmount}px)`; // Apply random slight blur to each sphere
            sphere.style.opacity = opacityAmount; // Apply random opacity for more depth
            dynamicBackground.appendChild(sphere);
            spheresMap.push({
                sphere: sphere,
                x: dx,
                y: dy
            })
        }
    }
}

var offsetX;
var offsetY;

// Function to adjust spheres when resizing the window
function adjustSpheres() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    spheresMap.forEach(map => {
        let sphere = map.sphere;
        let x = map.x;
        let y = map.y;

        sphere.style.left = `${(x + offsetX) * width}px`;
        sphere.style.top = `${(y + offsetY) * height}px`;
    });
}

let resizeTimeout;
window.addEventListener('resize', function () {
    //clearTimeout(resizeTimeout);
    //resizeTimeout = setTimeout(adjustSpheres, 200); // Adjust spheres after 200ms of stopping resizing
    adjustSpheres();
});

window.addEventListener("mousemove", (e) => {
    const sensitivity = 0.00001; // Adjust this value to tweak the effect strength
    offsetX = (e.pageX - window.innerWidth / 2) * sensitivity; // Horizontal parallax offset
    offsetY = (e.pageY - window.innerHeight / 2) * sensitivity; // Vertical parallax offset

    adjustSpheres();
})

window.addEventListener('pageshow', () => {
    var opacity = 100;
    document.querySelector("#fade-in").style = `z-index: 999; opacity: ${opacity}%; padding: 100%; position:absolute; background-color: black; color: black;`
    setTimeout(() => {
        let loop = setInterval(() => {
            opacity -= 0.5;
            document.querySelector("#fade-in").style = `z-index: 999; opacity: ${opacity}%; padding: 100%; position:absolute; background-color: black; color: black;`
            if (opacity < 0) {
                clearInterval(loop);
                document.querySelector("#fade-in").remove();
            }
        }, 1);
    }, 250);
})

// Call createSpheres once when the page loads
createSpheres();