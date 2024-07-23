import { Events } from "./Events";
import { GameData } from "./GameData";

export class CustomLoadingScreen implements ILoadingScreen {
  //optional, but needed due to interface definitions
  public loadingUIBackgroundColor: string;
  private _loadingDiv: HTMLDivElement;
  private totalAssetsCount = 0;
  private loadedAssetsCount = 0;
  constructor(public loadingUIText: string) {}
  public displayLoadingUI() {
    //  alert(this.loadingUIText);
    if (document.getElementById("customLoadingScreenDiv")) {
      // Do not add a loading screen if there is already one
      document.getElementById("customLoadingScreenDiv").style.display =
        "initial";
      return;
    }
    this._loadingDiv = document.createElement("div");
    /* this._loadingDiv.id = "customLoadingScreenDiv";
    this._loadingDiv.innerHTML = "scene is currently loading";
    var customLoadingScreenCss = document.createElement("style");
    customLoadingScreenCss.type = "text/css";
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: #BB464Bcc;
        color: white;
        font-size:50px;
        text-align:center;
    }
    `;
    document
      .getElementsByTagName("head")[0]
      .appendChild(customLoadingScreenCss);
    this._resizeLoadingUI();
    // window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(this._loadingDiv);*/

    this._loadingDiv.style.backgroundColor = "#232323"; // Dark gray background
    this._loadingDiv.style.position = "absolute";
    this._loadingDiv.style.top = "0";
    this._loadingDiv.style.left = "0";
    this._loadingDiv.style.height = "100%";
    this._loadingDiv.style.width = "100%";
    document.body.appendChild(this._loadingDiv);

    var logo = document.createElement("img");
    logo.src =
      "data:image/jpeg;base64,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";
    this._loadingDiv.appendChild(logo);
    logo.onload = function () {
      // splash.style.display = 'inline-block';
      logo.style.position = "absolute";
      logo.style.top = "45%";
      logo.style.left = "25%";
      logo.style.transform = "translateY(-50%)";
      logo.style.width = "50%";
      logo.style.height = "30px";
    };

    // Create the progress bar div, centered on the screen
    const progressBar = document.createElement("img");
    progressBar.src =
      "data:image/png;base64,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";
    progressBar.style.position = "absolute";
    progressBar.style.top = "50%";
    progressBar.style.left = "15%";
    progressBar.style.transform = "translateY(-50%)";
    progressBar.style.width = "70%";
    progressBar.style.height = "20px";
    //progressBar.style.backgroundColor = "#d3d3d3"; // Light gray for the bar background
    this._loadingDiv.appendChild(progressBar);

    // Create the filler for the progress bar
    const progressFiller = document.createElement("img");
    progressFiller.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABHUAAAAlCAYAAADMU9XJAAADHElEQVR4nO3dvWoUURzG4TdrFUGDpVorghCvwXgDAUVUFMHKQhAD3oQfIVppJQb8QrwEk2swoojW2ooJaOUqR86GsLPJRok6A88DQ5aZ7J4h/+5H9sxEf3E2v2kyyUw9ppMcTjJVDwAAAAC29qUe75OsJFlO8jLJty3fNeR3os7RJHNJTgo4AAAAADuqRJ4XSW4nebudD+41zjTtT/K4lqNLgg4AAADAjpuq3eV17TD7xy0wLuqcTfKu/txOAAIAAADgz/U29JhzW33KZqFmIsl8LUN7G1cBAAAA+JtKj3lU+8zEqHVGRZ3yiw+SXGtcAQAAAOBfKn3mYZJdw2uOijq3klxsnAUAAADgf7iQZGF43eGoc6Y+4QoAAACA9rhS99oZGXUOJLlvWAAAAACtdC/JwcGNbYw6N22KDAAAANBapdvcGNzcIOocrV+9AgAAAKC9ztSOsx515kbsrwMAAABAu/QGTywvL3YnOWVAAAAAAJ1wuvScEnWO20sHAAAAoDP2JJkpUWfGzAAAAAA65XiJOtNmBgAAANApx0rUOWRmAAAAAJ1yqESdfWYGAAAA0Cn7ejZJBgAAAOicPSXqrJobAAAAQKeslajz2cwAAAAAOuVziTofzAwAAACgUz6UqLNiZgAAAACd8qpEnWUzAwAAAOiU5RJ1lsrmOuYGAAAA0Aml4yyVqPM1yXMzAwAAAOiE0nG+9uqdzifpmxsAAABAq/Vrx8kg6rxJ8tTMAAAAAFrtWe0461GnuJ5k1dwAAAAAWmm19ptfNkadT0kumxkAAABAK5Vu83FwY72hO3ySZMHcAAAAAFrlTu0264ajTjGXZLFxFgAAAID/oXSaa8Prjoo6P5JcSnK3cQUAAACAf+lu7TQ/htccFXWK70muJjmfZK1xFQAAAIC/aa12mau10zRsFnUGHiU5Ur+z1W9cBQAAAGAn9WuHOVK7zKbGRZ3Up2KdSzKd5IH/3AEAAADYcWu1u0zXDvNp3AIT/cXZxskxJpOcSDJTFzqcZCrJ3q3fBgAAAECS1SRfkrxPspJkKcnLJN+2/cdJ8hMg7GIfAi7ztwAAAABJRU5ErkJggg==";
    progressFiller.style.position = "absolute";
    progressFiller.style.top = "50%";
    progressFiller.style.left = "15.5%";
    progressFiller.style.transform = "translateY(-50%)";
    progressFiller.style.width = "69%";
    progressFiller.style.height = "13px";

    //  progressFiller.style.height = "100%";
    //  progressFiller.style.backgroundColor = "#FEA250"; // Green for the progress
    progressFiller.style.width = "0%";
    this._loadingDiv.appendChild(progressFiller);

    Events.preload.add((_data: any) => {
      if (_data.name == "preload:addTotalAssetsCount")
        this.totalAssetsCount += parseInt(_data.count);
    });

    let a = Events.preload.add((_data: any) => {
      if (_data.name != "preload:progress") return;
      this.loadedAssetsCount++;
      progressFiller.style.width =
        (this.loadedAssetsCount / this.totalAssetsCount) * 69 + "%";

      //console.log(progressFiller.style.width);
    });

    Events.preload.add((_data: any) => {
      if (_data.name == "preload:end") Events.preload.remove(a);
    });
  }

  public hideLoadingUI() {
    //alert("Loaded!");
    this._loadingDiv.style.display = "none";
    console.log("scene is now loaded");
  }

  _resizeLoadingUI() {
    let canvas = GameData.instance.getCanvas();

    var e = canvas.getBoundingClientRect(),
      t = window.getComputedStyle(canvas).position;
    this._loadingDiv &&
      ((this._loadingDiv.style.position = "fixed" === t ? "fixed" : "absolute"),
      (this._loadingDiv.style.left = e.left + "px"),
      (this._loadingDiv.style.top = e.top + "px"),
      (this._loadingDiv.style.width = e.width + "px"),
      (this._loadingDiv.style.height = e.height + "px"));
  }
}
