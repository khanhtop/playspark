import { Scene } from "phaser";
import { Helper } from "./Helper";
import { Observer } from "./Observer";
import { CONSTS } from "./Consts";
import { GAME } from "./GameConfg";

export class ScorePart{
    public static init(
        app: Scene,
        LAYOUT: any,
        UI:any,
        mW: number,
        mH: number,
        w: number,
        h: number
    
      ) {

        const SCORE_PART = (LAYOUT as any)[CONSTS.LAYOUT_KEYS.SCORE];

        SCORE_PART.add(
          app.add
            .graphics()
            .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
            .fillRect(0, 0, w, h)
            .setInteractive()
        );
    
        SCORE_PART.add(
            app.add
            .text(mW, mH - Helper.convertScaleData(200), "Your Score")
            .setOrigin(0.5, 0.5)
            .setStyle({
              ...CONSTS.TEXT_MAIN_STYLE,
              fontSize: Helper.convertScaleData(35) + "px",
              fill: "#fff",
            })
        );
    
        (UI as any)[CONSTS.UI_KEYS.SCORE_LAYOUT_VAL] = app.add
          .text(mW, mH - Helper.convertScaleData(150), "80")
          .setOrigin(0.5, 0.5)
          .setStyle({
            ...CONSTS.TEXT_MAIN_STYLE,
            fontSize: Helper.convertScaleData(40) + "px",
            fill: "#fff",
          });
        SCORE_PART.add((UI as any)[CONSTS.UI_KEYS.SCORE_LAYOUT_VAL]);
        SCORE_PART.add(
            app.add
            .text(mW, mH - Helper.convertScaleData(100), "Current Streak")
            .setOrigin(0.5, 0.5)
            .setStyle({
              ...CONSTS.TEXT_MAIN_STYLE,
              fontSize: Helper.convertScaleData(35) + "px",
              fill: "#fff",
            })
        );
    
        (UI as any)[CONSTS.UI_KEYS.SCORE_LAYOUT_STREAK] = app.add
          .text(mW, mH - 50, "0")
          .setOrigin(0.5, 0.5)
          .setStyle({
            ...CONSTS.TEXT_MAIN_STYLE,
            fontSize: Helper.convertScaleData(40) + "px",
            fill: "#fff",
          });
        SCORE_PART.add((UI as any)[CONSTS.UI_KEYS.SCORE_LAYOUT_STREAK]);
    
        SCORE_PART.add(
            app.add
            .sprite(mW - 40, mH - 50, "bonus_video")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(40, 40)
        );
    
        SCORE_PART.add(
          Helper.addButton(
            UI,
            app,
            "main-btn-bg",
            Helper.convertScaleData(200),
            Helper.convertScaleData(70),
            mW,
            mH + Helper.convertScaleData(50),
            "Continue",
            SCORE_PART,
            "#fff",
            () => {
              Helper.changeScreen(LAYOUT,CONSTS.LAYOUT_KEYS.SCORE, false);
              Helper.startRound(UI);
    
              Observer.emitter.emit("btn_click");
            }
          )
        );
    
        SCORE_PART.setVisible(false);
    
      }
}