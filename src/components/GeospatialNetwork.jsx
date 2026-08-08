/**
 * GeospatialNetwork — an animated survey network laid over the hero terrain.
 *
 * The node coordinates below are not invented: they were detected from the
 * bright cores in nv-hero.jpg with a connected-components pass, then scaled
 * into the viewBox. That is why the overlay sits exactly on the glowing
 * survey points in the image rather than floating near them. If the
 * background image is ever replaced, see README note at the bottom of this
 * file for how to re-derive them.
 *
 * Everything animates in CSS. There is no requestAnimationFrame loop, no
 * canvas and no animation library — the whole layer is ~60 static SVG
 * elements whose transforms and offset-distance the compositor drives, so it
 * costs effectively nothing after first paint.
 */

// ── Desktop network ────────────────────────────────────────────────────────
// viewBox 1600x900, matching nv-hero.jpg's 16:9 framing.
// r: core radius. hub: gets a wider halo and reads as a primary station.
const NODES = [
  { id: 'a', x: 1069, y: 324, r: 4.5, hub: true },
  { id: 'b', x: 964, y: 467, r: 4, hub: true },
  { id: 'c', x: 805, y: 632, r: 4, hub: true },
  { id: 'd', x: 1285, y: 801, r: 5, hub: true },
  { id: 'e', x: 1286, y: 669, r: 4.5, hub: true },
  { id: 'f', x: 1181, y: 189, r: 3 },
  { id: 'g', x: 937, y: 255, r: 2.5 },
  { id: 'h', x: 1393, y: 221, r: 2.5 },
  { id: 'i', x: 1472, y: 416, r: 3 },
  { id: 'j', x: 1469, y: 445, r: 2 },
  { id: 'k', x: 1384, y: 569, r: 3 },
  { id: 'l', x: 1113, y: 559, r: 2.5 },
  { id: 'm', x: 1250, y: 647, r: 2.5 },
  { id: 'n', x: 1064, y: 744, r: 2.5 },
  { id: 'o', x: 1106, y: 730, r: 2 },
]

// Sparse and deliberate: 13 edges across 15 nodes, not a mesh. `bend` offsets
// the quadratic control point perpendicular to the run, so a few legs bow
// like a survey traverse instead of every line being a ruler stroke.
const LINKS = [
  { from: 'c', to: 'b', bend: 14, draw: 0.2 },
  { from: 'b', to: 'a', bend: -10, draw: 0.5 },
  { from: 'a', to: 'f', draw: 0.8 },
  { from: 'a', to: 'g', bend: 8, draw: 1.1 },
  { from: 'f', to: 'h', draw: 1.35 },
  { from: 'h', to: 'i', bend: -12, draw: 1.6 },
  { from: 'i', to: 'k', draw: 1.85 },
  { from: 'k', to: 'e', bend: 10, draw: 2.1 },
  { from: 'e', to: 'd', draw: 2.35 },
  { from: 'c', to: 'd', bend: 22, draw: 2.6 },
  { from: 'l', to: 'k', draw: 2.9 },
  { from: 'e', to: 'm', draw: 3.15 },
  { from: 'n', to: 'd', bend: -8, draw: 3.4 },
]

// Only four signals, widely spaced. Each names the node it lands on so that
// node can flare exactly on arrival (delay + dur), with no JS coordination.
const SIGNALS = [
  { path: 'c-b', land: 'b', dur: 5.5, delay: 4 },
  { path: 'a-f', land: 'f', dur: 4.5, delay: 11 },
  { path: 'k-e', land: 'e', dur: 6, delay: 17 },
  { path: 'c-d', land: 'd', dur: 7, delay: 25 },
]

// ── Mobile network ─────────────────────────────────────────────────────────
// Re-derived against nv-hero-mobile.jpg, which is a crop of the right side of
// the same render — the desktop coordinates would land in the wrong place.
//
// Only nodes below y≈500 are kept. On mobile the copy stacks OVER the art
// rather than sitting beside it, so the desktop rule of "keep the left third
// clear" protects nothing: the headline spans the full width. Anything higher
// in the frame ends up behind the headline or the lede. Five nodes and two
// signals, all in the band under the CTAs.
const MOBILE_NODES = [
  { id: 'c', x: 188, y: 566, r: 4.5, hub: true },
  { id: 'k', x: 707, y: 510, r: 3.5 },
  { id: 'e', x: 619, y: 600, r: 5, hub: true },
  { id: 'n', x: 420, y: 666, r: 3.5 },
  { id: 'd', x: 619, y: 718, r: 5.5, hub: true },
]

