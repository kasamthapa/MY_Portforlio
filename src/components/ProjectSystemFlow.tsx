import { useEffect, useId, useRef, useState } from 'react'
import '../project-system-flow.css'

export interface FlowNode {
  id: string
  title: string
  detail: string
  kind?: string
  x: number
  y: number
  mobileX: number
  mobileY: number
  width?: number
  mobileWidth?: number
}

export interface FlowEdge {
  id: string
  from: string
  to: string
  path: string
  mobilePath: string
  label?: string
  labelX?: number
  labelY?: number
  mobileLabelX?: number
  mobileLabelY?: number
}

export interface FlowStep {
  title: string
  description: string
  nodes: string[]
  edges: string[]
}

export interface ProjectFlowDefinition {
  id: string
  name: string
  nodes: FlowNode[]
  edges: FlowEdge[]
  steps: FlowStep[]
  mobileHeight: number
}

interface Props {
  definition: ProjectFlowDefinition
  enabled?: boolean
}

function splitLabel(value: string, maxCharacters: number): string[] {
  if (value.length <= maxCharacters) return [value]
  const words = value.split(' ')
  const lines: string[] = ['']
  words.forEach((word) => {
    const current = lines[lines.length - 1]
    if (current && `${current} ${word}`.length > maxCharacters && lines.length < 2) lines.push(word)
    else lines[lines.length - 1] = current ? `${current} ${word}` : word
  })
  return lines
}

function nodeOutline(width: number): string {
  return `M 7 0 H ${width - 7} L ${width} 7 V 63 L ${width - 7} 70 H 7 L 0 63 V 7 Z`
}

function TransportIcon({ type }: { type: 'previous' | 'next' | 'play' | 'pause' }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      {type === 'previous' && <><path d="M 4 4 V 16" /><path d="M 15 4 L 6 10 L 15 16 Z" /></>}
      {type === 'next' && <><path d="M 16 4 V 16" /><path d="M 5 4 L 14 10 L 5 16 Z" /></>}
      {type === 'play' && <path d="M 6 3.5 L 16 10 L 6 16.5 Z" />}
      {type === 'pause' && <><path d="M 6 4 V 16" /><path d="M 14 4 V 16" /></>}
    </svg>
  )
}

