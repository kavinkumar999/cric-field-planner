export interface Position {
  id: number
  name: string
  x: number
  y: number
}

export interface PlayerPosition extends Position {
  playerName: string
}

export interface FieldSettings {
  showNames: boolean
  showPositions: boolean
  isLeftHanded: boolean
}

export interface PositionZone {
  name: string
  check: (x: number, y: number) => boolean
}
