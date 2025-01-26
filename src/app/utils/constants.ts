import { PositionZone } from "../types/cricket"

export const positionNames = {
  wicketKeeper: "WK",
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


export const basePositionZones = (isLeftHanded: boolean): PositionZone[] => [
  // Silly inside < 25 circle
  { 
    name: isLeftHanded ? positionNames.sillyMidOn : positionNames.sillyMidOff,
    check: (x, y) => x < 0 && y > -30 && x ** 2 + y ** 2 < 25 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.sillyMidOff : positionNames.sillyMidOn,
    check: (x, y) => x > 0 && y > -30 && x ** 2 + y ** 2 < 25 ** 2,
  },

  // short inside < 50 circle
  {
    name: positionNames.short,
    check: (x, y) => (x > 0 || x < 0) && y > -50 && x ** 2 + y ** 2 < 50 ** 2,
  },

  // inside the 100 circle
  
  {
    name: isLeftHanded ? positionNames.gully : positionNames.shortPoint,
    check: (x, y) => x < -60 && y < -25 && x ** 2 + y ** 2 < 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.shortMidOn : positionNames.shortMidOff,
    check: (x, y) => x < 0 && y > 50 && x ** 2 + y ** 2 < 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.shortMidOff : positionNames.shortMidOn,
    check: (x, y) => x > 0 && y > 50 && x ** 2 + y ** 2 < 100 ** 2,
  },
  { 
    name: isLeftHanded ? positionNames.shortCover : positionNames.shortMidWicket,
    check: (x, y) => x > 0 && y > -30 && x ** 2 + y ** 2 < 100 ** 2 && x ** 2 + y ** 2 > 50 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.shortMidWicket : positionNames.shortCover,
    check: (x, y) => x < 0 && y > -25 && x ** 2 + y ** 2 < 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.slip : positionNames.legSlip,
    check: (x, y) => x > 0 && y < -60 && x ** 2 + y ** 2 < 100 ** 2 && x ** 2 + y ** 2 > 50 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.legSlip : positionNames.slip,
    check: (x, y) => x < 0 && y < -50 && x ** 2 + y ** 2 < 100 ** 2 && x ** 2 + y ** 2 > 50 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.shortPoint : positionNames.gully,
    check: (x, y) => x > 0 && y < -30 && x ** 2 + y ** 2 < 100 ** 2 && x ** 2 + y ** 2 > 50 ** 2,
  },

  // inside the 150 circle
  {
    name: isLeftHanded ? positionNames.midOn : positionNames.midOff,
    check: (x, y) => x < 0 && y > 80 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.midOff : positionNames.midOn,
    check: (x, y) => x > 0 && y > 80 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.midWicket : positionNames.cover,
    check: (x, y) => x < 0 && y > -20 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.cover : positionNames.midWicket,
    check: (x, y) => x > 80 && y > -20 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.flySlip : positionNames.shortFineLeg,
    check: (x, y) => x > 0 && y < -80 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.shortFineLeg : positionNames.flySlip,
    check: (x, y) => x < 0 && y < -80 && x ** 2 + y ** 2 < 150 ** 2 && x ** 2 + y ** 2 > 100 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.point : positionNames.squareLeg,
    check: (x, y) => x > 80 && y < -20 && x ** 2 + y ** 2 > 100 ** 2 && x ** 2 + y ** 2 <= 150 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.squareLeg : positionNames.point,
    check: (x, y) => x < 0 && x ** 2 + y ** 2 > 100 ** 2 && x ** 2 + y ** 2 <= 150 ** 2,
  },

  // Outer ring positions
  {
    name: isLeftHanded ? positionNames.longOff : positionNames.longOn,
    check: (x, y) => x > 0 && y > 130 && x ** 2 + y ** 2 >= 150 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.longOn : positionNames.longOff,
    check: (x, y) => x < 0 && y > 130 && x ** 2 + y ** 2 >= 150 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.deepMidWicket : positionNames.deepCover,
    check: (x, y) => x < 0 && y > -20 && x ** 2 + y ** 2 >= 150 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.deepCover : positionNames.deepMidWicket,
    check: (x, y) => x > 130 && y > -20 && x ** 2 + y ** 2 >= 150 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.fineLeg : positionNames.thirdMan,
    check: (x, y) => x < 0 && y < -130 && x ** 2 + y ** 2 >= 150 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.thirdMan : positionNames.fineLeg,
    check: (x, y) => x > 0 && y < -130 && x ** 2 + y ** 2 >= 150 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.deepPoint : positionNames.deepSquareLeg,
    check: (x, y) => x > 130 && y < -20 && x ** 2 + y ** 2 >= 150 ** 2,
  },
  {
    name: isLeftHanded ? positionNames.deepSquareLeg : positionNames.deepPoint,
    check: (x, y) => x < 0 && y < -20 && x ** 2 + y ** 2 >= 150 ** 2,
  }
]