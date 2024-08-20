import { useEffect } from "react";

const useGoogleFont = (fontName, cssTag = "custom-font") => {
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
      let styleCode = `
        .${cssTag} {
          font-family: '${fontName}', sans-serif;
        }
      `;
      if (fontName === "Lexend Zetta") {
        styleCode = `.${cssTag} {
          font-family: '${fontName}', sans-serif;
          letter-spacing: -3.5px;
          font-size: 0.9em;
          font-weight: 700;
        }`;
      } else {
        styleCode = `
        .${cssTag} {
          font-family: '${fontName}', sans-serif;
          letter-spacing: normal;
          font-size: medium;
          font-weight: normal;
        }
      `;
      }
      style.innerHTML = styleCode;
      document.head.appendChild(style);

      // Add the class to the body
      document.body.classList.add(cssTag);

      return () => {
        // Cleanup: Remove the link and style elements, and remove the class from the body
        document.head.removeChild(link);
        document.head.removeChild(style);
        document.body.classList.remove(cssTag);
      };
    }
  }, [fontName]);
};

export default useGoogleFont;
