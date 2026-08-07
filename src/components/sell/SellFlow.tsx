import { useMemo, useRef, useState } from "react";
import { ArrowLeftIcon, CheckIcon, PersonIcon } from "@radix-ui/react-icons";
import { FaBicycle, FaCarSide, FaMotorcycle, FaTruck } from "react-icons/fa6";
import { MdElectricScooter } from "react-icons/md";
import { KeyboardInput, KeyboardTextarea, useKeyboard } from "../../mobile";
import {
  categorySubcategories,
  conditionGrades,
  fuelOptionsByCategory,
  makesForCategory,
  modelsFor,
  ownershipOptions,
  popularCities,
  transmissionOptionsByCategory,
  variantsFor,
  yearsFor,
} from "../../data/catalogue";
import { categoryImages } from "../../data/mockListings";
import type { Category, ListingDraft, SellerType } from "../../data/types";
import { IconButton } from "../ui";
import {
  draftTitle,
  formatOdometer,
  formatPrice,
  fuelSummary,
  isCycle,
  isElectric,
  makeMediaItem,
  sellSteps,
  stepIssues,
  totalSellSteps,
} from "./draft";

const categoryIcons: Record<Category, typeof FaCarSide> = {
  Cars: FaCarSide,
  Bikes: FaMotorcycle,
  Scooters: MdElectricScooter,
  Commercial: FaTruck,
  "Bicycles & Kids": FaBicycle,
};

const categoryList = Object.keys(categoryIcons) as Category[];

type SellFlowProps = {
  draft: ListingDraft;
  onDraftChange: (patch: Partial<ListingDraft>) => void;
  step: number;
  onStepChange: (step: number) => void;
  onExit: () => void;
  onOpenProfile: () => void;
  onPublish: () => void;
  onToast: (message: string) => void;
};

