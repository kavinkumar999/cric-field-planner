import { PositionZone, PlayerPosition } from "../types/cricket"

export const positionZones: PositionZone[] = [
  { name: "wicket-keeper", label: "WK", check: (x, y) => x ** 2 + y ** 2 < 30 ** 2 && y > 0 },
  { name: "slip", label: "SL", check: (x, y) => x > 0 && y < 0 && x ** 2 + y ** 2 < 100 ** 2 },
  { name: "gully", label: "GU", check: (x, y) => x > 0 && y > 0 && x ** 2 + y ** 2 < 100 ** 2 },
  { name: "point", label: "PT", check: (x, y) => x > 50 && y > 50 && x ** 2 + y ** 2 < 200 ** 2 },
  { name: "cover", label: "CV", check: (x, y) => x > 0 && y > 100 && x ** 2 + y ** 2 < 200 ** 2 },
  { name: "mid-off", label: "MO", check: (x, y) => x > -50 && x < 50 && y > 150 },
  { name: "bowler", label: "BW", check: (x, y) => x ** 2 + (y - 150) ** 2 < 30 ** 2 },
  { name: "mid-on", label: "MN", check: (x, y) => x < 0 && y > 100 && x ** 2 + y ** 2 < 200 ** 2 },
  { name: "mid-wicket", label: "MW", check: (x, y) => x < -50 && y > 50 && x ** 2 + y ** 2 < 200 ** 2 },
  { name: "square-leg", label: "SQ", check: (x, y) => x < -100 && y > 0 && x ** 2 + y ** 2 < 200 ** 2 },
  { name: "fine-leg", label: "FL", check: (x, y) => x < -100 && y < 0 && x ** 2 + y ** 2 < 240 ** 2 },
  { name: "third-man", label: "TM", check: (x, y) => x > 100 && y < 0 && x ** 2 + y ** 2 < 240 ** 2 },
  { name: "deep-point", label: "DP", check: (x, y) => x > 150 && y > 50 && x ** 2 + y ** 2 >= 200 ** 2 },
  { name: "long-off", label: "LO", check: (x, y) => x > 50 && x < 150 && y > 200 },
  { name: "long-on", label: "LN", check: (x, y) => x < -50 && x > -150 && y > 200 },
  { name: "deep-mid-wicket", label: "DM", check: (x, y) => x < -150 && y > 50 && x ** 2 + y ** 2 >= 200 ** 2 },
]

export const initialPositions: PlayerPosition[] = [
  { id: 1, name: "wicket-keeper", label: "WK", x: 0, y: 20, playerName: "Player 1" },
  { id: 2, name: "bowler", label: "BW", x: 0, y: 150, playerName: "Player 2" },
  { id: 3, name: "slip", label: "SL", x: 50, y: -20, playerName: "Player 3" },
  { id: 4, name: "point", label: "PT", x: 120, y: 80, playerName: "Player 4" },
  { id: 5, name: "cover", label: "CV", x: 80, y: 120, playerName: "Player 5" },
  { id: 6, name: "mid-off", label: "MO", x: 20, y: 180, playerName: "Player 6" },
  { id: 7, name: "mid-on", label: "MN", x: -20, y: 180, playerName: "Player 7" },
  { id: 8, name: "mid-wicket", label: "MW", x: -120, y: 80, playerName: "Player 8" },
  { id: 9, name: "square-leg", label: "SQ", x: -120, y: 20, playerName: "Player 9" },
  { id: 10, name: "fine-leg", label: "FL", x: -180, y: -80, playerName: "Player 10" },
  { id: 11, name: "third-man", label: "TM", x: 180, y: -80, playerName: "Player 11" },
]