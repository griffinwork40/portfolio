'use client'
import SectionHeading from '@/components/ui/SectionHeading'
import Timeline from '@/components/ui/Timeline'
import { experience } from '@/data/content'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding px-4" aria-labelledby="experience-heading">
      {/* D1: outer max-w-6xl rail; Timeline stays max-w-4xl, left-aligned */}
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <SectionHeading id="experience-heading" index="04" subtitle="From founding GRAIsol to embedded contract work and independent consulting.">
            Experience
          </SectionHeading>
        </div>
        {/* D10: Timeline dedupes location vs company; dots vertically centered on h3 */}
        <div className="max-w-4xl">
          <Timeline entries={experience} />
        </div>
      </div>
    </section>
  )
}
