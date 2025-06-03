import Image from 'next/image'

interface CertificationCardProps {
    title: string;
    year: number;
    imageUrl?: string;
   
  }
  
  export default function CertificationCard({
    title,
    year, 
    imageUrl,
   
  }:CertificationCardProps) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{year}</p>
        
        {imageUrl && (
          <div className="mb-4">
             <Image src={imageUrl} alt={title} />
          </div>
        )}

      </div>
    );
  }
  