import { create } from "zustand";
import { persist } from "zustand/middleware";

type FingerFastState = {
  points: number;
  setPoints: (points: number) => void;
  earnedPoints: number;
  setEarnedPoints: (earnedPoints: number) => void;
};

export const useFingerFastStore = create<FingerFastState>()(
  persist(
    (set) => ({
      points: 100,
      setPoints: (points) => set(() => ({ points })),
      earnedPoints: 0,
      setEarnedPoints: (earnedPoints) => set(() => ({ earnedPoints })),
    }),
    {
      name: "game-store",
    }
  )
);
