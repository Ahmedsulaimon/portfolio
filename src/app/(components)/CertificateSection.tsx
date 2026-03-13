import CertificationCard from './CertificationCard';
import FadeIn from './FadeIn';
import { Certificates } from "@/lib/cert_data";

export default function CertificationSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Certifications
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Certificates.map((cert, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <CertificationCard cert={cert} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
