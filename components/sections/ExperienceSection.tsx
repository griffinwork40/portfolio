'use client'
import SectionHeading from '@/components/ui/SectionHeading'
import Timeline from '@/components/ui/Timeline'
import { experience } from '@/data/content'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding px-4" aria-labelledby="experience-heading">
      <div className="max-w-4xl mx-auto">
        <SectionHeading id="experience-heading" index="04" subtitle="From founding GRAIsol to embedded contract work and independent consulting.">
          Experience
        </SectionHeading>
        {/* Timeline renders bullets verbatim from content.ts; Atlas Digital status:'past' drives past tense */}
        <Timeline entries={experience} />
      </div>
    </section>
  )
}
