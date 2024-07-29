import { useEffect } from "react";

const useGoogleFont = (fontName) => {
  useEffect(() => {
    if (fontName) {
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
        " ",
        "+"
      )}&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // Create a style element to define the custom CSS class
      const style = document.createElement("style");
      style.innerHTML = `
        .custom-font {
          font-family: '${fontName}', sans-serif;
        }
      `;
      document.head.appendChild(style);

      // Add the class to the body
      document.body.classList.add("custom-font");

      return () => {
        // Cleanup: Remove the link and style elements, and remove the class from the body
        document.head.removeChild(link);
        document.head.removeChild(style);
        document.body.classList.remove("custom-font");
      };
    }
  }, [fontName]);
};

export default useGoogleFont;
