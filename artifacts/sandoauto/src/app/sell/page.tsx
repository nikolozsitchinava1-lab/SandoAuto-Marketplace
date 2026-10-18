import { ClipboardCheck } from "lucide-react";
import { PageShell } from "../../components/page-shell";
import { SellerRequestForm } from "../../components/seller-request-form";

export default function SellerRequestPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1100px] px-5 pb-16 pt-9 sm:px-8 sm:pt-12 lg:px-12">
        <p className="font-mono text-[9px] uppercase tracking-[.16em] text-forest-green">
          SandoAuto / Seller request
        </p>
        <div className="mt-3 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
          <div>
            <h1 className="max-w-[500px] text-[36px] font-bold leading-[1.08] tracking-[-.055em] sm:text-[48px]">
              Request a vehicle inspection.
            </h1>
            <p className="mt-5 max-w-[430px] text-[13px] leading-6 text-deep-navy/70">
              Share a few details to submit an inspection request. A report can
              help buyers understand the vehicle’s condition.
            </p>
            <div className="mt-8 border-l-2 border-forest-green pl-4">
              <h2 className="flex items-center gap-2 text-[12px] font-bold">
                <ClipboardCheck
                  className="h-4 w-4 text-forest-green"
                  aria-hidden="true"
                />
                What happens next
              </h2>
              <p className="mt-2 text-[11px] leading-5 text-deep-navy/65">
                Your request is sent to SandoAuto. The form confirms receipt
                only; inspection scheduling and vehicle availability are not
                represented here.
              </p>
            </div>
            <p className="mt-7 font-mono text-[9px] leading-5 text-deep-navy/45">
              Fields marked * are required. Your phone number is part of this
              request.
            </p>
          </div>
          <SellerRequestForm />
        </div>
      </div>
    </PageShell>
  );
}
