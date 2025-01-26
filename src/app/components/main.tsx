"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { PlayerPosition, FieldSettings } from "../types/cricket"
import { rightHandPositionZones, leftHandPositionZones, getPositionName, rightHandInitialPositions, leftHandInitialPositions } from "../utils/helpers"
import { positionNames } from "../utils/constants"

interface MainProps {
  devMode: boolean;
}

export default function Main({ devMode }: MainProps) {
  const [settings, setSettings] = useState<FieldSettings>({
    showNames: false,
    showPositions: true,
    isLeftHanded: false,
  })
  const [positions, setPositions] = useState<PlayerPosition[]>(() => 
    rightHandInitialPositions.map(pos => ({
      ...pos,
      name: pos.id === 1 ? positionNames.wicketKeeper : 
            pos.id === 2 ? positionNames.bowler :
            getPositionName(pos.x, pos.y, false)
    }))
  )
 
  const [draggedPlayer, setDraggedPlayer] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const newInitialPositions = settings.isLeftHanded ? leftHandInitialPositions : rightHandInitialPositions
    setPositions(newInitialPositions)
  }, [settings.isLeftHanded])

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
            const newX = svgPoint.x
            const newY = svgPoint.y

            const zones = settings.isLeftHanded ? leftHandPositionZones : rightHandPositionZones
            const newPosition = zones.find((zone) => zone.check(newX, newY))

            const updatedPosition = newPosition ? newPosition.name : pos.name

            return {
              ...pos,
              x: newX,
              y: newY,
              name: pos.id === 1 || pos.id === 2 ? pos.name : updatedPosition
            }
          }
          return pos
        }),
      )
    },
    [draggedPlayer, settings.isLeftHanded]
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
              <circle cx="0" cy="0" r="245" fill="none" stroke="white" strokeWidth="2" />
              <circle cx="0" cy="0" r="150" fill="none" stroke="white" strokeWidth="2" />

              {/* Dev mode elements */}
              {devMode && process.env.NODE_ENV === 'development' && (
                <>
                  <circle cx="0" cy="0" r="100" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="0" cy="0" r="50" fill="none" stroke="white" strokeWidth="2" />
                  <circle cx="0" cy="0" r="25" fill="none" stroke="white" strokeWidth="2" />
                  <line x1="-245" y1="-30" x2="245" y2="-30" stroke="white" strokeWidth="2" />
                  <line x1="0" y1="-245" x2="0" y2="245" stroke="white" strokeWidth="2" />
                  <line x1="0" y1="-30" x2="245" y2="245" stroke="blue" strokeWidth="2" />
                  <line x1="0" y1="-30" x2="-245" y2="-245" stroke="blue" strokeWidth="2" />
                  <line x1="0" y1="-30" x2="245" y2="-245" stroke="red" strokeWidth="2" />
                  <line x1="0" y1="-30" x2="-245" y2="245" stroke="red" strokeWidth="2" />
                  {/* Coordinate Labels */}
                  {/* X-axis positive */}
                  <text x="50" y="15" fill="white" fontSize="12" textAnchor="middle">50</text>
                  <text x="100" y="15" fill="white" fontSize="12" textAnchor="middle">100</text>
                  <text x="150" y="15" fill="white" fontSize="12" textAnchor="middle">150</text>
                  <text x="200" y="15" fill="white" fontSize="12" textAnchor="middle">200</text>

                  {/* X-axis negative */}
                  <text x="-50" y="15" fill="white" fontSize="12" textAnchor="middle">-50</text>
                  <text x="-100" y="15" fill="white" fontSize="12" textAnchor="middle">-100</text>
                  <text x="-150" y="15" fill="white" fontSize="12" textAnchor="middle">-150</text>
                  <text x="-200" y="15" fill="white" fontSize="12" textAnchor="middle">-200</text>

                  {/* Y-axis positive */}
                  <text x="15" y="50" fill="white" fontSize="12" textAnchor="start">50</text>
                  <text x="15" y="100" fill="white" fontSize="12" textAnchor="start">100</text>
                  <text x="15" y="150" fill="white" fontSize="12" textAnchor="start">150</text>
                  <text x="15" y="200" fill="white" fontSize="12" textAnchor="start">200</text>

                  {/* Y-axis negative */}
                  <text x="15" y="-50" fill="white" fontSize="12" textAnchor="start">-50</text>
                  <text x="15" y="-100" fill="white" fontSize="12" textAnchor="start">-100</text>
                  <text x="15" y="-150" fill="white" fontSize="12" textAnchor="start">-150</text>
                  <text x="15" y="-200" fill="white" fontSize="12" textAnchor="start">-200</text>

                  {/* Axes */}
                  <line x1="-245" y1="0" x2="245" y2="0" stroke="white" strokeWidth="1" />
                  <line x1="0" y1="-245" x2="0" y2="245" stroke="white" strokeWidth="1" />
                </>
              )}

              {/* Pitch */}
              <rect x="-10" y="-40" width="20" height="80" fill="tan" stroke="white" />

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
                  <circle 
                    r="6" 
                    fill={
                      pos.id === 1 ? "#9333ea" :  // Purple for wicket keeper
                      pos.id === 2 ? "#facc2e" :  // Yellow for bowler
                      "#2563eb"                   // Blue for other players
                    } 
                    stroke="white"
                    strokeWidth="0.5"
                  />
                  {settings.showNames && (
                    <text 
                      y="20" 
                      textAnchor="middle" 
                      fill="white" 
                      className="text-[8px]"
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
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#9333ea]" />
                <Input
                  key={positions[0].id}
                  placeholder="Wicket Keeper"
                  value={positions[0].playerName}
                  onChange={(e) => handleNameChange(positions[0].id, e.target.value)}
                  className="border-[#9333ea] focus-visible:ring-[#9333ea]"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#facc2e]" />
                <Input
                  key={positions[1].id}
                  placeholder="Bowler"
                  value={positions[1].playerName}
                  onChange={(e) => handleNameChange(positions[1].id, e.target.value)}
                  className="border-[#facc2e] focus-visible:ring-[#facc2e]"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-muted-foreground">Other Players</span>
              </div>
            </div>

            {/* Other Players */}
            <div className="space-y-2">
              {positions.slice(2).map((pos) => (
                <div key={pos.id} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2563eb]" />
                  <Input
                    placeholder={`Player ${pos.id}`}
                    value={pos.playerName}
                    onChange={(e) => handleNameChange(pos.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <Button onClick={downloadImage} className="w-full">
            Download Image
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

