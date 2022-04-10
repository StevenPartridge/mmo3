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

  import store from ".";

  export enum InventoryItems {
      WOOD_WOOD = 'woodcutting_wood',
      WOOD_OAK = 'woodcutting_oak',
      WOOD_WILLOW = 'woodcutting_willow',
      WOOD_EBONY = 'woodcutting_ebony'
      
  }
  
  export type Inventory = Map<InventoryItems, number>;
  
  @Module({ dynamic: true, namespaced: true, store, name: "InventoryStore" })
  class InventoryStore extends VuexModule {
    _inventory: Inventory  = new Map();

    @Mutation
    setInventoryItem(key: InventoryItems, value: number) {
      this._inventory.set(key, value);
    }
  
    @Mutation
    setFullInventory(inventory: Inventory) {
        this._inventory = inventory;
    }

    get fullInventory(): Inventory {
      return this._inventory;
    }

    @Action
    increseInventory(key: InventoryItems) {
        const current = this._inventory.get(key);
        if (!current) {
            this._inventory.set(key, 1);
        } else {
            this._inventory.set(key, current + 1);
        }
    }
    
    @Action
    restoreState(inventory: Inventory) {
      this.setFullInventory(inventory);
    }
  }
  
  export const inventory = getModule(InventoryStore);
  