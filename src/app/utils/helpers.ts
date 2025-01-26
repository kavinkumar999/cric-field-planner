import { PlayerPosition } from "../types/cricket"
import { positionNames, basePositionZones } from "./constants"

export const getPositionName = (x: number, y: number, isLeftHanded: boolean): string => {
  const zones = isLeftHanded ? leftHandPositionZones : rightHandPositionZones
  const zone = zones.find(zone => zone.check(x, y))
  return zone ? zone.name : "unknown"
}

export const rightHandPositionZones = basePositionZones(false)
export const leftHandPositionZones = basePositionZones(true)

export const rightHandInitialPositions: PlayerPosition[] = [
  { id: 1, x: 0, y: -65, playerName: "WK" },  
  { id: 2, x: 0, y: 70, playerName: "Bowler" },          
  { id: 3, x: -18, y: -69, playerName: "Player 3" },
  { id: 4, x: -39, y: -65, playerName: "Player 4" },   
  { id: 5, x: -133, y: -20, playerName: "Player 5" },     
  { id: 6, x: 104, y: 60, playerName: "Player 6" },      
  { id: 7, x: -84, y: 193, playerName: "Player 7" },     
  { id: 8, x: 123, y: 179, playerName: "Player 8" },      
  { id: 9, x: 209, y: -17, playerName: "Player 9" },     
  { id: 10, x: -204, y: 100, playerName: "Player 10" },  
  { id: 11, x: 91, y: -175, playerName: "Player 11" },   
].map(pos => ({
  ...pos,
  name: pos.id === 1 ? positionNames.wicketKeeper : 
        pos.id === 2 ? positionNames.bowler :
        getPositionName(pos.x, pos.y, false)
}))

export const leftHandInitialPositions: PlayerPosition[] = [
  { id: 1, x: 0, y: -65, playerName: "WK" },
  { id: 2, x: 0, y: 70, playerName: "Bowler" },
  { id: 3, x: 32, y: -66, playerName: "Player 3" },
  { id: 4, x: -158, y: -153, playerName: "Player 4" },
  { id: 5, x: -94, y: -84, playerName: "Player 5" },
  { id: 6, x: -50, y: 115, playerName: "Player 6" },  
  { id: 7, x: 54, y: 118, playerName: "Player 7" },   
  { id: 8, x: -117, y: 35, playerName: "Player 8" },  
  { id: 9, x: 198, y: -46, playerName: "Player 9" },   
  { id: 10, x: 189, y: 121, playerName: "Player 10" }, 
  { id: 11, x: -153, y: 167, playerName: "Player 11" }, 
].map(pos => ({
  ...pos,
  name: pos.id === 1 ? positionNames.wicketKeeper : 
        pos.id === 2 ? positionNames.bowler :
        getPositionName(pos.x, pos.y, true)
}))

