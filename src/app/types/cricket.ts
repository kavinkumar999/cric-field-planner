export interface Position {
  id: number
  name: string
  label: string
  x: number
  y: number
}

export interface PlayerPosition extends Position {
  playerName: string
}

export interface FieldSettings {
  showNames: boolean
  showPositions: boolean
}

export interface PositionZone {
  name: string
  label: string
  check: (x: number, y: number) => boolean
}