export default function SellFlow({
  draft,
  onDraftChange,
  step,
  onStepChange,
  onExit,
  onOpenProfile,
  onPublish,
  onToast,
}: SellFlowProps) {
  const keyboard = useKeyboard();
  const [showIssues, setShowIssues] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const issues = useMemo(() => stepIssues(step, draft), [step, draft]);
  const meta = sellSteps[step - 1];

  const goStep = (next: number) => {
    keyboard.hide();
    setShowIssues(false);
    onStepChange(Math.min(totalSellSteps, Math.max(1, next)));
  };

  const advance = () => {
    if (issues.length) {
      setShowIssues(true);
      onToast(issues[0]);
      return;
    }
    if (step === totalSellSteps) {
      keyboard.hide();
      onPublish();
      return;
    }
    goStep(step + 1);
  };

  const back = () => {
    if (step === 1) {
      keyboard.hide();
      onExit();
      return;
    }
    goStep(step - 1);
  };

  const cycle = isCycle(draft.category);

  return (
    <main className="motora-page sell-page">
      <header className="screen-topbar">
        <IconButton label="Back" onClick={back}>
          <ArrowLeftIcon />
        </IconButton>
        <div>
          <h1>List a vehicle</h1>
          <p>
            Step {step} of {totalSellSteps} · {meta.label} · saved as draft
          </p>
        </div>
        <IconButton label="Open seller profile" onClick={onOpenProfile}>
          <PersonIcon />
        </IconButton>
      </header>

      <div className="progress-track">
        <span style={{ width: `${(step / totalSellSteps) * 100}%` }} />
      </div>

      <ol className="step-dots" aria-label="Listing progress">
        {sellSteps.map((entry) => (
          <li key={entry.key} className={entry.id === step ? "current" : entry.id < step ? "done" : ""}>
            <button type="button" onClick={() => entry.id < step && goStep(entry.id)} aria-current={entry.id === step}>
              <span>{entry.id < step ? <CheckIcon /> : entry.id}</span>
              <small>{entry.label}</small>
            </button>
          </li>
        ))}
      </ol>

      <section className="form-card">
        <p className="eyebrow">{meta.eyebrow}</p>

        {step === 1 && <StepCategory draft={draft} onDraftChange={onDraftChange} />}
        {step === 2 && <StepVehicle draft={draft} onDraftChange={onDraftChange} />}
        {step === 3 && <StepCondition draft={draft} onDraftChange={onDraftChange} />}
        {step === 4 && <StepMedia draft={draft} onDraftChange={onDraftChange} fileRef={fileRef} onToast={onToast} />}
        {step === 5 && <StepPricing draft={draft} onDraftChange={onDraftChange} />}
        {step === 6 && <StepPreview draft={draft} onDraftChange={onDraftChange} onEditStep={goStep} />}

        {showIssues && issues.length > 0 && (
          <div className="issue-card" role="alert">
            <b>Finish this step</b>
            <ul>
              {issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="step-actions">
          <button type="button" onClick={back}>
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button type="button" className="primary" onClick={advance}>
            {step === totalSellSteps ? "Publish listing" : `Continue to ${sellSteps[step].label.toLowerCase()}`}
          </button>
        </div>
      </section>

      {!cycle && step === 3 && (
        <p className="step-footnote">Odometer and disclosure accuracy protects your Motora Checked eligibility.</p>
      )}
    </main>
  );
}

function StepCategory({ draft, onDraftChange }: { draft: ListingDraft; onDraftChange: (patch: Partial<ListingDraft>) => void }) {
  const sellerTypes: SellerType[] = ["Dealer", "Private seller", "Collector"];

  return (
    <>
      <h2>What are you listing?</h2>
      <p className="form-copy">Choose the seller type first. Your storefront and contact layout adapt automatically.</p>

      <div className="choice-grid three">
        {sellerTypes.map((item) => (
          <button
            type="button"
            key={item}
            className={draft.sellerType === item ? "selected" : ""}
            onClick={() => onDraftChange({ sellerType: item })}
          >
            {item}
          </button>
        ))}
      </div>

      <label className="form-label">Vehicle category</label>
      <div className="choice-grid">
        {categoryList.map((name) => {
          const Icon = categoryIcons[name];
          return (
            <button
              type="button"
              key={name}
              className={draft.category === name ? "selected icon-choice" : "icon-choice"}
              onClick={() =>
                onDraftChange({
                  category: name,
                  subcategory: "",
                  make: "",
                  model: "",
                  variant: "",
                  year: "",
                  fuelType: null,
                  transmission: null,
                })
              }
            >
              <Icon />
              {name}
            </button>
          );
        })}
      </div>

      {draft.category && (
        <>
          <label className="form-label">Subcategory</label>
          <div className="pill-grid">
            {categorySubcategories[draft.category].map((sub) => (
              <button
                type="button"
                key={sub}
                className={draft.subcategory === sub ? "selected" : ""}
                onClick={() => onDraftChange({ subcategory: sub })}
              >
                {sub}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function StepVehicle({ draft, onDraftChange }: { draft: ListingDraft; onDraftChange: (patch: Partial<ListingDraft>) => void }) {
  const [makeQuery, setMakeQuery] = useState("");
  const category = draft.category ?? "Cars";
  const makes = useMemo(() => makesForCategory(category), [category]);
  const filteredMakes = useMemo(
    () => makes.filter((make) => make.toLowerCase().includes(makeQuery.trim().toLowerCase())),
    [makes, makeQuery],
  );
  const models = useMemo(() => (draft.make ? modelsFor(category, draft.make) : []), [category, draft.make]);
  const variants = useMemo(
    () => (draft.make && draft.model ? variantsFor(category, draft.make, draft.model) : []),
    [category, draft.make, draft.model],
  );
  const years = useMemo(
    () => (draft.make && draft.model ? yearsFor(category, draft.make, draft.model) : []),
    [category, draft.make, draft.model],
  );

  return (
    <>
      <h2>Which {category === "Bicycles & Kids" ? "cycle" : "vehicle"} is it?</h2>
      <p className="form-copy">Pick from the Motora India catalogue so buyers can find you through make and model search.</p>

      <label className="form-label">
        Search make
        <KeyboardInput value={makeQuery} onChange={(event) => setMakeQuery(event.target.value)} placeholder="e.g. Tata, Hero, Ather" />
      </label>

      <div className="pill-grid">
        {filteredMakes.map((make) => (
          <button
            type="button"
            key={make}
            className={draft.make === make ? "selected" : ""}
            onClick={() => onDraftChange({ make, model: "", variant: "", year: "" })}
          >
            {make}
          </button>
        ))}
        {!filteredMakes.length && <p className="form-copy">No catalogue match yet for this category.</p>}
      </div>

      {draft.make && (
        <>
          <label className="form-label">Model</label>
          <div className="pill-grid">
            {models.map((entry) => (
              <button
                type="button"
                key={entry.model}
                className={draft.model === entry.model ? "selected" : ""}
                onClick={() => onDraftChange({ model: entry.model, variant: "", year: "" })}
              >
                {entry.model}
              </button>
            ))}
          </div>
        </>
      )}

      {draft.model && (
        <>
          <label className="form-label">Variant</label>
          <div className="pill-grid">
            {variants.map((variant) => (
              <button
                type="button"
                key={variant}
                className={draft.variant === variant ? "selected" : ""}
                onClick={() => onDraftChange({ variant })}
              >
                {variant}
              </button>
            ))}
          </div>

          <label className="form-label">Year of manufacture</label>
          <div className="pill-grid years">
            {years.map((year) => (
              <button
                type="button"
                key={year}
                className={draft.year === String(year) ? "selected" : ""}
                onClick={() => onDraftChange({ year: String(year) })}
              >
                {year}
              </button>
            ))}
          </div>
        </>
      )}

      {draft.make && draft.model && (
        <div className="notice-card subtle-card">
          <b>{draftTitle(draft)}</b>
          <p>
            {draft.category} · {draft.subcategory || "Subcategory pending"} {draft.year ? `· ${draft.year}` : ""}
          </p>
        </div>
      )}
    </>
  );
}

function StepCondition({ draft, onDraftChange }: { draft: ListingDraft; onDraftChange: (patch: Partial<ListingDraft>) => void }) {
  const category = draft.category ?? "Cars";
  const cycle = isCycle(draft.category);
  const fuels = fuelOptionsByCategory[category];
  const transmissions = transmissionOptionsByCategory[category];

  return (
    <>
      <h2>Condition and specifications</h2>
      <p className="form-copy">Honest condition data reduces buyer drop-off and speeds up verification.</p>

      <label className="form-label">Overall condition</label>
      <div className="pill-grid">
        {conditionGrades.map((grade) => (
          <button
            type="button"
            key={grade}
            className={draft.condition === grade ? "selected" : ""}
            onClick={() => onDraftChange({ condition: grade })}
          >
            {grade}
          </button>
        ))}
      </div>

      {!cycle && (
        <label className="form-label">
          Odometer reading (km)
          <KeyboardInput
            inputMode="numeric"
            value={draft.odometer}
            onChange={(event) => onDraftChange({ odometer: event.target.value })}
            placeholder="e.g. 32450"
          />
        </label>
      )}

      <label className="form-label">{cycle ? "Drive type" : "Fuel type"}</label>
      <div className="pill-grid">
        {fuels.map((fuel) => (
          <button
            type="button"
            key={fuel}
            className={draft.fuelType === fuel ? "selected" : ""}
            onClick={() => onDraftChange({ fuelType: fuel })}
          >
            {fuel}
          </button>
        ))}
      </div>

      {!cycle && (
        <>
          <label className="form-label">Transmission</label>
          <div className="pill-grid">
            {transmissions.map((item) => (
              <button
                type="button"
                key={item}
                className={draft.transmission === item ? "selected" : ""}
                onClick={() => onDraftChange({ transmission: item })}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )}

      {isElectric(draft) && (
        <div className="spec-branch">
          <p className="eyebrow">EV DETAILS</p>
          <label className="form-label">
            Real-world range (km)
            <KeyboardInput
              inputMode="numeric"
              value={draft.ev.rangeKm}
              onChange={(event) => onDraftChange({ ev: { ...draft.ev, rangeKm: event.target.value } })}
              placeholder="e.g. 146"
            />
          </label>
          <label className="form-label">
            Battery capacity (kWh)
            <KeyboardInput
              value={draft.ev.batteryKwh}
              onChange={(event) => onDraftChange({ ev: { ...draft.ev, batteryKwh: event.target.value } })}
              placeholder="e.g. 3.7"
            />
          </label>
          <label className="form-label">
            Full charge time (hours)
            <KeyboardInput
              value={draft.ev.chargeTimeHours}
              onChange={(event) => onDraftChange({ ev: { ...draft.ev, chargeTimeHours: event.target.value } })}
              placeholder="e.g. 5.5"
            />
          </label>
          <label className="form-label">
            Battery health (%)
            <KeyboardInput
              inputMode="numeric"
              value={draft.ev.batteryHealth}
              onChange={(event) => onDraftChange({ ev: { ...draft.ev, batteryHealth: event.target.value } })}
              placeholder="e.g. 94"
            />
          </label>
        </div>
      )}

      {cycle && (
        <div className="spec-branch">
          <p className="eyebrow">CYCLE DETAILS</p>
          <label className="form-label">
            Frame size
            <KeyboardInput
              value={draft.cycle.frameSize}
              onChange={(event) => onDraftChange({ cycle: { ...draft.cycle, frameSize: event.target.value } })}
              placeholder="e.g. M / 18 inch"
            />
          </label>
          <label className="form-label">
            Wheel size
            <KeyboardInput
              value={draft.cycle.wheelSize}
              onChange={(event) => onDraftChange({ cycle: { ...draft.cycle, wheelSize: event.target.value } })}
              placeholder="e.g. 27.5 inch"
            />
          </label>
          <label className="form-label">
            Gears
            <KeyboardInput
              value={draft.cycle.gears}
              onChange={(event) => onDraftChange({ cycle: { ...draft.cycle, gears: event.target.value } })}
              placeholder="e.g. 21 speed"
            />
          </label>
          <label className="form-label">
            Brake type
            <KeyboardInput
              value={draft.cycle.brakeType}
              onChange={(event) => onDraftChange({ cycle: { ...draft.cycle, brakeType: event.target.value } })}
              placeholder="e.g. Disc"
            />
          </label>
        </div>
      )}
    </>
  );
}

function StepMedia({
  draft,
  onDraftChange,
  fileRef,
  onToast,
}: {
  draft: ListingDraft;
  onDraftChange: (patch: Partial<ListingDraft>) => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onToast: (message: string) => void;
}) {
  const photos = draft.media.filter((item) => item.type === "photo");
  const videos = draft.media.filter((item) => item.type === "video");
  const voice = draft.media.filter((item) => item.type === "voice");

  const addFiles = (list: FileList | null) => {
    if (!list?.length) return;
    const next = Array.from(list).map(makeMediaItem);
    const merged = [...draft.media];
    next.forEach((item) => {
      if (!merged.some((existing) => existing.id === item.id)) merged.push(item);
    });
    onDraftChange({ media: merged });
  };

  const removeItem = (id: string) => onDraftChange({ media: draft.media.filter((item) => item.id !== id) });

  return (
    <>
      <h2>Show the vehicle honestly.</h2>
      <p className="form-copy">Add clear photos, an optional walkaround video, and a WhatsApp-style voice note.</p>

      <label className="upload-zone">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*,audio/*"
          multiple
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        <span className="upload-icon">+</span>
        <b>{draft.media.length ? `${draft.media.length} file${draft.media.length > 1 ? "s" : ""} ready` : "Add photos or video"}</b>
        <small>JPG, PNG, MP4 or MP3 · mobile-friendly compression</small>
      </label>

      <div className="media-counts">
        <span>
          <b>{photos.length}</b>
          <small>Photos</small>
        </span>
        <span>
          <b>{videos.length}</b>
          <small>Video</small>
        </span>
        <span>
          <b>{voice.length || (draft.voiceNoteSeconds ? 1 : 0)}</b>
          <small>Voice note</small>
        </span>
      </div>

      <div className="media-tools">
        <button type="button" onClick={() => fileRef.current?.click()}>
          Take photos
        </button>
        <button
          type="button"
          onClick={() => {
            onDraftChange({ voiceNoteSeconds: draft.voiceNoteSeconds ? 0 : 24 });
            onToast(draft.voiceNoteSeconds ? "Voice note removed" : "Voice note recorded · 0:24");
          }}
        >
          {draft.voiceNoteSeconds ? "Remove voice note" : "Record voice note"}
        </button>
      </div>

      {draft.media.length > 0 && (
        <ul className="media-list">
          {draft.media.map((item, index) => (
            <li key={item.id}>
              {item.previewUrl ? (
                <img src={item.previewUrl} alt="" />
              ) : (
                <span className="media-glyph">{item.type === "video" ? "▶" : "🎤"}</span>
              )}
              <span>
                <b>{index === 0 && item.type === "photo" ? "Primary photo" : item.name}</b>
                <small>
                  {item.type} · {Math.max(1, Math.round(item.size / 1024))} KB
                </small>
              </span>
              <button type="button" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {draft.voiceNoteSeconds > 0 && (
        <div className="voice-row">
          <span>🎤</span>
          <b>Seller voice note</b>
          <small>0:{String(draft.voiceNoteSeconds).padStart(2, "0")}</small>
        </div>
      )}
    </>
  );
}

function StepPricing({ draft, onDraftChange }: { draft: ListingDraft; onDraftChange: (patch: Partial<ListingDraft>) => void }) {
  const cycle = isCycle(draft.category);

  return (
    <>
      <h2>Price, location and ownership</h2>
      <p className="form-copy">Buyers filter on price and distance first. Disclosures build trust before the first call.</p>

      <label className="form-label">
        Asking price (₹)
        <KeyboardInput
          inputMode="numeric"
          value={draft.price}
          onChange={(event) => onDraftChange({ price: event.target.value })}
          placeholder="e.g. 2190000"
        />
      </label>
      <p className="price-hint">{formatPrice(draft.price)}</p>

      <button
        type="button"
        className={draft.negotiable ? "toggle-row on" : "toggle-row"}
        onClick={() => onDraftChange({ negotiable: !draft.negotiable })}
      >
        <span>
          <b>Price negotiable</b>
          <small>Show a "negotiable" tag on the listing card</small>
        </span>
        <i />
      </button>

      <label className="form-label">
        City / area
        <KeyboardInput
          value={draft.location}
          onChange={(event) => onDraftChange({ location: event.target.value })}
          placeholder="e.g. Imphal"
        />
      </label>
      <div className="pill-grid">
        {popularCities.map((city) => (
          <button
            type="button"
            key={city}
            className={draft.location === city ? "selected" : ""}
            onClick={() => onDraftChange({ location: city })}
          >
            {city}
          </button>
        ))}
      </div>

      <label className="form-label">
        PIN code
        <KeyboardInput
          inputMode="numeric"
          value={draft.pincode}
          onChange={(event) => onDraftChange({ pincode: event.target.value })}
          placeholder="e.g. 795001"
        />
      </label>

      {!cycle && (
        <>
          <label className="form-label">Ownership</label>
          <div className="pill-grid">
            {ownershipOptions.map((item) => (
              <button
                type="button"
                key={item}
                className={draft.ownership === item ? "selected" : ""}
                onClick={() => onDraftChange({ ownership: item })}
              >
                {item}
              </button>
            ))}
          </div>

          <label className="form-label">
            Registration number
            <KeyboardInput
              value={draft.registrationNumber}
              onChange={(event) => onDraftChange({ registrationNumber: event.target.value.toUpperCase() })}
              placeholder="e.g. MN01 XX 1234"
            />
          </label>

          <label className="form-label">
            Insurance valid till
            <KeyboardInput
              value={draft.insuranceValidTill}
              onChange={(event) => onDraftChange({ insuranceValidTill: event.target.value })}
              placeholder="e.g. Mar 2027"
            />
          </label>

          <button
            type="button"
            className={draft.hasAccidentHistory ? "toggle-row on" : "toggle-row"}
            onClick={() => onDraftChange({ hasAccidentHistory: !draft.hasAccidentHistory })}
          >
            <span>
              <b>Accident or major repair history</b>
              <small>Disclose repaired damage, flood history or engine work</small>
            </span>
            <i />
          </button>
        </>
      )}
    </>
  );
}

function StepPreview({
  draft,
  onDraftChange,
  onEditStep,
}: {
  draft: ListingDraft;
  onDraftChange: (patch: Partial<ListingDraft>) => void;
  onEditStep: (step: number) => void;
}) {
  const primaryPhoto = draft.media.find((item) => item.type === "photo" && item.previewUrl)?.previewUrl;
  const fallback = categoryImages[draft.category ?? "Cars"];

  return (
    <>
      <h2>Preview and publish</h2>
      <p className="form-copy">This is how buyers will see your listing in search results and on your storefront.</p>

      <article className="preview-card">
        <span className="preview-image">
          <img src={primaryPhoto ?? fallback} alt="" />
        </span>
        <div>
          <b>{draftTitle(draft)}</b>
          <p>
            {draft.year || "—"} · {fuelSummary(draft)}
          </p>
          <p>
            {formatOdometer(draft)} · {draft.location || "Location pending"}
          </p>
          <strong>
            {formatPrice(draft.price)}
            {draft.negotiable ? " · Negotiable" : ""}
          </strong>
        </div>
      </article>

      <div className="preview-summary">
        <PreviewRow label="Category" value={`${draft.category ?? "—"} · ${draft.subcategory || "—"}`} onEdit={() => onEditStep(1)} />
        <PreviewRow label="Vehicle" value={draftTitle(draft)} onEdit={() => onEditStep(2)} />
        <PreviewRow label="Condition" value={`${draft.condition ?? "—"} · ${formatOdometer(draft)}`} onEdit={() => onEditStep(3)} />
        <PreviewRow
          label="Media"
          value={`${draft.media.length} file${draft.media.length === 1 ? "" : "s"}${draft.voiceNoteSeconds ? " · voice note" : ""}`}
          onEdit={() => onEditStep(4)}
        />
        <PreviewRow
          label="Pricing"
          value={`${formatPrice(draft.price)} · ${draft.ownership ?? "—"}`}
          onEdit={() => onEditStep(5)}
        />
      </div>

      <label className="form-label">
        Description
        <KeyboardTextarea
          value={draft.description}
          onChange={(event) => onDraftChange({ description: event.target.value })}
          placeholder="Service history, registration, condition, known problems and why you are selling…"
        />
      </label>

      <button
        type="button"
        className={draft.contactConsent ? "toggle-row on" : "toggle-row"}
        onClick={() => onDraftChange({ contactConsent: !draft.contactConsent })}
      >
        <span>
          <b>Share my contact details with buyers</b>
          <small>Phone, WhatsApp and in-app chat on this listing</small>
        </span>
        <i />
      </button>

      <div className="notice-card">
        <b>Before publishing</b>
        <p>Motora reviews registration, disclosures and media before a listing becomes publicly searchable.</p>
      </div>
    </>
  );
}

function PreviewRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="preview-row">
      <small>{label}</small>
      <b>{value}</b>
      <button type="button" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}
