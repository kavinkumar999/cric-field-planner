import { PositionZone, PlayerPosition } from "../types/cricket"

export const positionNames = {
  wicketKeeper: "wicket keeper",
  bowler: "bowler",
  sillyPoint: "silly point",
  sillyMidOff: "silly mid off",
  sillyMidOn: "silly mid on",
  firstSlip: "1st slip",
  slip: "slip",
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
  shortLeg: "short leg",
  shortMidOn: "short mid on",
  shortMidOff: "short mid off",
  shortPoint: "short point",
  shortMidWicket: "short mid wicket",
  shortFlySlip: "short fly slip",
  shortCover: "short cover",
  shortLegGully: "short leg gully",
  short: "short",
  flySlip: "fly slip",
  legSlip: "leg slip",
  sillyMidWicket: "silly mid wicket",
  sillySquareLeg: "silly square leg",
  shortFineLeg: "short fine leg",
  sillyFlySlip: "silly fly slip",
}

// Helper function to get position name based on coordinates and handedness
export const getPositionName = (x: number, y: number, isLeftHanded: boolean): string => {
  const zones = isLeftHanded ? leftHandPositionZones : rightHandPositionZones
  const zone = zones.find(zone => zone.check(x, y))
  return zone ? zone.name : "unknown"
}
// Right-handed position zones
export const rightHandPositionZones: PositionZone[] = [

  // Silly inside < 25 circle
  {name: positionNames.sillyMidOff, check: (x, y) => x < 0 && y > -30 && x ** 2 + y ** 2 < 25 ** 2},
  {name: positionNames.sillyMidOn, check: (x, y) => x > 0 && y > -30 && x ** 2 + y ** 2 < 25 ** 2},

  // short inside < 50 circle
  {name: positionNames.short, check: (x, y) => (x > 0 || x < 0) && y > -50 && x ** 2 + y ** 2 < 50 ** 2},

  // insde the 100 circle short mid on and short mid off and short point , slip, leg slip , gully short mid wicket\
  {name: positionNames.shortPoint, check: (x, y) => x < -60 && y < -25 && x ** 2 + y ** 2 < 100 ** 2},
  {name: positionNames.slip, check: (x, y) => x < 0 && y < -50 && x ** 2 + y ** 2 < 100 ** 2 && x ** 2 + y ** 2 > 50 ** 2},
  {name: positionNames.shortMidOn, check: (x, y) => x > 0 && y > 50 && x ** 2 + y ** 2 < 100 ** 2},
  {name: positionNames.shortMidOff, check: (x, y) => x < 0 && y > 50 && x ** 2 + y ** 2 < 100 ** 2},
  {name: positionNames.shortCover, check: (x, y) => x < 0 && y > -25 && x ** 2 + y ** 2 < 100 ** 2},
  {name: positionNames.legSlip, check: (x, y) => x > 0 && y < -60 && x ** 2 + y ** 2 < 100 ** 2 && x ** 2 + y ** 2 > 50 ** 2},
  {name: positionNames.gully, check: (x, y) => x > 0 && y < -30 && x ** 2 + y ** 2 < 100 ** 2 && x ** 2 + y ** 2 > 50 ** 2},
  {name: positionNames.shortMidWicket, check: (x, y) => x > 0 && y > -30 && x ** 2 + y ** 2 < 100 ** 2 && x ** 2 + y ** 2 > 50 ** 2},

  // inside the 150 circle mid on , mid off, fly slip, point, cover, mid wicket, square leg, short fine leg
  {name: positionNames.midOn, check: (x, y) => x > 0 && y > 80 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2},
  {name: positionNames.midOff, check: (x, y) => x < 0 && y > 80 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2},
  {name: positionNames.cover, check: (x, y) => x < 0 && y > -20 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2},
  {name: positionNames.flySlip, check: (x, y) => x < 0 && y < -80 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2},
  {name: positionNames.shortFineLeg, check: (x, y) => x > 0 && y < -80 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2},
  {name: positionNames.point, check: (x, y) => x < 0 && x ** 2 + y ** 2 > 100 ** 2 && x ** 2 + y ** 2 <= 150 ** 2},
  {name: positionNames.midWicket, check: (x, y) => x > 80 && y > -20 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2},
  {name: positionNames.squareLeg, check: (x, y) => x > 80 && y < -20 && x ** 2 + y ** 2 > 100 ** 2 && x ** 2 + y ** 2 <= 150 ** 2},

  // Outer ring positions (150-200 unit radius)
  { name: positionNames.longOff, check: (x, y) => x < 0 && y > 130 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.longOn, check: (x, y) => x > 0 && y > 130 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.deepMidWicket, check: (x, y) => x > 130 && y > -20 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.deepSquareLeg, check: (x, y) => x > 130 && y < -20 && x ** 2 + y ** 2 >= 150 ** 2},
  { name: positionNames.fineLeg, check: (x, y) => x > 0 && y < -130 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.thirdMan, check: (x, y) => x < 0 && y < -130 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.deepPoint, check: (x, y) => x < 0 && y < -20 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.deepCover, check: (x, y) => x < 0 && y > -20 && x ** 2 + y ** 2 >= 150 ** 2 },
  
]

