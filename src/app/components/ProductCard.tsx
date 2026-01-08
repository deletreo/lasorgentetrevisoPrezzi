import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

// Mappa dei colori per i pallini
const colorMap: Record<string, string> = {
  'W': 'bg-white',
  'B': 'bg-black',
  'C': 'bg-[#D8DBDE]',
  'G': 'bg-gray-500',
  'S': 'bg-[#F5F5DC]',
};

// Definiamo i tipi aggiornati
type Variant = {
  nome: string;
  prezzo: number;
  descrizione?: string;
};

interface Product {
  id: string;
  nome: string;
  prezzo?: number;     // Nuovo campo
  varianti?: Variant[]; // Nuovo campo
  categoria: string;
  target: string[];
  tecnologia: string;
  installazione: string;
  immagini: string[];
  descrizione_breve: string;
  specifiche: {
    capacita?: string;
    erogazione?: string[];
    plus: string;
    personalizzazione?: string; 
    codici_colori?: string[];
  };
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasColors = product.specifiche.codici_colori && product.specifiche.codici_colori.length > 0;

  // Logica Prezzo
  const getPriceDisplay = () => {
    if (product.varianti && product.varianti.length > 0) {
      const prices = product.varianti.map(v => v.prezzo);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      
      if (min === max) return `€ ${min}`;
      return `€ ${min} - € ${max}`;
    }
    
    if (product.prezzo) {
      return `€ ${product.prezzo}`;
    }
    
    return null;
  };

  const priceString = getPriceDisplay();

  return (
    <Link href={`/prodotti/${product.id}`} className="group block h-full">
      <div className="flex flex-col h-full bg-gray-700 border border-gray-300 hover:border-gray-400 transition-all duration-500 overflow-hidden relative">
        
        {/* Immagine */}
        <div className="relative aspect-square md:aspect-4/5 overflow-hidden">
          <div className="absolute inset-0 group-hover:bg-transparent transition-colors duration-500 z-10" />
          {product.immagini && product.immagini.length > 0 ? (
            <img
              src={product.immagini[0]}
              alt={product.nome}
              className="w-full h-full object-cover transition-transform duration-1500 bg-white ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
            />
          ) : (
             <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
          )}
          
          {(product.specifiche.personalizzazione === 'Colorato' || hasColors) && (
            <div className="absolute bottom-0 w-full z-20 bg-gray-100/50 px-3 py-5 border border-white/20 shadow-lg flex items-center justify-between h-8">
              <span className="text-[10px] text-black uppercase tracking-widest font-cal font-bold">
                Colorato
              </span>
              {hasColors && (
                <div className="flex gap-1.5 backdrop-blur-sm rounded-full bg-gray-400/80 px-3 py-1.5">
                  {product.specifiche.codici_colori!.map((codice, index) => (
                    <div 
                      key={index}
                      className={`w-4 h-4 border rounded border-white/50 shadow-sm ${colorMap[codice] || 'bg-gray-400'}`}
                      title={`Colore ${codice}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-md px-3 py-1 border border-[#11414d]/30">
            <span className="text-[10px] text-white uppercase tracking-widest font-cal font-bold">
              {product.categoria}
            </span>
          </div>
        </div>

        {/* Testi e Prezzi */}
        <div className="p-6 flex flex-col grow justify-between gap-4">
          <div>
            <div className="flex flex-col gap-1 mb-2">
                <h3 className="text-2xl text-white uppercase font-cal group-hover:underline decoration-1 underline-offset-4 decoration-[#11414d]">
                {product.nome}
                </h3>
                {priceString && (
                    <span className="text-sm font-mono text-[#4fd1c5] font-bold">
                        {priceString}
                    </span>
                )}
            </div>
            
            <p className="text-xs text-white/50 font-cal uppercase tracking-widest line-clamp-2">
              {product.descrizione_breve}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
            <div className="flex flex-wrap gap-2 max-w-[85%]">
               {product.target.slice(0, 3).map((t, i) => (
                   <span key={i} className="text-[9px] uppercase border border-white/20 px-2 py-1 text-white/70 rounded-full">
                       {t}
                   </span>
               ))}
            </div>
            
            <span className="text-white group-hover:text-[#11414d] group-hover:translate-x-2 transition-all duration-300">
                <FiArrowRight />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}