import Image from 'next/image'
import { cn } from '@/lib/utils'

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
  /** set on above-the-fold (LCP) images so they load eagerly with high fetch priority */
  priority?: boolean
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
  priority = false,
  className = '',
}: PolaroidProps) {
  return (
    <figure className={cn('polaroid relative', className)} style={{ rotate: `${rotate}deg` }}>
      {tape && <span className="tape" aria-hidden="true" />}
      <div className="photo">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full"
          sizes="(max-width: 640px) 80vw, 320px"
        />
      </div>
      <figcaption className="font-display text-xl text-foreground">{caption}</figcaption>
    </figure>
  )
}