export default function ProjectSystemFlow({ definition, enabled = true }: Props) {
  const instanceId = useId().replace(/:/g, '')
  const rootRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const stepCount = definition.steps.length
  const step = definition.steps[activeIndex] ?? definition.steps[0]
  const moving = playing && inView && enabled && pageVisible

  useEffect(() => {
    setActiveIndex(0)
  }, [definition.id])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => {
      setReducedMotion(preference.matches)
      if (preference.matches) setPlaying(false)
    }
    updatePreference()
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const updateVisibility = () => setPageVisible(document.visibilityState !== 'hidden')
    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.14 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!moving || stepCount < 2) return
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % stepCount), 4500)
    return () => window.clearInterval(timer)
  }, [moving, stepCount])

  function selectStep(index: number) {
    if (!stepCount) return
    setActiveIndex((index + stepCount) % stepCount)
    setPlaying(false)
  }

  function selectNode(nodeId: string) {
    const index = definition.steps.findIndex((item) => item.nodes.includes(nodeId))
    if (index !== -1) selectStep(index)
  }

  function renderGraph(mobile: boolean) {
    const layout = mobile ? 'mobile' : 'desktop'
    const markerId = `${instanceId}-${layout}-arrow`
    const activeMarkerId = `${instanceId}-${layout}-arrow-active`
    const gridId = `${instanceId}-${layout}-grid`
    const graphHeight = mobile ? definition.mobileHeight : 430
    const activeNodes = new Set(step?.nodes ?? [])
    const activeEdges = new Set(step?.edges ?? [])

    return (
      <svg
        className={`psf-graph psf-graph-${layout}`}
        viewBox={`0 0 ${mobile ? 420 : 960} ${graphHeight}`}
        role="group"
        aria-label={`${definition.name} system flow. Select a node to follow its stage.`}
      >
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M 1 1 L 9 5 L 1 9 Z" className="psf-arrow" />
          </marker>
          <marker id={activeMarkerId} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M 1 1 L 9 5 L 1 9 Z" className="psf-arrow-active" />
          </marker>
          <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.65" className="psf-grid-dot" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} className="psf-grid" aria-hidden="true" />
        <g className="psf-connections" aria-hidden="true">
          {definition.edges.map((edge) => {
            const isActive = activeEdges.has(edge.id)
            const path = mobile ? edge.mobilePath : edge.path
            const labelX = mobile ? edge.mobileLabelX : edge.labelX
            const labelY = mobile ? edge.mobileLabelY : edge.labelY
            return (
              <g key={edge.id} className={`psf-connection${isActive ? ' is-active' : ''}`}>
                <path d={path} className="psf-edge" markerEnd={`url(#${isActive ? activeMarkerId : markerId})`} />
                {isActive && <path d={path} className="psf-edge-highlight" />}
                {isActive && moving && !reducedMotion && (
                  <circle r="3.2" className="psf-data-packet">
                    <animateMotion path={path} dur="2.2s" repeatCount="indefinite" />
                  </circle>
                )}
                {edge.label && labelX !== undefined && labelY !== undefined && (
                  <text x={labelX} y={labelY} className="psf-edge-label">{edge.label}</text>
                )}
              </g>
            )
          })}
        </g>
        <g className="psf-nodes">
          {definition.nodes.map((node) => {
            const width = (mobile ? node.mobileWidth : node.width) ?? 176
            const x = mobile ? node.mobileX : node.x
            const y = mobile ? node.mobileY : node.y
            const isActive = activeNodes.has(node.id)
            const titleLines = splitLabel(node.title, Math.floor((width - 26) / 9.2))
            const detailLines = splitLabel(node.detail, Math.floor((width - 26) / 7.1))
            const hasTwoTitleLines = titleLines.length > 1
            const titleY = node.kind ? 29 : hasTwoTitleLines ? 23 : 28
            const detailY = hasTwoTitleLines ? titleY + 31 : titleY + 21
            const availableStep = definition.steps.findIndex((item) => item.nodes.includes(node.id))
            return (
              <g
                key={node.id}
                className={`psf-node${isActive ? ' is-active' : ''}`}
                transform={`translate(${x} ${y})`}
                role="button"
                tabIndex={0}
                aria-label={`${node.title}. ${node.detail}${availableStep !== -1 ? `. Follow stage ${availableStep + 1}` : ''}`}
                aria-pressed={isActive}
                onClick={() => selectNode(node.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    selectNode(node.id)
                  }
                }}
              >
                <path d={nodeOutline(width)} className="psf-node-shape" />
                <path d={`M 13 5 H ${width - 13}`} className="psf-node-top-rule" />
                {node.kind && <text x="13" y="14" className="psf-node-kind">{node.kind}</text>}
                <text x={width / 2} y={titleY} className="psf-node-title" textAnchor="middle">
                  {titleLines.map((line, index) => <tspan key={index} x={width / 2} dy={index ? 17 : 0}>{line}</tspan>)}
                </text>
                <text x={width / 2} y={detailY} className="psf-node-detail" textAnchor="middle">
                  {detailLines.slice(0, hasTwoTitleLines ? 1 : 2).map((line, index) => <tspan key={index} x={width / 2} dy={index ? 12 : 0}>{line}</tspan>)}
                </text>
                <circle cx={width - 11} cy="59" r="2" className="psf-node-status" />
              </g>
            )
          })}
        </g>
      </svg>
    )
  }

  return (
    <div className="project-system-flow" ref={rootRef} data-playing={moving ? 'true' : 'false'}>
      <div className="psf-guide">
        <span><i aria-hidden="true" /> SYSTEM FLOW</span>
        <span>Select a stage to follow the signal</span>
      </div>
      <div className="psf-canvas">
        {renderGraph(false)}
        {renderGraph(true)}
      </div>
      <div className="psf-caption">
        <span className="psf-counter" aria-label={`Stage ${activeIndex + 1} of ${stepCount}`}>
          <b>{String(activeIndex + 1).padStart(2, '0')}</b><span>/ {String(stepCount).padStart(2, '0')}</span>
        </span>
        <div className="psf-narration" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
          <strong>{step?.title}</strong>
          <p>{step?.description}</p>
        </div>
        <div className="psf-transport" aria-label="System flow playback">
          <button type="button" onClick={() => selectStep(activeIndex - 1)} aria-label="Previous stage" disabled={stepCount < 2}>
            <TransportIcon type="previous" />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? 'Pause system flow' : 'Play system flow'}
            aria-pressed={playing}
            className={playing ? 'is-playing' : ''}
            disabled={stepCount < 2}
          >
            <TransportIcon type={playing ? 'pause' : 'play'} />
          </button>
          <button type="button" onClick={() => selectStep(activeIndex + 1)} aria-label="Next stage" disabled={stepCount < 2}>
            <TransportIcon type="next" />
          </button>
        </div>
      </div>
      <div className="psf-stage-list" aria-label="Choose a system flow stage">
        {definition.steps.map((item, index) => (
          <button
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            key={`${definition.id}-${index}`}
            onClick={() => selectStep(index)}
            aria-label={`Stage ${index + 1}: ${item.title}`}
            aria-pressed={index === activeIndex}
            title={item.title}
          >
            <span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  )
}
