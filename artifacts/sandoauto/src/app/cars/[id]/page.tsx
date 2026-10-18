"use client";

import { useGetCar } from "@workspace/api-client-react";
import {
  ArrowLeft,
  Check,
  CircleAlert,
  ClipboardCheck,
  Printer,
} from "lucide-react";
import { useParams } from "next/navigation";
import { PageShell } from "../../../components/page-shell";

function imageFor(make: string, imagePath: string) {
  if (imagePath?.startsWith("/cars/")) return imagePath;
  const makeName = make.toLowerCase();
  if (makeName.includes("toyota")) return "/cars/toyota-rav4.jpg";
  if (makeName.includes("volvo")) return "/cars/volvo-xc60.jpg";
  return "/cars/audi-a6.jpg";
}

export default function CarDetailPage() {
  const routeParams = useParams<{ id: string }>();
  const params = routeParams ?? { id: "" };
  const id = Number(params.id);
  const { data: car, isLoading, isError, refetch } = useGetCar(id);
  return <PageShell>
    <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-7 sm:px-8 lg:px-12">
      <a href="/cars" data-testid="detail-back-to-inventory" className="inline-flex min-h-9 items-center gap-2 text-[10px] font-bold text-deep-navy/65 hover:text-forest-green"><ArrowLeft className="h-3.5 w-3.5" /> Back to inventory</a>
      {isLoading ? <div aria-label="Loading vehicle report" className="mt-6"><div className="h-8 w-2/3 bg-deep-navy/10" /><div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_.7fr]"><div className="aspect-[1.5] bg-deep-navy/10" /><div className="h-80 bg-deep-navy/10" /></div></div>
      : isError || !car ? <div role="alert" className="mt-7 border border-alert/30 bg-alert/5 p-8"><h1 className="text-lg font-bold">Vehicle report unavailable</h1><p className="mt-2 text-xs leading-5 text-deep-navy/65">We couldn’t retrieve this vehicle. It may have been removed, or the service may be temporarily unavailable.</p><button onClick={() => refetch()} data-testid="detail-retry" className="mt-4 min-h-10 border border-alert/35 px-4 text-xs font-bold text-alert">Try again</button></div>
      : <>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-b border-deep-navy/20 pb-5"><div><p className="font-mono text-[9px] uppercase tracking-[.16em] text-forest-green">Sample vehicle / ID {car.id}</p><h1 className="mt-2 text-[30px] font-bold leading-tight tracking-[-.055em] sm:text-[42px]">{car.year} {car.make} {car.model} {car.trim}</h1></div><span className="border border-caution/30 bg-caution/5 px-3 py-2 font-mono text-[9px] uppercase tracking-[.1em] text-caution">Demo listing · not live stock</span></div>
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.32fr_.68fr]">
           <div className="overflow-hidden border border-deep-navy/15 bg-[#E7E5DE]"><div className="relative"><img src={imageFor(car.make, car.imagePath)} alt={`${car.year} ${car.make} ${car.model}`} className="aspect-[1.48] w-full object-cover" /><span className="absolute bottom-3 right-3 z-10 bg-deep-navy px-2 py-1 font-mono text-[9px] text-cream-gray">01 / 01</span></div><div className="flex flex-wrap items-center justify-between gap-3 border-t border-deep-navy/15 bg-[#EEECE6] px-4 py-3"><span className="inline-flex items-center gap-2 text-[10px] font-semibold"><ClipboardCheck className="h-4 w-4 text-forest-green" /> Inspection dated {new Date(car.inspectionDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span><span className="font-mono text-[9px] uppercase tracking-[.1em] text-deep-navy/55">Image supplied for demo</span></div></div>
          <aside className="border border-deep-navy/15 bg-[#FBFAF7]">
            <div className="border-b border-deep-navy/15 p-5"><p className="font-mono text-[9px] uppercase tracking-[.15em] text-deep-navy/55">Sample asking price</p><p className="mt-2 font-mono text-[28px] font-semibold tracking-[-.04em]">{car.priceGel.toLocaleString()} ₾</p><p className="mt-2 text-[9px] leading-4 text-caution">Demo figure only. This is not a live offer.</p></div>
            <div className="grid grid-cols-2 border-b border-deep-navy/15"><div className="border-r border-deep-navy/15 p-4"><p className="font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/55">Mileage</p><p className="mt-1 text-[13px] font-bold">{car.mileageKm.toLocaleString()} km</p></div><div className="p-4"><p className="font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/55">Year</p><p className="mt-1 text-[13px] font-bold">{car.year}</p></div></div>
            <dl className="divide-y divide-deep-navy/10 px-4">{[["Engine", car.engine], ["Transmission", car.transmission], ["Fuel", car.fuelType]].map(([key, value]) => <div key={key} className="flex justify-between gap-3 py-3 text-[10px]"><dt className="text-deep-navy/55">{key}</dt><dd className="text-right font-semibold">{value}</dd></div>)}</dl>
            <a href="/sell" data-testid="detail-seller-request" className="m-4 flex min-h-11 items-center justify-center border border-deep-navy/25 px-4 text-[10px] font-bold hover:border-forest-green hover:text-forest-green">Request an inspection for your car</a>
          </aside>
        </div>
        <section className="mt-9">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-deep-navy/20 pb-4"><div><p className="font-mono text-[9px] uppercase tracking-[.15em] text-forest-green">Inspection report</p><h2 className="mt-2 text-[25px] font-bold tracking-[-.045em]">Condition, item by item</h2></div><div className="flex flex-wrap items-end gap-3"><div className="border border-forest-green/30 bg-forest-green/5 px-4 py-2 text-right"><p className="font-mono text-[8px] uppercase tracking-[.12em] text-deep-navy/55">Overall score</p><p className="font-mono text-[18px] font-semibold text-forest-green">{car.inspectionScore}<span className="text-[11px] text-deep-navy/55"> / {car.inspectionMax}</span></p></div><button type="button" onClick={() => window.print()} data-testid="print-report" className="print:hidden inline-flex min-h-10 items-center gap-2 border border-deep-navy/25 px-3 text-[9px] font-bold hover:border-forest-green hover:text-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"><Printer className="h-3.5 w-3.5" aria-hidden="true" /> Print / save report</button></div></div>
          <p className="mt-4 max-w-[850px] border-l-2 border-forest-green pl-4 text-[12px] leading-6 text-deep-navy/70">{car.reportNote}</p>
          {car.inspectionDetails?.length ? <div className="mt-5 overflow-hidden border border-deep-navy/15">
            <div className="hidden grid-cols-[1.1fr_.42fr_.48fr_1fr] gap-4 bg-deep-navy px-4 py-3 font-mono text-[8px] uppercase tracking-[.12em] text-cream-gray/75 sm:grid"><span>Inspection item</span><span>Score</span><span>Status</span><span>Inspector note</span></div>
            {car.inspectionDetails.map((item, index) => <div key={`${item.name}-${index}`} className={`grid gap-x-4 gap-y-2 border-b border-deep-navy/10 px-4 py-4 last:border-b-0 sm:grid-cols-[1.1fr_.42fr_.48fr_1fr] sm:items-center ${index % 2 ? "bg-[#EEECE6]" : "bg-[#FBFAF7]"}`}><h3 className="text-[11px] font-bold">{item.name}</h3><p className="font-mono text-[10px] text-deep-navy/70"><span className="sm:hidden">Score: </span>{item.score}/{item.total}</p><p className={`inline-flex w-fit items-center gap-1.5 font-mono text-[8px] uppercase tracking-[.08em] ${item.status === "passed" ? "text-forest-green" : "text-caution"}`}>{item.status === "passed" ? <Check className="h-3 w-3" /> : <CircleAlert className="h-3 w-3" />}{item.status}</p><p className="text-[10px] leading-5 text-deep-navy/65">{item.note}</p></div>)}
          </div> : <p className="mt-5 border border-deep-navy/15 bg-[#FBFAF7] p-5 text-xs text-deep-navy/60">No inspection detail was included in this report.</p>}
          <p className="mt-4 font-mono text-[9px] leading-5 text-deep-navy/50">This report describes the supplied sample record only. Arrange your own checks and confirm all details before any purchase.</p>
        </section>
      </>}
    </div>
  </PageShell>;
}
