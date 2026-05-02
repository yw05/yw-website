const stars = [
  [1, 9, 0.8, 0],
  [3, 48, 1.1, 2.6],
  [5, 82, 0.7, 5.2],
  [8, 24, 1.4, 1.4],
  [11, 66, 0.9, 4.8],
  [16, 13, 0.7, 7.1],
  [18, 91, 1.2, 3.6],
  [24, 37, 0.8, 6.3],
  [31, 73, 1.1, 0.8],
  [38, 20, 0.7, 4.1],
  [47, 58, 1, 2.2],
  [55, 11, 0.8, 6.8],
  [62, 86, 1.2, 1.7],
  [70, 29, 0.9, 5.7],
  [77, 74, 0.7, 3.1],
  [83, 18, 1.3, 0.5],
  [88, 54, 0.9, 6.2],
  [92, 88, 1.1, 2.8],
  [95, 33, 0.7, 7.4],
  [97, 68, 1.5, 1.9],
  [99, 7, 0.8, 4.4],
  [99, 95, 1, 6.9],
  [0, 96, 1.2, 3.9],
  [0, 31, 0.7, 5.9],
]

const dataStreams = [
  ['0101', 8, 18, 0],
  ['data', 18, 68, 2],
  ['1100', 34, 24, 4],
  ['model', 52, 74, 1],
  ['1011', 68, 16, 3],
  ['query', 82, 58, 5],
]

function AnimatedBackground() {
  return (
    <div className="animated-background" aria-hidden="true">
      <div className="grid-glow" />

      <div className="star-field">
        {stars.map(([left, top, size, delay]) => (
          <span
            className="star"
            key={`${left}-${top}`}
            style={{
              '--left': `${left}%`,
              '--top': `${top}%`,
              '--size': `${size}px`,
              '--delay': `${delay}s`,
            }}
          />
        ))}
      </div>

      <svg className="network-map" viewBox="0 0 1000 640" role="presentation">
        <g className="network-lines">
          <path d="M55 92 L210 188 L380 72 L575 176 L762 86 L955 208" />
          <path d="M82 520 L250 425 L438 512 L640 390 L828 474 L970 335" />
          <path d="M210 188 L250 425 L438 512 L575 176 L640 390 L762 86" />
          <path d="M35 330 L180 570 L438 512 L970 335" />
        </g>
        <g className="network-nodes">
          <circle cx="55" cy="92" r="4" />
          <circle cx="210" cy="188" r="6" />
          <circle cx="380" cy="72" r="4" />
          <circle cx="575" cy="176" r="5" />
          <circle cx="762" cy="86" r="4" />
          <circle cx="955" cy="208" r="6" />
          <circle cx="35" cy="330" r="4" />
          <circle cx="82" cy="520" r="5" />
          <circle cx="250" cy="425" r="4" />
          <circle cx="438" cy="512" r="6" />
          <circle cx="640" cy="390" r="4" />
          <circle cx="828" cy="474" r="5" />
          <circle cx="970" cy="335" r="4" />
          <circle cx="180" cy="570" r="6" />
        </g>
      </svg>

      <svg className="line-chart-map" viewBox="0 0 1000 640" role="presentation">
        <g className="chart-grid-lines">
          <path d="M70 560 H930" />
          <path d="M70 430 H930" />
          <path d="M70 300 H930" />
        </g>
        <path
          className="chart-line"
          d="M80 135 C210 455 355 565 520 565 S805 455 930 135"
        />
        <g className="chart-points">
          <circle cx="150" cy="285" r="5" />
          <circle cx="255" cy="455" r="6" />
          <circle cx="382" cy="540" r="7" />
          <circle className="chart-minimum" cx="520" cy="565" r="9" />
          <circle cx="760" cy="410" r="5" />
        </g>
        <circle className="chart-runner" r="5">
          <animateMotion
            dur="3.4s"
            fill="freeze"
            path="M80 135 C210 455 355 565 520 565"
          />
        </circle>
      </svg>

      <div className="data-streams">
        {dataStreams.map(([label, left, top, delay]) => (
          <span
            className="data-stream"
            key={`${label}-${left}`}
            style={{
              '--left': `${left}%`,
              '--top': `${top}%`,
              '--delay': `${delay}s`,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default AnimatedBackground
