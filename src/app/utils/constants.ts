import { PositionZone } from "../types/cricket"

export const positionNames = {
  wicketKeeper: "WK",
  bowler: "Bowler",
  sillyPoint: "Silly Point",
  sillyMidOff: "Silly Mid Off",
  sillyMidOn: "Silly Mid On",
  firstSlip: "1st Slip",
  slip: "Slip",
  secondSlip: "2nd Slip",
  thirdSlip: "3rd Slip",
  fourthSlip: "4th Slip",
  gully: "Gully",
  legGully: "Leg Gully",
  point: "Point",
  coverPoint: "Cover Point",
  squareLeg: "Square Leg",
  cover: "Cover",
  midOff: "Mid Off",
  midOn: "Mid On",
  midWicket: "Mid Wicket",
  thirdMan: "Third Man",
  deepPoint: "Deep Point",
  deepCover: "Deep Cover",
  longOff: "Long Off",
  longOn: "Long On",
  deepMidWicket: "Deep Mid Wicket",
  deepSquareLeg: "Deep Square Leg",
  fineLeg: "Fine Leg",
  shortLeg: "Short Leg",
  shortMidOn: "Short Mid On",
  shortMidOff: "Short Mid Off",
  shortPoint: "Short Point",
  shortMidWicket: "Short Mid Wicket",
  shortFlySlip: "Short Fly Slip",
  shortCover: "Short Cover",
  shortLegGully: "Short Leg Gully",
  short: "Short",
  flySlip: "Fly Slip",
  legSlip: "Leg Slip",
  sillyMidWicket: "Silly Mid Wicket",
  sillySquareLeg: "Silly Square Leg",
  shortFineLeg: "Short Fine Leg",
  sillyFlySlip: "Silly Fly Slip",
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