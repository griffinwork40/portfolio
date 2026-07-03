import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ContactSection from '@/components/sections/ContactSection'
import EarnedPath from '@/components/ui/EarnedPath'

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* the earned path: the signal begins its descent */}
      <EarnedPath stage="emerge" animateRoute={false} />
      <AboutSection />
      <ProjectsSection />
      {/* repeated passes compress into one route */}
      <EarnedPath stage="compress" />
      <SkillsSection />
      <ExperienceSection />
      {/* the route resolves — rise into embodiment */}
      <EarnedPath stage="arrive" />
      <ContactSection />
    </>
  )
}
