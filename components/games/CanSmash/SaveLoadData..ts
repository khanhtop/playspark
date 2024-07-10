import { GameData } from "./GameData";


export class SaveLoadData {
  static instance : SaveLoadData = null;
  constructor() {
    SaveLoadData.instance = this;

    let sfxState = true;
    let sfxlocalStorageState = localStorage.getItem("sfx_state");
    if (sfxlocalStorageState != null)
      sfxState = sfxlocalStorageState == "true" ? true : false;

    GameData.instance.setSfxState(sfxState);
    localStorage.setItem("sfx_state", sfxState.toString());

    let musicState = true;
    let musiclocalStorageState = localStorage.getItem("music_state");
    if (musiclocalStorageState != null)
      musicState = musiclocalStorageState == "true" ? true : false;
    GameData.instance.setMusicState(musicState);
    localStorage.setItem("music_state", musicState.toString());
  }

  save(){
    let musicState = GameData.instance.getMusicState();
    localStorage.setItem("music_state", musicState.toString());

    let sfxState = GameData.instance.getSfxState();
    localStorage.setItem("sfx_state", sfxState.toString());

  }
}
