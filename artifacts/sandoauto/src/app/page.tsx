"use client";

import { useListCars } from "@workspace/api-client-react";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileSearch,
  ShieldCheck,
} from "lucide-react";
import { CarCard } from "../components/car-card";
import { PageShell } from "../components/page-shell";
import { ReportPreview } from "../components/report-preview";
import { SellerRequestForm } from "../components/seller-request-form";

const inspectionSteps = [
  {
    number: "01",
    title: "Submit your car",
    text: "Share the vehicle details to request an inspection.",
  },
  {
    number: "02",
    title: "200+ point inspection",
    text: "A documented inspection records mechanical, electrical, and body condition.",
  },
  {
    number: "03",
    title: "Verified listing",
    text: "Vehicle details, inspection notes, and price are presented together.",
  },
  {
    number: "04",
    title: "Purchase with confidence",
    text: "Use the report to make an informed decision and confirm all terms.",
  },
];

export default function HomePage() {
  const { data: cars, isLoading, isError, refetch } = useListCars();
  const featured = (cars ?? []).slice(0, 3);
  const reportCar =
    (cars ?? []).find((car) => car.make.toLowerCase() === "audi") ?? featured[0];
  const heroCar =
    (cars ?? []).find((car) => car.make.toLowerCase() === "toyota") ??
    featured[0];
  const heroImage = heroCar?.imagePath ?? "/cars/toyota-rav4.jpg";

  return (
    <PageShell>
      <section className="border-b border-deep-navy/10 bg-[linear-gradient(to_right,rgba(15,31,61,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,31,61,0.035)_1px,transparent_1px)] bg-[size:42px_42px]">
        <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-12 lg:pb-16 lg:pt-20">
          <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
            <div>
              <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.16em] text-forest-green">
                <span className="h-px w-7 bg-forest-green" />
                Georgia’s inspected car marketplace
              </p>
              <h1 className="mt-5 max-w-[720px] text-[clamp(2.6rem,6.2vw,5.4rem)] font-bold leading-[1.01] tracking-[-.065em]">
                Trust Through Clarity.
                <span className="block text-deep-navy/60">
                  Verified used cars in Georgia.
                </span>
              </h1>
              <p className="mt-5 max-w-[520px] text-[14px] leading-6 text-deep-navy/70 sm:text-[15px] sm:leading-7">
                Compare vehicle details with an inspection report before you
                decide. Condition notes, scores, and evidence stay visible.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/cars"
                  data-testid="home-browse-cars"
                  className="inline-flex min-h-11 items-center gap-3 bg-forest-green px-5 text-[11px] font-bold text-cream-gray hover:bg-deep-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
                >
                  Browse sample cars <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/sell"
                  data-testid="home-request-inspection"
                  className="inline-flex min-h-11 items-center border border-deep-navy/25 px-5 text-[11px] font-bold hover:border-forest-green hover:text-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
                >
                  Sell your car
                </a>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden border border-deep-navy/15 bg-[#E4E4DE] sm:min-h-[370px]">
              <img
                src={heroImage}
                alt={
                  heroCar
                    ? `${heroCar.year} ${heroCar.make} ${heroCar.model}, sample vehicle`
                    : "Sample inspected vehicle"
                }
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/85 via-transparent to-deep-navy/10" />
              <div className="absolute left-4 top-4 flex items-center gap-2 border border-cream-gray/40 bg-deep-navy/90 px-3 py-2 text-cream-gray">
                <span className="h-2 w-2 bg-forest-green" />
                <span className="font-mono text-[8px] uppercase tracking-[.12em]">
                  Sample vehicle / report preview
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-cream-gray sm:bottom-6 sm:left-6">
                <p className="font-mono text-[9px] uppercase tracking-[.14em] text-cream-gray/70">
                  Inspection score
                </p>
                <p className="mt-1 font-mono text-[38px] font-semibold leading-none tracking-[-.05em]">
                  {heroCar ? heroCar.inspectionScore : "—"}
                  <span className="text-[16px] font-medium text-cream-gray/65">
                    {" "}
                    / {heroCar ? heroCar.inspectionMax : "100"}
                  </span>
                </p>
                <div className="mt-3 h-px w-full bg-cream-gray/25" />
                <p className="mt-2 text-[10px]">
                  {heroCar
                    ? `${heroCar.year} ${heroCar.make} ${heroCar.model} · sample data`
                    : "A report that shows condition details."}
                </p>
              </div>
            </div>
          </div>

          <form
            action="/cars"
            method="get"
            className="mt-8 grid border border-deep-navy/20 bg-[#FBFAF7] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.1fr_.8fr_auto]"
            aria-label="Search sample cars"
          >
            <label className="border-b border-deep-navy/15 p-3 sm:border-r lg:border-b-0">
              <span className="block font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/50">
                Make / model
              </span>
              <select
                name="make"
                defaultValue=""
                data-testid="home-search-make"
                className="mt-1 min-h-8 w-full bg-transparent text-[11px] font-semibold outline-none focus-visible:text-forest-green"
              >
                <option value="">All makes</option>
                <option value="Audi">Audi</option>
                <option value="Toyota">Toyota</option>
                <option value="Volvo">Volvo</option>
              </select>
            </label>
            <fieldset className="border-b border-deep-navy/15 p-3 sm:border-r lg:border-b-0">
              <legend className="font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/50">
                Year range
              </legend>
              <div className="mt-1 flex items-center gap-2">
                <input
                  aria-label="Year from"
                  name="yearFrom"
                  type="number"
                  min="1990"
                  max="2035"
                  placeholder="From"
                  data-testid="home-search-year-from"
                  className="min-h-8 w-1/2 bg-transparent font-mono text-[10px] outline-none focus-visible:text-forest-green"
                />
                <span className="text-deep-navy/35">—</span>
                <input
                  aria-label="Year to"
                  name="yearTo"
                  type="number"
                  min="1990"
                  max="2035"
                  placeholder="To"
                  data-testid="home-search-year-to"
                  className="min-h-8 w-1/2 bg-transparent font-mono text-[10px] outline-none focus-visible:text-forest-green"
                />
              </div>
            </fieldset>
            <fieldset className="border-b border-deep-navy/15 p-3 sm:border-r sm:border-b-0">
              <legend className="font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/50">
                Price range · GEL
              </legend>
              <div className="mt-1 flex items-center gap-2">
                <input
                  aria-label="Price from in GEL"
                  name="priceFrom"
                  type="number"
                  min="0"
                  placeholder="Min"
                  data-testid="home-search-price-from"
                  className="min-h-8 w-1/2 bg-transparent font-mono text-[10px] outline-none focus-visible:text-forest-green"
                />
                <span className="text-deep-navy/35">—</span>
                <input
                  aria-label="Price to in GEL"
                  name="priceTo"
                  type="number"
                  min="0"
                  placeholder="Max"
                  data-testid="home-search-price-to"
                  className="min-h-8 w-1/2 bg-transparent font-mono text-[10px] outline-none focus-visible:text-forest-green"
                />
              </div>
            </fieldset>
            <div className="flex items-center gap-2 border-b border-deep-navy/15 p-3 sm:border-b-0 lg:border-r">
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-forest-green"
                aria-hidden="true"
              />
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/50">
                  Inspection status
                </p>
                <p className="mt-1 text-[10px] font-semibold">Verified only</p>
              </div>
            </div>
            <button
              type="submit"
              data-testid="home-search-submit"
              className="flex min-h-12 items-center justify-center gap-2 bg-deep-navy px-5 text-[10px] font-bold text-cream-gray hover:bg-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green sm:col-span-2 lg:col-span-1"
            >
              <FileSearch className="h-3.5 w-3.5" aria-hidden="true" />
              Search cars
            </button>
          </form>
          <p className="mt-2 font-mono text-[8px] uppercase tracking-[.1em] text-caution">
            Sample inventory for demonstration · availability is not represented
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-deep-navy/20 pb-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.16em] text-forest-green">
              Verified inventory / sample
            </p>
            <h2 className="mt-2 text-[27px] font-bold tracking-[-.045em] sm:text-[32px]">
              Recently inspected vehicles
            </h2>
          </div>
          <a
            href="/cars"
            data-testid="home-all-listings"
            className="inline-flex min-h-9 items-center gap-2 text-[10px] font-bold text-forest-green hover:text-deep-navy"
          >
            View all sample cars <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        {isLoading ? (
          <div
            aria-label="Loading sample inventory"
            className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border border-deep-navy/10 bg-[#FBFAF7]"
              >
                <div className="aspect-[1.62] bg-deep-navy/10" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-1/3 bg-deep-navy/10" />
                  <div className="h-5 w-2/3 bg-deep-navy/10" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div
            role="alert"
            className="mt-5 border border-alert/30 bg-alert/5 p-6"
          >
            <p className="text-sm font-semibold">Inventory could not be loaded.</p>
            <button
              onClick={() => refetch()}
              className="mt-3 min-h-9 text-xs font-bold text-alert underline"
              data-testid="home-retry"
            >
              Try again
            </button>
          </div>
        ) : featured.length ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="mt-5 border border-deep-navy/15 bg-[#FBFAF7] px-6 py-10 text-center">
            <p className="text-sm font-semibold">
              No sample listings are available right now.
            </p>
            <a
              href="/sell"
              className="mt-4 inline-flex min-h-9 items-center text-xs font-bold text-forest-green underline"
            >
              Request an inspection
            </a>
          </div>
        )}
      </section>

      <section className="bg-deep-navy text-cream-gray">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
          <div className="grid gap-6 border-b border-cream-gray/15 pb-6 md:grid-cols-[1fr_.55fr] md:items-end">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.16em] text-forest-green">
                The SandoAuto standard
              </p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-[-.05em] sm:text-[36px]">
                Four steps. Every fact visible.
              </h2>
            </div>
            <p className="max-w-[390px] text-[11px] leading-5 text-cream-gray/65">
              A documented process makes condition information easier to
              review before a vehicle decision.
            </p>
          </div>
          <ol className="mt-6 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {inspectionSteps.map((step, index) => (
              <li
                key={step.number}
                className={`relative border-cream-gray/15 py-5 sm:px-4 ${
                  index < 3 ? "border-b lg:border-b-0 lg:border-r" : ""
                } ${index === 0 ? "sm:pl-0" : ""}`}
              >
                <span className="font-mono text-[9px] text-cream-gray/40">
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border border-forest-green/60 text-forest-green"
                >
                  <Check className="h-3 w-3" />
                </span>
                <h3 className="mt-5 text-[12px] font-bold">{step.title}</h3>
                <p className="mt-2 max-w-[230px] text-[10px] leading-5 text-cream-gray/60">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
          <a
            href="/inspection"
            data-testid="home-inspection-details"
            className="mt-4 inline-flex min-h-9 items-center gap-2 text-[10px] font-bold text-cream-gray/80 underline underline-offset-4 hover:text-cream-gray"
          >
            How inspection works <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="grid gap-4 border-b border-deep-navy/20 pb-5 md:grid-cols-[1fr_.55fr] md:items-end">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.16em] text-caution">
              Full evidence, not a sales claim
            </p>
            <h2 className="mt-2 text-[28px] font-bold tracking-[-.045em] sm:text-[34px]">
              A report you can actually read.
            </h2>
          </div>
          <p className="max-w-[430px] text-[11px] leading-5 text-deep-navy/60">
            The sample report shows inspection scores, item-level notes, and
            recorded observations before a price is agreed.
          </p>
        </div>
        <ReportPreview car={reportCar} />
      </section>

      <section className="bg-forest-green text-cream-gray">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-10 sm:px-8 sm:py-12 md:grid-cols-[.85fr_1.15fr] md:items-center lg:px-12">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.16em] text-cream-gray/60">
              For Georgian car owners
            </p>
            <h2 className="mt-3 max-w-[480px] text-[30px] font-bold leading-[1.08] tracking-[-.05em] sm:text-[38px]">
              Sell a verified car. Earn buyer confidence.
            </h2>
            <p className="mt-3 max-w-[440px] text-[11px] leading-5 text-cream-gray/75">
              Submit your vehicle details to request an inspection. No
              appointment is booked until the request is reviewed.
            </p>
          </div>
          <SellerRequestForm variant="compact" />
        </div>
      </section>
    </PageShell>
  );
}