const MOBILE_LINKS = [
  { from: 'c', to: 'n', bend: 10, draw: 0.3 },
  { from: 'n', to: 'd', draw: 0.7 },
  { from: 'k', to: 'e', bend: 8, draw: 1.1 },
  { from: 'e', to: 'd', draw: 1.5 },
]

const MOBILE_SIGNALS = [
  { path: 'c-n', land: 'n', dur: 5.5, delay: 5 },
  { path: 'k-e', land: 'e', dur: 6, delay: 15 },
]

/** Quadratic path between two nodes, bowed perpendicular to the run by `bend`. */
function pathFor(from, to, bend = 0) {
  if (!bend) return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  // Unit normal, scaled by bend.
  const cx = mx + (-dy / len) * bend
  const cy = my + (dx / len) * bend
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

function Network({ nodes, links, signals, width, height, className }) {
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]))
  const paths = links.map(l => ({
    ...l,
    key: `${l.from}-${l.to}`,
    d: pathFor(byId[l.from], byId[l.to], l.bend),
  }))
  const pathByKey = Object.fromEntries(paths.map(p => [p.key, p]))

  // When a signal lands on a node, that node flares. Precomputed here so the
  // flare is a plain CSS delay rather than a runtime event.
  const flareByNode = {}
  signals.forEach(s => {
    const p = pathByKey[s.path]
    if (p) flareByNode[s.land] = { delay: s.delay + s.dur - 0.25 }
  })

  return (
    <svg
      className={`nv-net ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="nv-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connections. pathLength="1" lets the draw-in animate dashoffset 1→0
          without needing each path's real length. */}
      <g className="nv-links">
        {paths.map(p => (
          <path
            key={p.key}
            d={p.d}
            pathLength="1"
            className="nv-link"
            style={{ '--draw-delay': `${p.draw}s` }}
          />
        ))}
      </g>

      {/* Nodes: a soft halo that breathes, over a hard core that stays put. */}
      <g className="nv-nodes">
        {nodes.map((n, i) => {
          const flare = flareByNode[n.id]
          return (
            <g key={n.id} className={`nv-node ${n.hub ? 'is-hub' : ''}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r * (n.hub ? 3.4 : 2.6)}
                className="nv-halo"
                style={{
                  // Prime numbers keep the pulses from re-synchronising.
                  '--pulse-dur': `${3.1 + (i % 5) * 0.7}s`,
                  '--pulse-delay': `${(i % 7) * 0.53}s`,
                }}
              />
              <circle cx={n.x} cy={n.y} r={n.r} className="nv-core" filter="url(#nv-glow)" />
              {flare && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  className="nv-flare"
                  style={{ '--flare-delay': `${flare.delay}s` }}
                />
              )}
            </g>
          )
        })}
      </g>

      {/* Travelling signals. offset-path moves them along the same curve the
          link uses, on the compositor rather than in JS. */}
      <g className="nv-signals">
        {signals.map(s => {
          const p = pathByKey[s.path]
          if (!p) return null
          return (
            <circle
              key={s.path}
              r="3"
              className="nv-signal"
              filter="url(#nv-glow)"
              style={{
                offsetPath: `path('${p.d}')`,
                '--sig-dur': `${s.dur}s`,
                '--sig-delay': `${s.delay}s`,
              }}
            />
          )
        })}
      </g>
    </svg>
  )
}

export default function GeospatialNetwork() {
  // Both are rendered and CSS picks one. Swapping on a JS breakpoint would
  // mean the wrong set flashes before hydration settles.
  return (
    <>
      <Network
        nodes={NODES}
        links={LINKS}
        signals={SIGNALS}
        width={1600}
        height={900}
        className="nv-net--desktop"
      />
      <Network
        nodes={MOBILE_NODES}
        links={MOBILE_LINKS}
        signals={MOBILE_SIGNALS}
        width={900}
        height={807}
        className="nv-net--mobile"
      />
    </>
  )
}

/*
 * Re-deriving coordinates for a new background image:
 *
 *   convert hero.png -colorspace Gray -threshold 78% \
 *     -define connected-components:verbose=true \
 *     -define connected-components:area-threshold=12 \
 *     -connected-components 8 null:
 *
 * That prints `id: WxH+X+Y centroid area` per bright blob. Take the centroid
 * of each, drop anything touching the frame edge, then scale into the
 * viewBox: x * (1600 / imageWidth), y * (900 / imageHeight). Larger `area`
 * means a brighter core in the render, so those are the ones worth marking
 * hub: true.
 */
