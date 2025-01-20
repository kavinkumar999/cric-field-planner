"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { PlayerPosition, FieldSettings, PositionZone } from "../types/cricket"

const positionZones: PositionZone[] = [
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

const initialPositions: PlayerPosition[] = [
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

export default function Main() {
  const [positions, setPositions] = useState<PlayerPosition[]>(initialPositions)
  const [settings, setSettings] = useState<FieldSettings>({
    showNames: true,
    showPositions: true,
  })
  const [draggedPlayer, setDraggedPlayer] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const handleMouseDown = useCallback((id: number) => {
    setDraggedPlayer(id)
  }, [])

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      if (draggedPlayer === null || !svgRef.current) return

      const svg = svgRef.current
      const point = svg.createSVGPoint()
      point.x = event.clientX
      point.y = event.clientY
      const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse())

      setPositions((prev) =>
        prev.map((pos) => {
          if (pos.id === draggedPlayer) {
            const distance = Math.sqrt(svgPoint.x ** 2 + svgPoint.y ** 2)
            let newX = svgPoint.x
            let newY = svgPoint.y
            if (distance > 240) {
              const angle = Math.atan2(svgPoint.y, svgPoint.x)
              newX = 240 * Math.cos(angle)
              newY = 240 * Math.sin(angle)
            }

            // Check for new position
            const newPosition = positionZones.find((zone) => zone.check(newX, newY))

            return {
              ...pos,
              x: newX,
              y: newY,
              name: newPosition ? newPosition.name : pos.name,
              label: newPosition ? newPosition.label : pos.label,
            }
          }
          return pos
        }),
      )
    },
    [draggedPlayer],
  )

  const handleMouseUp = useCallback(() => {
    setDraggedPlayer(null)
  }, [])

  const handleNameChange = (id: number, name: string) => {
    setPositions((prev) =>
      prev.map((pos) => {
        if (pos.id === id) {
          return { ...pos, playerName: name }
        }
        return pos
      }),
    )
  }

  const downloadImage = () => {
    const svg = document.querySelector(".cricket-field") as SVGElement
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = "cricket-field.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4">
      <div className="flex-1">
        <Card>
          <CardContent>
            <svg
              ref={svgRef}
              viewBox="-250 -250 500 500"
              className="cricket-field w-full aspect-square bg-green-600 rounded-full"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Field circles */}
              <circle cx="0" cy="0" r="240" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="0" cy="0" r="150" fill="none" stroke="white" strokeWidth="2" />

              {/* Pitch */}
              <rect x="-10" y="-30" width="20" height="60" fill="tan" stroke="white" />

              {/* Players */}
              {positions.map((pos) => (
                <g
                  key={pos.id}
                  transform={`translate(${pos.x},${pos.y})`}
                  onMouseDown={() => handleMouseDown(pos.id)}
                  className="cursor-move"
                >
                  <circle r="8" fill={pos.name === "bowler" ? "red" : "blue"} />
                  {settings.showNames && (
                    <text y="20" textAnchor="middle" fill="white" className="text-xs">
                      {pos.playerName}
                    </text>
                  )}
                  {settings.showPositions && (
                    <text y="-12" textAnchor="middle" fill="white" className="text-xs">
                      {pos.label}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full lg:w-80">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showNames"
                checked={settings.showNames}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, showNames: checked as boolean }))}
              />
              <Label htmlFor="showNames">Show Player Names</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="showPositions"
                checked={settings.showPositions}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, showPositions: checked as boolean }))}
              />
              <Label htmlFor="showPositions">Show Positions</Label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Player Names</h3>
            {positions.map((pos) => (
              <Input
                key={pos.id}
                placeholder={`Player ${pos.id}`}
                value={pos.playerName}
                onChange={(e) => handleNameChange(pos.id, e.target.value)}
              />
            ))}
          </div>

          <Button onClick={downloadImage} className="w-full">
            Download Image
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

