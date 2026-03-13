import Image from 'next/image'
import { Cert } from '@/lib/cert_data';


interface CertificationCardProps {
   cert: Cert;
   
  }
  
  export default function CertificationCard({cert} : CertificationCardProps) {
    return (
      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-slate-700 p-6">
        <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{cert.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.year}</p>
        
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
  