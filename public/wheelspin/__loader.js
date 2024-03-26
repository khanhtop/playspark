console.log("------------loader")
let scriptes = [
  "playcanvas-stable.min.js",
  "__settings__.js",
  "__start__.js",
  "__loading__.js",
];
let loadCounter = 0;

let loadScript = (loadCounter) => {
  let scriptEle3 = document.createElement("script");
  scriptEle3.setAttribute(
    "src",
    `/wheelspin/${scriptes[loadCounter]}`
  );
  document.body.appendChild(scriptEle3);
  scriptEle3.addEventListener("load", () => {
    console.log(`playcanvas-stable.min loaded correctly`);
    loadCounter++;
    if (loadCounter < scriptes.length) loadScript(loadCounter);
  });

  scriptEle3.addEventListener("error", (ev) => {
    console.log("Error on loading file", ev);
  });
};
loadScript(loadCounter);