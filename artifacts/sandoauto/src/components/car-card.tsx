import type { Car } from "@workspace/api-client-react";
import { ArrowUpRight, ClipboardCheck } from "lucide-react";

const fallbackImages: Record<string, string> = {
  audi: "/cars/audi-a6.jpg",
  toyota: "/cars/toyota-rav4.jpg",
  volvo: "/cars/volvo-xc60.jpg",
};

export function CarCard({ car }: { car: Car }) {
  const image = car.imagePath?.startsWith("/") ? car.imagePath : fallbackImages[car.make.toLowerCase()] ?? "/cars/audi-a6.jpg";
  return (
    <a href={`/cars/${car.id}`} data-testid={`car-card-${car.id}`} className="group block border border-deep-navy/15 bg-[#FBFAF7] text-deep-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest-green">
      <div className="relative aspect-[1.62] overflow-hidden bg-[#E7E5DE]">
        <img src={image} alt={`${car.year} ${car.make} ${car.model}`} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 border border-forest-green/30 bg-cream-gray px-2 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-forest-green"><ClipboardCheck className="h-3 w-3" /> Sample report</span>
        <span className="absolute bottom-3 right-3 z-10 bg-deep-navy px-2 py-1 font-mono text-[10px] text-cream-gray">{car.inspectionScore}/{car.inspectionMax}</span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div><p className="font-mono text-[10px] uppercase tracking-[.12em] text-deep-navy/55">{car.year} · {car.make}</p><h3 className="mt-1 text-[17px] font-bold leading-snug">{car.model} {car.trim}</h3></div>
          <ArrowUpRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-forest-green transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-deep-navy/10 pt-3 font-mono text-[9px] leading-4 text-deep-navy/65 sm:grid-cols-3">
          <div><p className="text-[7px] uppercase tracking-[.08em] text-deep-navy/40">Mileage</p><p>{car.mileageKm.toLocaleString()} km</p></div>
          <div><p className="text-[7px] uppercase tracking-[.08em] text-deep-navy/40">Engine</p><p>{car.engine}</p></div>
          <div><p className="text-[7px] uppercase tracking-[.08em] text-deep-navy/40">Transmission</p><p>{car.transmission}</p></div>
        </div>
        <div className="mt-4 flex items-center justify-between"><p className="font-mono text-[16px] font-semibold">{car.priceGel.toLocaleString()} <span className="text-[11px]">₾</span></p><span className="text-[10px] font-semibold text-forest-green">View report</span></div>
      </div>
    </a>
  );
}
