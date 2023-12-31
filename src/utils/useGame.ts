//@ts-ignore
//@ts-nocheck
import { subscribeWithSelector } from 'zustand/middleware'
import { create } from 'zustand'

export const useGame = create()(
  subscribeWithSelector((set) => ({
    blocks: [],
    items: {
      cake: false,
      soda: false,
      barrel: false,
      cocktail: false,
      hotdog: false,
      pizza: false,
      'soda-bottle': false,
      'wine-red': false,
      'wine-white': false
    },
    playerItem: null,
    tableItems: [],
    gameOver: false,
    victory: false,
    listItems: [],
    setListItems: (value: any) => set((state: any) => ({ listItems: value })),
    setGameOver: (value: any) => set((state: any) => ({ gameOver: value })),
    setVictory: (value: any) => set((state: any) => ({ victory: value })),
    setPlayerItem: (value: any) =>
      set((state: any) => ({
        playerItem: value
      })),
    setTableItems: (value: any) => set((state: any) => ({ tableItems: [...state.tableItems, value] })),
    setItems: (value: any) => set((state: any) => ({ items: { ...state.items, ...value } })),
    setAllItems: (value: any) => set((state: any) => ({ items: value })),
    setBlocks: (value: any[]) => set((state: any) => ({ blocks: value }))
  }))
)
