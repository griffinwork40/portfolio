import Image from 'next/image'

type PolaroidProps = {
  src: string
  alt: string
  caption: string
  /** rotation in degrees, e.g. -3 or 2 — composes with Framer transforms */
  rotate?: number
  /** show a strip of "washi tape" at the top */
  tape?: boolean
  /** real intrinsic dimensions of the image file — keeps the container aspect correct */
  width?: number
  height?: number
  className?: string
}

export default function Polaroid({
  src,
  alt,
  caption,
  rotate = 0,
  tape = true,
  width = 750,
  height = 1000,
  className = '',
}: PolaroidProps) {
  return (
    <figure className={`polaroid relative ${className}`} style={{ rotate: `${rotate}deg` }}>
      {tape && <span className="tape" aria-hidden="true" />}
      <div className="photo">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
          sizes="(max-width: 640px) 80vw, 320px"
        />
      </div>
      <figcaption className="font-display text-xl text-foreground">{caption}</figcaption>
    </figure>
  )
}
