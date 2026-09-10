import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import NowSection from '@/components/sections/NowSection'
import ContactSection from '@/components/sections/ContactSection'
import EarnedPath from '@/components/ui/EarnedPath'
import Polaroid from '@/components/ui/Polaroid'

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* the earned path: the signal begins its descent */}
      <EarnedPath stage="emerge" />
      <AboutSection />
      <ProjectsSection />
      {/* repeated passes compress into one route */}
      <div className="relative">
        <EarnedPath stage="compress" />
        {/* taped OOM snapshot — agent-afk pushed the machine this hard */}
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block xl:right-8">
          <Polaroid
            src="/photos/memory-oom.webp"
            alt="macOS 'your system has run out of application memory' dialog — agent-afk did this"
            caption="oops!"
            rotate={5}
            width={500}
            height={460}
            className="w-[180px]"
          />
        </div>
      </div>
      <SkillsSection />
      <ExperienceSection />
      <NowSection />
      {/* the route resolves — rise into embodiment */}
      <EarnedPath stage="arrive" />
      <ContactSection />
    </>
  )
}
