import React, { useEffect } from "react";
import MyComponent from "./PixiApp2.jsx";

useEffect(() => {
  const script = document.createElement('script');

  script = MyComponent;
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  }
}, []);

