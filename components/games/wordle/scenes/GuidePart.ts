import { Scene } from "phaser";
import { Helper } from "./Helper";
import { Observer } from "./Observer";
import { CONSTS } from "./Consts";
import { GAME } from "./GameConfg";

export class GuidePart {
  public static init(
    app: Scene,
    LAYOUT: any,
    mW: number,
    mH: number,
    w: number,
    h: number
  ) {
    const GUIDE_PART = (LAYOUT as any)[CONSTS.LAYOUT_KEYS.GUIDE];
    GUIDE_PART.add(
      app.add
        .graphics()
        .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
        .fillRect(0, 0, w, h)
        .setInteractive()
    );

    GUIDE_PART.add(
      app.add
        .sprite(mW, mH - Helper.convertScaleData(140), "word_input_btn")
        .setDisplaySize(
          Helper.convertScaleData(300),
          Helper.convertScaleData(330)
        )
        .setInteractive()
        .on("pointerup", () => {
          Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.GUIDE, false);

          Observer.emitter.emit("btn_click");
        })
    );

    GUIDE_PART.add(
      app.add
        .text(mW, mH - Helper.convertScaleData(250), "HOW TO PLAY")
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(30) + "px",
          fill: "#575757",
        })
    );

    GUIDE_PART.add(
      app.add
        .text(
          mW - Helper.convertScaleData(110),
          mH - Helper.convertScaleData(200),
          "6"
        )
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(30) + "px",
          fill: "#575757",
        })
    );

    GUIDE_PART.add(
      app.add
        .text(
          mW - Helper.convertScaleData(80),
          mH - Helper.convertScaleData(200),
          "You have 6 tries to guess the \nword"
        )
        .setOrigin(0, 0.5)
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(12) + "px",
          fill: "#575757",
          align: "left",
        })
    );

    GUIDE_PART.add(
      app.add
        .sprite(
          mW - Helper.convertScaleData(110),
          mH - Helper.convertScaleData(150),
          "h1"
        )
        .setDisplaySize(
          Helper.convertScaleData(30),
          Helper.convertScaleData(30)
        )
    );

    GUIDE_PART.add(
      app.add
        .text(
          mW - Helper.convertScaleData(80),
          mH - Helper.convertScaleData(150),
          "The colours of the letters will\nchange to show if they are \ncorrect"
        )
        .setOrigin(0, 0.5)
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(12) + "px",
          fill: "#575757",
          align: "left",
        })
    );

    GUIDE_PART.add(
      app.add
        .sprite(
          mW - Helper.convertScaleData(110),
          mH - Helper.convertScaleData(100),
          "h2"
        )
        .setDisplaySize(
          Helper.convertScaleData(30),
          Helper.convertScaleData(30)
        )
    );

    GUIDE_PART.add(
      app.add
        .text(
          mW - Helper.convertScaleData(80),
          mH - Helper.convertScaleData(100),
          "Use “booster” to reveal 3\nincorrect letters on the keyboard"
        )
        .setOrigin(0, 0.5)
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(12) + "px",
          fill: "#575757",
          align: "left",
        })
    );

    GUIDE_PART.add(
      app.add
        .sprite(
          mW - Helper.convertScaleData(110),
          mH - Helper.convertScaleData(50),
          "h3"
        )
        .setDisplaySize(
          Helper.convertScaleData(30),
          Helper.convertScaleData(30)
        )
    );

    GUIDE_PART.add(
      app.add
        .text(
          mW - Helper.convertScaleData(80),
          mH - Helper.convertScaleData(50),
          "Use “bullseye” to reveal 1 \ncorrect letter on the game board"
        )
        .setOrigin(0, 0.5)
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(12) + "px",
          fill: "#575757",
          align: "left",
        })
    );

    // GUIDE_PART.add(
    //   this.add.text(mW, mH + Helper.convertScaleData(70), 'EXAMPLE').setOrigin(0.5, 0.5).setStyle({
    //     ...CONSTS.TEXT_MAIN_STYLE,
    //     fontSize: Helper.convertScaleData(40) + 'px',
    //     fill: '#fff',
    //   })
    // )

    GUIDE_PART.add(
      app.add
        .sprite(mW, mH + Helper.convertScaleData(170), "help")
        .setDisplaySize(
          Helper.convertScaleData(350),
          Helper.convertScaleData(245)
        )
    );

    GUIDE_PART.setVisible(false);
  }
}
