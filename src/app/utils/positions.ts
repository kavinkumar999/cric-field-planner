import { PositionZone, PlayerPosition } from "../types/cricket"

const positionNames = {
  wicketKeeper: "wicket keeper",
  bowler: "bowler",
  sillyPoint: "silly point",
  sillyMidOff: "silly mid off",
  sillyMidOn: "silly mid on",
  firstSlip: "1st slip",
  secondSlip: "2nd slip",
  thirdSlip: "3rd slip",
  fourthSlip: "4th slip",
  gully: "gully",
  legGully: "leg gully",
  point: "point",
  coverPoint: "cover point",
  squareLeg: "square leg",
  cover: "cover",
  midOff: "mid off",
  midOn: "mid on",
  midWicket: "mid wicket",
  thirdMan: "third man",
  deepPoint: "deep point",
  deepCover: "deep cover",
  longOff: "long off",
  longOn: "long on",
  deepMidWicket: "deep mid wicket",
  deepSquareLeg: "deep square leg",
  fineLeg: "fine leg",
}

export const positionZones: PositionZone[] = [
  // Close-in positions
  { name: positionNames.sillyPoint, check: (x, y) => x > 20 && y > 20 && x ** 2 + (y - 40) ** 2 < 50 ** 2 },
  { name: positionNames.sillyMidOff, check: (x, y) => x > 0 && y > 30 && x ** 2 + (y - 40) ** 2 < 50 ** 2 },
  { name: positionNames.sillyMidOn, check: (x, y) => x < 0 && y > 30 && x ** 2 + (y - 40) ** 2 < 50 ** 2 },
  
  // Slip cordon
  { name: positionNames.firstSlip, check: (x, y) => x > 30 && y < -30 && x ** 2 + (y + 40) ** 2 < 80 ** 2 },
  { name: positionNames.secondSlip, check: (x, y) => x > 40 && y < -30 && x ** 2 + (y + 40) ** 2 < 90 ** 2 },
  { name: positionNames.thirdSlip, check: (x, y) => x > 50 && y < -30 && x ** 2 + (y + 40) ** 2 < 100 ** 2 },
  { name: positionNames.fourthSlip, check: (x, y) => x > 60 && y < -30 && x ** 2 + (y + 40) ** 2 < 110 ** 2 },
  
  // Gully positions
  { name: positionNames.gully, check: (x, y) => x > 80 && y < -20 && x ** 2 + y ** 2 < 120 ** 2 },
  { name: positionNames.legGully, check: (x, y) => x < -80 && y < -20 && x ** 2 + y ** 2 < 120 ** 2 },
  
  // Square positions
  { name: positionNames.point, check: (x, y) => x > 120 && Math.abs(y) < 50 && x ** 2 + y ** 2 < 180 ** 2 },
  { name: positionNames.coverPoint, check: (x, y) => x > 100 && y > 50 && x ** 2 + y ** 2 < 180 ** 2 },
  { name: positionNames.squareLeg, check: (x, y) => x < -120 && Math.abs(y) < 50 && x ** 2 + y ** 2 < 180 ** 2 },
  
  // Mid positions
  { name: positionNames.cover, check: (x, y) => x > 80 && y > 80 && x ** 2 + y ** 2 < 180 ** 2 },
  { name: positionNames.midOff, check: (x, y) => x > 20 && y > 140 && x ** 2 + y ** 2 < 180 ** 2 },
  { name: positionNames.midOn, check: (x, y) => x < -20 && y > 140 && x ** 2 + y ** 2 < 180 ** 2 },
  { name: positionNames.midWicket, check: (x, y) => x < -80 && y > 80 && x ** 2 + y ** 2 < 180 ** 2 },
  
  // Deep positions
  { name: positionNames.thirdMan, check: (x, y) => x > 160 && y < -80 && x ** 2 + y ** 2 >= 180 ** 2 },
  { name: positionNames.deepPoint, check: (x, y) => x > 160 && Math.abs(y) < 80 && x ** 2 + y ** 2 >= 180 ** 2 },
  { name: positionNames.deepCover, check: (x, y) => x > 140 && y > 80 && x ** 2 + y ** 2 >= 180 ** 2 },
  { name: positionNames.longOff, check: (x, y) => x > 40 && y > 200 && x ** 2 + y ** 2 >= 180 ** 2 },
  { name: positionNames.longOn, check: (x, y) => x < -40 && y > 200 && x ** 2 + y ** 2 >= 180 ** 2 },
  { name: positionNames.deepMidWicket, check: (x, y) => x < -140 && y > 80 && x ** 2 + y ** 2 >= 180 ** 2 },
  { name: positionNames.deepSquareLeg, check: (x, y) => x < -160 && Math.abs(y) < 80 && x ** 2 + y ** 2 >= 180 ** 2 },
  { name: positionNames.fineLeg, check: (x, y) => x < -160 && y < -80 && x ** 2 + y ** 2 >= 180 ** 2 },
]

export const initialPositions: PlayerPosition[] = [
  { id: 1, name: positionNames.wicketKeeper, x: 0, y: -65, playerName: "Player 1" },
  { id: 2, name: positionNames.bowler, x: 0, y: 70, playerName: "Player 2" },
  { id: 3, name: positionNames.firstSlip, x: 35, y: -45, playerName: "Player 3" },
  { id: 4, name: positionNames.secondSlip, x: 45, y: -45, playerName: "Player 4" },
  { id: 5, name: positionNames.gully, x: 80, y: -40, playerName: "Player 5" },
  { id: 6, name: positionNames.midOff, x: 40, y: 80, playerName: "Player 6" },
  { id: 7, name: positionNames.midOn, x: -40, y: 80, playerName: "Player 7" },
  { id: 8, name: positionNames.point, x: 140, y: 0, playerName: "Player 8" },
  { id: 9, name: positionNames.squareLeg, x: -140, y: 0, playerName: "Player 9" },
  { id: 10, name: positionNames.deepMidWicket, x: -160, y: 80, playerName: "Player 10" },
  { id: 11, name: positionNames.longOff, x: 160, y: 80, playerName: "Player 11" },
]