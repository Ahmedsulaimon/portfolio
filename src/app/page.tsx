import Header from '../app/(components)/Header';
import HeroSection from '../app/(components)/HeroSection';
import ProjectsSection from '../app/(components)/ProjectSection';
import CertificationSection from './(components)/CertificateSection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectsSection />
        <CertificationSection/>
      </main>
    </>
  );
}
