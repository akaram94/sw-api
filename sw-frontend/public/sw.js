window.onload = function() {
    var
    // Obtain a reference to the canvas element using its id.
    htmlCanvas = document.getElementById("stars"),
    // Obtain a graphics context on the canvas element for drawing.
    context = htmlCanvas.getContext("2d");

  // Start listening to resize events and draw canvas.
  initialize();

  function initialize() {
    // Register an event listener to call the resizeCanvas() function 
    // each time the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    // Draw canvas border for the first time.
    resizeCanvas();
  }

  // Display custom canvas for stars.
  function redraw() {
      stars = 300;

      for (var i = 0; i < stars; i++) {
          var x = Math.random() * htmlCanvas.offsetWidth;
          y = Math.random() * htmlCanvas.offsetHeight,
          radius = Math.random() * 1.2;
          context.beginPath();
          context.arc(x, y, radius, 0, 360);
          context.fillStyle = "white";
          context.fill();
      }
  }

  // Runs each time the DOM window resize event fires.
  // Resets the canvas dimensions to match window,
  // then draws the new borders accordingly.
  function resizeCanvas() {
    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;
    redraw();
  }
};