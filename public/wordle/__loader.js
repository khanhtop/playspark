console.log("------------loader")

function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;

    // Then set up a new template element.
    const template = document.createElement("template");
    template.innerHTML = html;
    const result = template.content.children;

    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
  }

  let headContents = [
    `<meta charset="utf-8"></meta>`,
    `<title>Cocos Creator | Wordly</title>`,
    `<meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,minimum-scale=1,maximum-scale=1,minimal-ui=true"/>`,
    `<meta name="apple-mobile-web-app-capable" content="yes"/>`,
    `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>`,
    `<meta name="format-detection" content="telephone=no"/>`,
    `<meta name="renderer" content="webkit"/>`,
    `<meta name="force-rendering" content="webkit"/>`,
    `<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>`,
    `<meta name="msapplication-tap-highlight" content="no"/>`,
    `<meta name="full-screen" content="yes"/>`,
    `<meta name="x5-fullscreen" content="true"/>`,
    `<meta name="360-fullscreen" content="true"/>`,
    `<meta name="x5-page-mode" content="app"/>`,
    `<link rel="stylesheet" type="text/css" href="/wordle/style.css"/>`,
  ];

  headContents.forEach((element) => {
    const content = fromHTML(element);
    document.head.append(content);
  });

  let gameDiv = document.createElement("div");
  gameDiv.setAttribute("id", `GameDiv`);
  gameDiv.setAttribute("cc_exact_fit_screen", `true`);
  document.body.appendChild(gameDiv);
//  document.body.insertBefore(gameDiv, document.body.firstChild);

  let Cocos3dGameContainer = document.createElement("div");
  Cocos3dGameContainer.setAttribute("id", `Cocos3dGameContainer`);
  gameDiv.appendChild(Cocos3dGameContainer);

  let gameCanvas = document.createElement("canvas");
  gameCanvas.setAttribute("id", `GameCanvas`);
  gameCanvas.setAttribute("oncontextmenu", `event.preventDefault()`);
  gameCanvas.setAttribute("tabindex", `99`);
  Cocos3dGameContainer.appendChild(gameCanvas);

  let polyfills = document.createElement("script");
  polyfills.setAttribute("charset", `utf-8`);
  polyfills.setAttribute("src", `/wordle/src/polyfills.bundle.js`);
  document.body.appendChild(polyfills);


  const content = fromHTML(
    `<script src="/wordle/src/import-map.json" type="systemjs-importmap" charset="utf-8"> </script>`
  );
  document.body.append(content);


  let system_bundle = document.createElement("script");
  system_bundle.setAttribute("charset", `utf-8`);
  system_bundle.setAttribute(
    "src",
    `/wordle/src/system.bundle.js`
  );
  document.body.appendChild(system_bundle);

  system_bundle.addEventListener("load", () => {
    console.log(`system_bundle loaded correctly`);
    System.import("/wordle/index.js").catch(function (err) {
      console.error(err);
    });
  
  });

  system_bundle.addEventListener("error", (ev) => {
    console.log("Error on loading file system_bundle", ev);
  });
/*
  return;
 

  polyfills.addEventListener("load", () => {
    console.log(`polyfills loaded correctly`);
    let system_bundle = document.createElement("script");
    system_bundle.setAttribute("charset", `utf-8`);
    system_bundle.setAttribute(
      "src",
      `/${gameType}/src/system.bundle.js`
    );
    document.body.appendChild(system_bundle);

    system_bundle.addEventListener("load", () => {
      console.log(`system_bundle loaded correctly`);
      System.import("/wordle/index.js").catch(function (err) {
        console.error(err);
      });
      /* const content = fromHTML(
        `<script src="src/import-map.json" type="systemjs-importmap" charset="utf-8"> </script>`
      );
      document.body.append(content);

      const content2 = fromHTML(
        `<script> System.import('/wordle/index.js').catch(function(err) { console.error(err); }) </script>`
      );
      document.body.append(content2);* /
    });

    system_bundle.addEventListener("error", (ev) => {
      console.log("Error on loading file system_bundle", ev);
    });
  });

  polyfills.addEventListener("error", (ev) => {
    console.log("Error on loading file", ev);
  });

  return;*/