import CertificationCard from './CertificationCard';
import { Certificates } from "@/lib/cert_data"


export default function CertificationSection() {
  return (
    <section id="projects" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Certificates.map((cert, index) => (
            <CertificationCard key={index} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
