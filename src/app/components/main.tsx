"use client"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { PlayerPosition, FieldSettings } from "../types/cricket"
import { initialPositions, positionZones } from "../utils/positions"


export default function Main() {
  const [positions, setPositions] = useState<PlayerPosition[]>(initialPositions)
  const [settings, setSettings] = useState<FieldSettings>({
    showNames: true,
    showPositions: true,
    isLeftHanded: false,
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

    const svgClone = svg.cloneNode(true) as SVGElement
    
    const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    bgCircle.setAttribute("cx", "0")
    bgCircle.setAttribute("cy", "0")
    bgCircle.setAttribute("r", "240")
    bgCircle.setAttribute("fill", "#16a34a")
    svgClone.insertBefore(bgCircle, svgClone.firstChild)

    const svgData = new XMLSerializer().serializeToString(svgClone)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = 500
      canvas.height = 500
      if (ctx) {
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = "cricket-field-planner.png"
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
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
              <rect x="-10" y="-40" width="20" height="80" fill="tan" stroke="white" />

              {/* Cricket Ball */}
              <circle 
                cx="0" 
                cy="40" 
                r="6" 
                fill="red" 
                stroke="white" 
                strokeWidth="0.5"
              />

              {/* Cricket Bat */}
              <g transform={`translate(${settings.isLeftHanded ? -7 : 7}, -47) rotate(${settings.isLeftHanded ? -45 : 45})`}>
                {/* Bat handle */}
                <rect 
                  x="-1" 
                  y="-12" 
                  width="2" 
                  height="12" 
                  fill="#5C4033" 
                  stroke="white" 
                  strokeWidth="0.5"
                />
                {/* Bat blade */}
                <rect 
                  x="-2.5" 
                  y="0" 
                  width="5" 
                  height="15" 
                  fill="#A0522D" 
                  stroke="white" 
                  strokeWidth="0.5"
                />
              </g>

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
                    <text 
                      y="20" 
                      textAnchor="middle" 
                      fill="white" 
                      className="text-sm text-[10px]"
                      style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}
                    >
                      {pos.playerName}
                    </text>
                  )}
                  {settings.showPositions && (
                    <text 
                      y="-12" 
                      textAnchor="middle" 
                      fill="black"
                      className="text-[7px]"
                      style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}
                    >
                      {pos.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full lg:w-80">
        <CardContent className="space-y-4 mt-5">
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isLeftHanded"
                checked={settings.isLeftHanded}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, isLeftHanded: checked as boolean }))}
              />
              <Label htmlFor="isLeftHanded">Left Handed</Label>
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

