"use client";

import { useState } from "react";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import type { Car } from "@workspace/api-client-react";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ReportPreview({ car }: { car?: Car }) {
  const [expanded, setExpanded] = useState(false);

  function downloadReport() {
    if (!car) return;
    const lines = [
      "SandoAuto — Sample inspection report",
      `${car.year} ${car.make} ${car.model} ${car.trim}`,
      `Inspection date: ${formatDate(car.inspectionDate)}`,
      `Overall score: ${car.inspectionScore}/${car.inspectionMax}`,
      "",
      ...car.inspectionDetails.flatMap((item) => [
        `${item.name}: ${item.score}/${item.total} — ${item.status}`,
        item.note,
        "",
      ]),
      car.reportNote,
      "",
      "Demo report only. This is not a live vehicle record or purchase guarantee.",
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `sandoauto-sample-report-${car.id}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  if (!car) {
    return (
      <div
        aria-label="Loading sample inspection report"
        className="mt-6 border border-deep-navy/15 bg-[#FBFAF7] p-6"
      >
        <div className="h-4 w-48 bg-deep-navy/10" />
        <div className="mt-5 h-8 w-64 bg-deep-navy/10" />
        <div className="mt-6 h-24 bg-deep-navy/5" />
      </div>
    );
  }

  return (
    <div className="mt-6 border border-deep-navy/20 bg-[#FBFAF7]">
      <div className="flex flex-wrap items-start justify-between gap-5 border-b border-deep-navy/15 px-4 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 items-center justify-center border border-forest-green/25 bg-forest-green/5 text-forest-green">
            <Download className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[.12em] text-forest-green">
              Sample · 200+ point inspection report
            </p>
            <h3 className="mt-1 text-[15px] font-semibold">
              {car.year} {car.make} {car.model} {car.trim}
            </h3>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/45">
              Inspection date · {formatDate(car.inspectionDate)}
            </p>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/50">
            Overall score
          </p>
          <p className="font-mono text-[27px] font-semibold leading-none text-forest-green">
            {car.inspectionScore}
            <span className="text-[12px] text-deep-navy/50">
              {" "}
              / {car.inspectionMax}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-x-4 bg-[#EEECE6] px-4 py-2 font-mono text-[8px] uppercase tracking-[.1em] text-deep-navy/45 sm:grid-cols-[1fr_90px_105px] sm:px-6">
        <span>Inspection area</span>
        <span className="text-right">Score</span>
        <span className="hidden text-right sm:block">Status</span>
      </div>
      <div className="divide-y divide-deep-navy/10">
        {car.inspectionDetails.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[1fr_90px_105px] sm:items-center sm:px-6"
          >
            <div>
              <p className="text-[10px] font-semibold">{item.name}</p>
              {expanded && (
                <p className="mt-1 text-[10px] leading-5 text-deep-navy/60">
                  {item.note}
                </p>
              )}
            </div>
            <span className="font-mono text-[9px] text-deep-navy/65">
              {item.score} / {item.total}
            </span>
            <span
              className={`col-span-2 font-mono text-[8px] uppercase tracking-[.08em] sm:col-span-1 sm:text-right ${
                item.status === "passed" ? "text-forest-green" : "text-caution"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-deep-navy/15 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          data-testid="report-expand-summary"
          className="inline-flex min-h-9 items-center gap-2 border border-deep-navy/25 px-3 text-[9px] font-bold hover:border-forest-green hover:text-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
        >
          {expanded ? "Collapse full summary" : "Expand full summary"}
          <ChevronDown
            aria-hidden="true"
            className={`h-3.5 w-3.5 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={downloadReport}
            data-testid="download-sample-report"
            className="inline-flex min-h-9 items-center gap-2 text-[9px] font-bold text-deep-navy/70 hover:text-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download sample report
          </button>
          <a
            href={`/cars/${car.id}`}
            data-testid="report-view-full"
            className="inline-flex min-h-9 items-center gap-2 bg-deep-navy px-3 text-[9px] font-bold text-cream-gray hover:bg-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-green"
          >
            View full report
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="border-t border-deep-navy/10 px-4 py-2 font-mono text-[8px] leading-4 text-deep-navy/45 sm:px-6">
        Demonstration data only · verify vehicle condition and documentation
        independently.
      </p>
    </div>
  );
}