// Left-handed position zones (mirror of right-handed positions)
export const leftHandPositionZones: PositionZone[] = [
  // Slip cordon and close catching positions (mirrored)
  { name: positionNames.firstSlip, check: (x, y) => x < -30 && y < -20 && x ** 2 + y ** 2 < 100 ** 2 },
  { name: positionNames.secondSlip, check: (x, y) => x < -40 && y < -20 && x ** 2 + y ** 2 < 100 ** 2 },
  { name: positionNames.thirdSlip, check: (x, y) => x < -50 && y < -20 && x ** 2 + y ** 2 < 100 ** 2 },
  { name: positionNames.legGully, check: (x, y) => x > 50 && y < -20 && x ** 2 + y ** 2 < 100 ** 2 },
  
  // Inner ring positions (mirrored)
  { name: positionNames.point, check: (x, y) => x < -50 && Math.abs(y) < 30 && x ** 2 + y ** 2 < 100 ** 2 },
  { name: positionNames.cover, check: (x, y) => x < -30 && y > 30 && x ** 2 + y ** 2 < 100 ** 2 },
  { name: positionNames.midOff, check: (x, y) => x < 0 && y > 50 && x ** 2 + y ** 2 < 150 ** 2 },
  { name: positionNames.midOn, check: (x, y) => x > 0 && y > 50 && x ** 2 + y ** 2 < 150 ** 2 },
  { name: positionNames.midWicket, check: (x, y) => x > 30 && y > 30 && x ** 2 + y ** 2 < 100 ** 2 },
  { name: positionNames.squareLeg, check: (x, y) => x > 50 && Math.abs(y) < 30 && x ** 2 + y ** 2 < 150 ** 2 },
  
  // Outer ring positions (mirrored)
  { name: positionNames.thirdMan, check: (x, y) => x < -150 && y < -100 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.deepPoint, check: (x, y) => x < -150 && Math.abs(y) < 100 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.deepCover, check: (x, y) => x < -100 && y > 100 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.longOff, check: (x, y) => x < 0 && y > 150 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.longOn, check: (x, y) => x > 0 && y > 150 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.deepMidWicket, check: (x, y) => x > 100 && y > 100 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.deepSquareLeg, check: (x, y) => x > 150 && Math.abs(y) < 100 && x ** 2 + y ** 2 >= 150 ** 2 },
  { name: positionNames.fineLeg, check: (x, y) => x > 150 && y < -100 && x ** 2 + y ** 2 >= 150 ** 2 },
]

export const rightHandInitialPositions: PlayerPosition[] = [
  { id: 1, x: 0, y: -65, playerName: "Wicket Keeper" },  // Behind stumps
  { id: 2, x: 0, y: 70, playerName: "Bowler" },          // At bowling crease
  { id: 3, x: 35, y: -45, playerName: "Player 3" },      // First slip
  { id: 4, x: 45, y: -45, playerName: "Player 4" },      // Second slip
  { id: 5, x: 80, y: -40, playerName: "Player 5" },      // Gully
  { id: 6, x: 40, y: 80, playerName: "Player 6" },       // Mid off
  { id: 7, x: -40, y: 80, playerName: "Player 7" },      // Mid on
  { id: 8, x: 140, y: 0, playerName: "Player 8" },       // Point
  { id: 9, x: -140, y: 0, playerName: "Player 9" },      // Square leg
  { id: 10, x: -160, y: 80, playerName: "Player 10" },   // Deep mid wicket
  { id: 11, x: 160, y: 80, playerName: "Player 11" },    // Long off
].map(pos => ({
  ...pos,
  name: pos.id === 1 ? positionNames.wicketKeeper : 
        pos.id === 2 ? positionNames.bowler :
        getPositionName(pos.x, pos.y, false)
}))

export const leftHandInitialPositions: PlayerPosition[] = [
  { id: 1, x: 0, y: -65, playerName: "Wicket Keeper" },
  { id: 2, x: 0, y: 70, playerName: "Bowler" },
  
  { id: 3, x: -35, y: -45, playerName: "Player 3" },  // First slip
  { id: 4, x: -45, y: -45, playerName: "Player 4" },  // Second slip
  { id: 5, x: -80, y: -40, playerName: "Player 5" },  // Gully
  { id: 6, x: -40, y: 80, playerName: "Player 6" },   // Mid off
  { id: 7, x: 40, y: 80, playerName: "Player 7" },    // Mid on
  { id: 8, x: -140, y: 0, playerName: "Player 8" },   // Point
  { id: 9, x: 140, y: 0, playerName: "Player 9" },    // Square leg
  { id: 10, x: 160, y: 80, playerName: "Player 10" }, // Deep mid wicket
  { id: 11, x: -160, y: 80, playerName: "Player 11" }, // Long off
].map(pos => ({
  ...pos,
  name: pos.id === 1 ? positionNames.wicketKeeper : 
        pos.id === 2 ? positionNames.bowler :
        getPositionName(pos.x, pos.y, true)
}))

