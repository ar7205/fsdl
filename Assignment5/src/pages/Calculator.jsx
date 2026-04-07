import { useState } from 'react'
import './Calculator.css'

const BUTTONS = [
  ['AC', '+/-', '%', '÷'],
  ['7',  '8',  '9',  '×'],
  ['4',  '5',  '6',  '−'],
  ['1',  '2',  '3',  '+'],
  ['0',        '.',  '='],
]

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState(null)
  const [op, setOp] = useState(null)
  const [waitNext, setWaitNext] = useState(false)

  const inputDigit = (digit) => {
    if (waitNext) {
      setDisplay(String(digit))
      setWaitNext(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDot = () => {
    if (waitNext) { setDisplay('0.'); setWaitNext(false); return }
    if (!display.includes('.')) setDisplay(display + '.')
  }

  const clearAll = () => {
    setDisplay('0'); setPrev(null); setOp(null); setWaitNext(false)
  }

  const toggleSign = () => setDisplay(String(parseFloat(display) * -1))
  const inputPercent = () => setDisplay(String(parseFloat(display) / 100))

  const handleOp = (nextOp) => {
    const current = parseFloat(display)
    if (prev !== null && !waitNext) {
      const result = calculate(prev, current, op)
      setDisplay(String(result))
      setPrev(result)
    } else {
      setPrev(current)
    }
    setOp(nextOp)
    setWaitNext(true)
  }

  const calculate = (a, b, operation) => {
    switch (operation) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b !== 0 ? a / b : 'Error'
      default: return b
    }
  }

  const handleEquals = () => {
    if (op === null || prev === null) return
    const current = parseFloat(display)
    const result = calculate(prev, current, op)
    setDisplay(String(result))
    setPrev(null); setOp(null); setWaitNext(true)
  }

  const handleButton = (btn) => {
    if (btn === 'AC') return clearAll()
    if (btn === '+/-') return toggleSign()
    if (btn === '%') return inputPercent()
    if (btn === '.') return inputDot()
    if (btn === '=') return handleEquals()
    if (['+', '−', '×', '÷'].includes(btn)) return handleOp(btn)
    inputDigit(btn)
  }

  const isOperator = (btn) => ['+', '−', '×', '÷'].includes(btn)
  const isFunction = (btn) => ['AC', '+/-', '%'].includes(btn)

  return (
    <div className="calc-page">
      {/* Left: Hero display panel */}
      <div className="calc-hero">
        <div>
          <div className="calc-label">⬡ Calculator v2</div>
          <h1 className="calc-hero-title">
            Smart<br /><span className="accent">Compute.</span>
          </h1>
        </div>

        <div className="calc-display-area">
          <div className="calc-op-indicator">{op || ''}</div>
          <div className="calc-value">{display}</div>
          <div className="calc-display-line" />
          <div className="calc-hint">// result displayed above</div>
        </div>
      </div>

      {/* Right: Buttons panel */}
      <div className="calc-buttons-panel">
        <div className="calc-buttons-header">
          <h3>Input Controls</h3>
        </div>
        <div className="calc-buttons">
          {BUTTONS.map((row, ri) => (
            <div key={ri} className="calc-row">
              {row.map((btn) => (
                <button
                  key={btn}
                  className={`calc-btn ${isOperator(btn) ? 'op' : ''} ${isFunction(btn) ? 'fn' : ''} ${btn === '0' ? 'wide' : ''} ${btn === '=' ? 'eq' : ''}`}
                  onClick={() => handleButton(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
