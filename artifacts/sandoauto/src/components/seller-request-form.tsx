"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, ClipboardCheck } from "lucide-react";
import { useCreateSellerRequest } from "@workspace/api-client-react";

type SellerRequestFormProps = {
  variant?: "full" | "compact";
};

export function SellerRequestForm({
  variant = "full",
}: SellerRequestFormProps) {
  const compact = variant === "compact";
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleMakeModel, setVehicleMakeModel] = useState("");
  const [notes, setNotes] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const request = useCreateSellerRequest();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    request.mutate(
      {
        data: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          vehicleMakeModel: vehicleMakeModel.trim(),
          ...(notes.trim() ? { notes: notes.trim() } : {}),
        },
      },
      {
        onSuccess: (response) => setRequestId(response.id),
        onError: () =>
          setFormError(
            "Your request could not be sent. Check your connection and try again.",
          ),
      },
    );
  }

  const inputClass = compact
    ? "mt-1.5 min-h-10 w-full border border-deep-navy/20 bg-cream-gray px-3 text-[11px] text-deep-navy outline-none focus:border-deep-navy"
    : "mt-1.5 min-h-11 w-full border border-deep-navy/20 bg-cream-gray px-3 text-[12px] text-deep-navy outline-none focus:border-forest-green";
  const labelClass = compact
    ? "block text-[10px] font-semibold text-cream-gray"
    : "block text-[10px] font-semibold text-deep-navy";

  if (requestId !== null) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={
          compact
            ? "border border-cream-gray/35 bg-forest-green p-5 text-cream-gray sm:p-6"
            : "border border-deep-navy/15 bg-[#FBFAF7] p-6 text-deep-navy sm:p-8"
        }
      >
        <span className="flex h-10 w-10 items-center justify-center bg-forest-green text-cream-gray">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
          <p
            className={`mt-4 font-mono text-[9px] uppercase tracking-[.14em] ${
              compact ? "text-cream-gray" : "text-forest-green"
            }`}
          >
          Request received
        </p>
        <h2 className="mt-2 text-[22px] font-bold tracking-[-.04em]">
          Thank you, {fullName.trim().split(" ")[0]}.
        </h2>
        <p className="mt-2 text-[11px] leading-5 opacity-75">
          Request #{requestId} was received. No inspection appointment has been
          booked.
        </p>
        <button
          type="button"
          onClick={() => {
            setRequestId(null);
            setFullName("");
            setPhone("");
            setVehicleMakeModel("");
            setNotes("");
          }}
          data-testid="submit-another-request"
          className="mt-5 min-h-10 border border-current px-4 text-[10px] font-bold hover:bg-deep-navy hover:text-cream-gray"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={
        compact
          ? "border border-cream-gray/35 bg-forest-green p-4 sm:p-5"
          : "border border-deep-navy/15 bg-[#FBFAF7] p-5 sm:p-7"
      }
    >
      <h2
        className={
          compact
            ? "border-b border-cream-gray/25 pb-3 text-[13px] font-bold text-cream-gray"
            : "border-b border-deep-navy/15 pb-4 text-[14px] font-bold"
        }
      >
        {compact ? "Request an inspection" : "Vehicle and contact details"}
      </h2>
      <div
        className={`mt-4 grid gap-3 ${compact ? "sm:grid-cols-2" : "space-y-4"}`}
      >
        <label className={labelClass}>
          Full name{" "}
          <span className={compact ? "text-cream-gray" : "text-alert"}>*</span>
          <input
            required
            minLength={2}
            maxLength={120}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="name"
            data-testid="seller-full-name"
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Phone number{" "}
          <span className={compact ? "text-cream-gray" : "text-alert"}>*</span>
          <input
            required
            minLength={7}
            maxLength={30}
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            data-testid="seller-phone"
            className={inputClass}
          />
        </label>
        <label className={`${labelClass} ${compact ? "sm:col-span-2" : ""}`}>
          Vehicle make and model{" "}
          <span className={compact ? "text-cream-gray" : "text-alert"}>*</span>
          <input
            required
            minLength={2}
            maxLength={160}
            value={vehicleMakeModel}
            onChange={(event) => setVehicleMakeModel(event.target.value)}
            placeholder="For example: Toyota RAV4"
            data-testid="seller-vehicle"
            className={inputClass}
          />
        </label>
        {!compact && (
          <label className={labelClass}>
            Additional notes <span className="font-normal opacity-55">(optional)</span>
            <textarea
              maxLength={1000}
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              data-testid="seller-notes"
              className="mt-1.5 w-full resize-y border border-deep-navy/20 bg-cream-gray px-3 py-3 text-[12px] outline-none focus:border-forest-green"
            />
            <span className="mt-1 block text-right font-mono text-[8px] opacity-45">
              {notes.length}/1000
            </span>
          </label>
        )}
      </div>
      {formError && (
        <p
          role="alert"
          className="mt-4 border border-alert/30 bg-alert/5 p-3 text-[10px] leading-5 text-alert"
        >
          {formError}
        </p>
      )}
      {request.isError && !formError && (
        <p role="alert" className="mt-4 text-[10px] text-alert">
          Request submission failed.
        </p>
      )}
      <button
        type="submit"
        disabled={request.isPending}
        data-testid="seller-submit"
        className={`mt-4 flex min-h-11 w-full items-center justify-center gap-2 px-4 text-[10px] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-60 ${
          compact
            ? "bg-cream-gray text-deep-navy hover:bg-deep-navy hover:text-cream-gray focus-visible:outline-cream-gray"
            : "bg-forest-green text-cream-gray hover:bg-deep-navy focus-visible:outline-forest-green"
        }`}
      >
        {request.isPending ? "Sending request…" : "Request an inspection"}
        {!request.isPending && <ArrowRight className="h-4 w-4" />}
      </button>
      <p
        className={`mt-3 flex items-center gap-1.5 text-[9px] leading-4 ${
          compact ? "text-cream-gray/70" : "text-deep-navy/45"
        }`}
      >
        <ClipboardCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Submitting confirms receipt only; it does not book an appointment.
      </p>
    </form>
  );
}
