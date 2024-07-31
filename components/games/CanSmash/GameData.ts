import { Engine, Scene } from "@babylonjs/core";
import { EventTypes, Events } from "./Events";

export class GameData {
  static instance = null;
  private scene: Scene;
  private engine: Engine;
  private score = 0;
  private hitCount = 0;
  private targetCanCount = 0;
  private currentLevel = 0;
  private totalLevel = 0;
  private totalScore = 0;
  private nextLevelTime = 0;
  private primaryColor = "#0693E3";
  private textColor = "#117FB2";
  private accentColor = "#117FB2";

  
  
  private nextLevelHitCount = 0;
  private canvas = null;
  musicState: boolean;
  sfxState: boolean;
  boostCredits: any;
  constructor(scene: Scene, engine: Engine, canvas: HTMLCanvasElement) {
    this.scene = scene;
    this.engine = engine;
    this.canvas = canvas;
    GameData.instance = this;
  }
  getAccentColor() {
    return this.accentColor;
  }
  setAccentColor(accentColor:string) {
     this.accentColor = accentColor;
  }

  getPrimaryColor() {
    return this.primaryColor;
  }
  setPrimaryColor(primaryColor:string) {
     this.primaryColor = primaryColor;
  }
  getTextColor() {
    return this.textColor;
  }
  setTextColor(textColor:string) {
     this.textColor = textColor;
  }
  getEngine() {
    return this.engine;
  }
  getScene() {
    return this.scene;
  }
  getCanvas() {
    return this.canvas;
  }
  getNextLevelTime() {
    return this.nextLevelTime;
  }
  setNextLevelTime(time: number) {
    this.nextLevelTime = time;
  }

  setMusicState(state: boolean) {
    this.musicState = state;
  }
  getMusicState(state) {
    return this.musicState;
  }
  setSfxState(state: boolean) {
    this.sfxState = state;
  }
  getSfxState() {
    return this.sfxState;
  }

  getNextLevelHitCount() {
    return this.nextLevelHitCount;
  }
  setNextLevelHitCount(count: number) {
    this.nextLevelHitCount = count;
  }

  getScore() {
    return this.score;
  }
  setScore(score: number) {
    this.score = score;
  }
  getTotalScore() {
    return this.totalScore;
  }
  setTotalScore(score: number) {
    this.totalScore = score;
  }

  setHitCount(hitCount: number) {
    this.hitCount = hitCount;
    Events.gamePlay.notifyObservers({ type: EventTypes.ON_HIT_COUNT_CHANGE });
  }
  getHitCount() {
    return this.hitCount;
  }
  setTargetCount(targetCanCount: number) {
    this.targetCanCount = targetCanCount;
  }
  getTargetCount() {
    return this.targetCanCount;
  }
  setCurrentLevel(currentLevel: number) {
    this.currentLevel = currentLevel;
  }
  getCurrentLevel() {
    return this.currentLevel;
  }
  setTotalLevel(totalLevel: number) {
    this.totalLevel = totalLevel;
  }
  getTotalLevel() {
    return this.totalLevel;
  }
  getPowerupCredit() {
    return this.boostCredits;
  }
  setPowerupCredit(boostCredits: number) {
    this.boostCredits = boostCredits;
  }
}
