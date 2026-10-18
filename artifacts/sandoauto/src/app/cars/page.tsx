"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ListCarsParams, useListCars } from "@workspace/api-client-react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { PageShell } from "../../components/page-shell";
import { CarCard } from "../../components/car-card";

const emptySearchParams = new URLSearchParams();

function InventoryView() {
  const searchParams = useSearchParams();
  const search = searchParams ?? emptySearchParams;
  const router = useRouter();
  const [make, setMake] = useState(search.get("make") ?? "");
  const [yearFrom, setYearFrom] = useState(search.get("yearFrom") ?? "");
  const [yearTo, setYearTo] = useState(search.get("yearTo") ?? "");
  const [priceFrom, setPriceFrom] = useState(search.get("priceFrom") ?? "");
  const [priceTo, setPriceTo] = useState(search.get("priceTo") ?? "");
  useEffect(() => {
    setMake(search.get("make") ?? "");
    setYearFrom(search.get("yearFrom") ?? "");
    setYearTo(search.get("yearTo") ?? "");
    setPriceFrom(search.get("priceFrom") ?? "");
    setPriceTo(search.get("priceTo") ?? "");
  }, [search]);
  const params: ListCarsParams = {
    ...(make ? { make } : {}),
    ...(yearFrom ? { yearFrom: Number(yearFrom) } : {}),
    ...(yearTo ? { yearTo: Number(yearTo) } : {}),
    ...(priceFrom ? { priceFrom: Number(priceFrom) } : {}),
    ...(priceTo ? { priceTo: Number(priceTo) } : {}),
  };
  const { data: cars, isLoading, isError, refetch } = useListCars(params);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = new URLSearchParams();
    if (make) next.set("make", make);
    if (yearFrom) next.set("yearFrom", yearFrom);
    if (yearTo) next.set("yearTo", yearTo);
    if (priceFrom) next.set("priceFrom", priceFrom);
    if (priceTo) next.set("priceTo", priceTo);
    router.push(`/cars${next.size ? `?${next.toString()}` : ""}`);
  }
  function clearFilters() {
    setMake(""); setYearFrom(""); setYearTo(""); setPriceFrom(""); setPriceTo("");
    router.push("/cars");
  }
  return <PageShell>
    <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-9 sm:px-8 sm:pt-12 lg:px-12">
      <div className="border-b border-deep-navy/20 pb-6">
        <p className="font-mono text-[9px] uppercase tracking-[.16em] text-forest-green">SandoAuto / Inventory</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5"><div><h1 className="text-[34px] font-bold tracking-[-.055em] sm:text-[44px]">Inspected cars</h1><p className="mt-2 max-w-[620px] text-[12px] leading-6 text-deep-navy/65">Browse sample/demo inventory and open each vehicle’s inspection report. Listings shown here are for demonstration, not a statement of live availability.</p></div><span className="border border-caution/30 bg-caution/5 px-3 py-2 font-mono text-[9px] uppercase tracking-[.1em] text-caution">Demo inventory</span></div>
      </div>
      <div className="mt-7 grid gap-7 lg:grid-cols-[245px_1fr]">
        <aside className="h-fit border border-deep-navy/15 bg-[#EEECE6] p-4 sm:p-5">
          <div className="flex items-center gap-2 border-b border-deep-navy/15 pb-3"><SlidersHorizontal className="h-4 w-4 text-forest-green" /><h2 className="text-[12px] font-bold">Filter inventory</h2></div>
          <form onSubmit={submit} className="mt-4 space-y-4">
            <label className="block text-[10px] font-semibold">Make<select value={make} onChange={e => setMake(e.target.value)} data-testid="filter-make" className="mt-1.5 min-h-10 w-full border border-deep-navy/20 bg-cream-gray px-3 text-[11px] outline-none focus:border-forest-green"><option value="">All makes</option><option>Audi</option><option>Toyota</option><option>Volvo</option></select></label>
            <fieldset><legend className="text-[10px] font-semibold">Year range</legend><div className="mt-1.5 grid grid-cols-2 gap-2"><input aria-label="Year from" placeholder="From" type="number" min="1990" max="2035" value={yearFrom} onChange={e => setYearFrom(e.target.value)} data-testid="filter-year-from" className="min-h-10 w-full border border-deep-navy/20 bg-cream-gray px-2 font-mono text-[10px] outline-none focus:border-forest-green" /><input aria-label="Year to" placeholder="To" type="number" min="1990" max="2035" value={yearTo} onChange={e => setYearTo(e.target.value)} data-testid="filter-year-to" className="min-h-10 w-full border border-deep-navy/20 bg-cream-gray px-2 font-mono text-[10px] outline-none focus:border-forest-green" /></div></fieldset>
            <fieldset><legend className="text-[10px] font-semibold">Price range · GEL</legend><div className="mt-1.5 grid grid-cols-2 gap-2"><input aria-label="Minimum price in GEL" placeholder="Min" type="number" min="0" value={priceFrom} onChange={e => setPriceFrom(e.target.value)} data-testid="filter-price-from" className="min-h-10 w-full border border-deep-navy/20 bg-cream-gray px-2 font-mono text-[10px] outline-none focus:border-forest-green" /><input aria-label="Maximum price in GEL" placeholder="Max" type="number" min="0" value={priceTo} onChange={e => setPriceTo(e.target.value)} data-testid="filter-price-to" className="min-h-10 w-full border border-deep-navy/20 bg-cream-gray px-2 font-mono text-[10px] outline-none focus:border-forest-green" /></div></fieldset>
            <button type="submit" data-testid="apply-filters" className="flex min-h-11 w-full items-center justify-center gap-2 bg-forest-green px-4 text-[11px] font-bold text-cream-gray hover:bg-deep-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green">Apply filters <ArrowRight className="h-3.5 w-3.5" /></button>
            <button type="button" onClick={clearFilters} data-testid="clear-filters" className="min-h-9 w-full text-[10px] font-semibold text-deep-navy/65 underline underline-offset-4 hover:text-forest-green">Clear filters</button>
          </form>
        </aside>
        <section aria-label="Car results">
          <div className="mb-4 flex items-center justify-between border-b border-deep-navy/15 pb-3"><h2 className="text-[12px] font-bold">Results</h2>{!isLoading && !isError && <span className="font-mono text-[10px] text-deep-navy/55">{cars?.length ?? 0} demo listings</span>}</div>
          {isLoading ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{[1,2,3].map(i => <div key={i} className="border border-deep-navy/10 bg-[#FBFAF7]"><div className="aspect-[1.62] bg-deep-navy/10" /><div className="space-y-3 p-5"><div className="h-3 w-1/3 bg-deep-navy/10" /><div className="h-5 w-2/3 bg-deep-navy/10" /><div className="h-3 w-1/2 bg-deep-navy/10" /></div></div>)}</div>
          : isError ? <div role="alert" className="border border-alert/30 bg-alert/5 p-7"><h3 className="text-sm font-bold">Could not load inventory</h3><p className="mt-2 text-xs text-deep-navy/65">Please check your connection and try again.</p><button type="button" onClick={() => refetch()} data-testid="inventory-retry" className="mt-4 border border-alert/40 px-4 py-2 text-xs font-bold text-alert hover:bg-alert/5">Retry</button></div>
          : cars?.length ? <><p className="mb-3 font-mono text-[9px] uppercase tracking-[.1em] text-caution">Sample/demo cars — not live stock</p><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{cars.map(car => <CarCard key={car.id} car={car} />)}</div></>
          : <div className="border border-deep-navy/15 bg-[#FBFAF7] px-6 py-12 text-center"><p className="font-mono text-[9px] uppercase tracking-[.16em] text-caution">No matching results</p><h3 className="mt-3 text-lg font-bold">Nothing in this sample inventory matches.</h3><p className="mx-auto mt-2 max-w-[390px] text-xs leading-5 text-deep-navy/60">Change or clear your filters to see other demo listings.</p><button type="button" onClick={clearFilters} className="mt-5 text-xs font-bold text-forest-green underline underline-offset-4">Clear all filters</button></div>}
        </section>
      </div>
    </div>
  </PageShell>;
}

export default function CarsPage() {
  return <Suspense fallback={<PageShell><div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12"><div className="h-8 w-56 bg-deep-navy/10" /><div className="mt-8 h-72 bg-deep-navy/10" /></div></PageShell>}><InventoryView /></Suspense>;
}
