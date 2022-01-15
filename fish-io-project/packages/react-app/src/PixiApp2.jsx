import React, { useRef, useEffect } from "react";
import { Application } from "pixi.js";

function MyComponent() {
    // On first render create our application
    const app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x5BBA6F,
    });

    // Add app to DOM
    if (newRef.current != null) {
    newRef.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();
}
    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };

 
  return <div ref={newRef} />;
}

export default MyComponent;
