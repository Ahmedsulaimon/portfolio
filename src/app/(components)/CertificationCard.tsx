import Image from 'next/image'
import { Cert } from '@/lib/cert_data';


interface CertificationCardProps {
   cert: Cert;
   
  }
  
  export default function CertificationCard({cert} : CertificationCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-2">{cert.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{cert.year}</p>
        
        {cert.imageUrl && (
          <div className="relative w-full h-80 mb-4">
          <Image
            src={cert.imageUrl}
            alt={cert.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        
        )}

      </div>
    );
  }
  