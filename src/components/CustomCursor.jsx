import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      raf = requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      cursor.style.width = '6px'
      cursor.style.height = '6px'
      ring.style.width = '60px'
      ring.style.height = '60px'
      ring.style.borderColor = 'rgba(212,175,55,0.9)'
    }

    const onMouseLeaveLink = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
      ring.style.width = '40px'
      ring.style.height = '40px'
      ring.style.borderColor = 'rgba(212,175,55,0.6)'
    }

    document.addEventListener('mousemove', onMouseMove)
    raf = requestAnimationFrame(animate)

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden lg:block" />
      <div ref={ringRef} className="custom-cursor-ring hidden lg:block" />
    </>
  )
}
