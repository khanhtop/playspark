import { Scene } from "phaser";

export class ImageLoader {
  public static load(app: Scene,gameType:string) {
    //app.load.atlas('gems', "/pong/" + gameType + '/diamond.png', "/pong/" + gameType + '/diamond.json');
    app.load.spritesheet('gems', "/pong/" + gameType + '/like.png', { frameWidth: 498, frameHeight: 498 });

    app.load.image("main-btn-bg", "/pong/" + gameType + "/main-btn-bg.png");
    app.load.image("back", "/pong/" + gameType + "/back.png");
    app.load.image("calendar", "/pong/" + gameType + "/calendar.png");
    app.load.image("info", "/pong/" + gameType + "/info.png");
    app.load.image("coin", "/pong/" + gameType + "/coin.png");
    app.load.image("item1", "/pong/" + gameType + "/item1.png");
    app.load.image("item2", "/pong/" + gameType + "/item2.png");
    app.load.image("red_circle", "/pong/" + gameType + "/red_circle.png");
    app.load.image("pink_circle", "/pong/" + gameType + "/pink_circle.png");
    app.load.image("blue_circle", "/pong/" + gameType + "/blue_circle.png");
    app.load.image("outline", "/pong/" + gameType + "/outline.png");
    app.load.image("w2", "/pong/" + gameType + "/1.png");
    app.load.image("w1", "/pong/" + gameType + "/2.png");
    app.load.image("w0", "/pong/" + gameType + "/3.png");
    app.load.image("inp0", "/pong/" + gameType + "/5.png");
    app.load.image("inp1", "/pong/" + gameType + "/7.png");
    app.load.image("inp2", "/pong/" + gameType + "/6.png");
    app.load.image(
      "word_input_btn",
      "/pong/" + gameType + "/word_input_btn.png"
    );
    app.load.image("back_btn", "/pong/" + gameType + "/back_btn.png");
    app.load.image("next_btn", "/pong/" + gameType + "/next_btn.png");
    app.load.image("next", "/pong/" + gameType + "/next.png");
    app.load.image("bonus", "/pong/" + gameType + "/bonus.png");
    app.load.image("green_btn", "/pong/" + gameType + "/green_btn.png");
    app.load.image("play", "/pong/" + gameType + "/play.png");
    app.load.image("h1", "/pong/" + gameType + "/h1.png");
    app.load.image("h2", "/pong/" + gameType + "/h2.png");
    app.load.image("h3", "/pong/" + gameType + "/h3.png");
    app.load.image("h4", "/pong/" + gameType + "/h4.png");
    app.load.image("arrow", "/pong/" + gameType + "/arrow.png");
    app.load.image("bonus_video", "/pong/" + gameType + "/bonus_video.png");
    app.load.image("help", "/pong/" + gameType + "/help.png");

    app.load.image("title_orange_bg", "/pong/" + gameType + "/title_orange_bg.png");
    app.load.image("btn_green_bg", "/pong/" + gameType + "/btn_green_bg.png");
    app.load.image("popup_bg", "/pong/" + gameType + "/popup_bg.png");

    

    // pong assets
    app.load.image("booster", "/pong/pongassets/booster-ball.png");
    app.load.image("FREEZE", "/pong/pongassets/freeze.png");
    app.load.image("MAGNIFY", "/pong/pongassets/magnify.png");
    app.load.image("SHRINK", "/pong/pongassets/shrink.png");
  }
}
