/**
 * countModule
 */
import {
  getModule,
  VuexModule,
  Mutation,
  Action,
  Module,
} from "vuex-module-decorators";
import store from ".";

@Module({ dynamic: true, namespaced: true, store, name: "Count" })
class Count extends VuexModule {
  count = 0;

  @Mutation
  INCREMENT() {
    this.count++;
  }

  @Mutation
  DECREMENT() {
    this.count--;
  }

  @Action
  incrementAfterTime(payload: number) {
    const delay = payload;
    return new Promise<void>((resolve) => {
      window.setTimeout(() => {
        this.INCREMENT();
        resolve();
      }, delay);
    });
  }
}

export const countModule = getModule(Count);
