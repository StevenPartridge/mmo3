/**
 * Woodcutting Module
 */
import {
  getModule,
  VuexModule,
  Mutation,
  Action,
  Module,
} from "vuex-module-decorators";
import { formatDistance } from "date-fns";
import store from ".";

export enum SkillTiersWoodcutting {
  WOOD = 'wood',
  OAK = 'oak',
  WILLOW = 'willow',
  EBONY = 'ebony'
}

@Module({ dynamic: true, namespaced: true, store, name: "SkillWoodcutting" })
class SkillWoodcutting extends VuexModule {
  _level = 55;
  _skillActive = false;
  _skillActiveTime: Date | null = null;

  @Mutation
  increaseLevel() {
    this._level++;
  }

  @Mutation
  setLevel(level: number): void {
    this._level = level;
  }

  @Mutation
  setSkillActive(active: boolean): void {
    this._skillActive = active;
  }

  @Mutation
  setSkillActiveTime(activeTime: Date | null) {
    this._skillActiveTime = activeTime;
  }

  get isActive(): boolean {
    return this._skillActive;
  }

  get currentLevel(): number {
    return this._level;
  }

  get skillActiveTime(): Date | null {
    return this._skillActiveTime;
  }

  // Time in seconds since
  @Action
  skillingFor(): string {
    if (!this._skillActiveTime) {
      return "Not currently training";
    }
    return formatDistance(this._skillActiveTime, new Date());
  }

  @Action
  startSkilling() {
    this.setSkillActiveTime(new Date());
    this.setSkillActive(true);
  }

  @Action
  stopSkilling() {
    this.setSkillActiveTime(null);
    this.setSkillActive(false);
  }
}

export const skill_woodcutting = getModule(SkillWoodcutting);
