const dynamicBackground = document.querySelector('.dynamic-background');
        let spheres = [];

        // Function to create spheres
        function createSpheres() {
            // Only create spheres once if not already created
            if (spheres.length === 0) {
                const numberOfSpheres = 50; // Increase number of spheres for more depth
                for (let i = 0; i < numberOfSpheres; i++) {
                    const sphere = document.createElement('div');
                    sphere.classList.add('sphere');
                    const size = Math.random() * 100 + 50; // Random size between 50px and 150px
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;

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
                    spheres.push(sphere); // Store the sphere reference
                }
            }
        }

        // Function to adjust spheres when resizing the window
        function adjustSpheres() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            spheres.forEach(sphere => {
                // Adjust positions of spheres on resize
                const randomX = Math.random() * width;
                const randomY = Math.random() * height;

                sphere.style.left = `${randomX}px`;
                sphere.style.top = `${randomY}px`;
            });
        }

        // Debounce function to limit the frequency of the resize event handler
        let resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(adjustSpheres, 200); // Adjust spheres after 200ms of stopping resizing
        });

        // Call createSpheres once when the page loads
        createSpheres();