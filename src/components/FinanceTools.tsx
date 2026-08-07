import { useMemo, useState } from "react";
import { Modal, TextInput } from "./shell";
import {
  calculateEmi,
  emiTenures,
  estimateValue,
  formatInr,
  formatInrExact,
  onRoadPrice,
} from "../data/finance";
import { conditionGrades } from "../data/catalogue";
import type { Category, Listing } from "../data/types";

export function EmiCalculator({ listing }: { listing: Listing }) {
  const price = listing.priceValue;
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(9.5);
  const [months, setMonths] = useState(60);

  const downPayment = Math.round((price * downPct) / 100);
  const principal = Math.max(0, price - downPayment);
  const { emi, totalInterest, totalPayable } = useMemo(
    () => calculateEmi(principal, rate, months),
    [principal, rate, months],
  );

  return (
    <section className="tool-card" aria-label="EMI calculator">
      <header className="tool-head">
        <div>
          <p className="eyebrow">EMI CALCULATOR</p>
          <h2>{formatInrExact(emi)}/mo</h2>
        </div>
        <span className="tool-badge">{months} months</span>
      </header>

      <div className="slider-row">
        <label>
          <span>
            Down payment <b>{downPct}%</b>
          </span>
          <input
            type="range"
            min={0}
            max={60}
            step={5}
            value={downPct}
            onChange={(event) => setDownPct(Number(event.target.value))}
            aria-label="Down payment percentage"
          />
          <small>{formatInr(downPayment)}</small>
        </label>

        <label>
          <span>
            Interest rate <b>{rate.toFixed(1)}%</b>
          </span>
          <input
            type="range"
            min={6}
            max={18}
            step={0.5}
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
            aria-label="Annual interest rate"
          />
          <small>per annum, reducing balance</small>
        </label>
      </div>

      <div className="tenure-row">
        {emiTenures.map((tenure) => (
          <button
            type="button"
            key={tenure}
            className={months === tenure ? "selected" : ""}
            onClick={() => setMonths(tenure)}
          >
            {tenure}m
          </button>
        ))}
      </div>

      <dl className="tool-lines">
        <div>
          <dt>Loan amount</dt>
          <dd>{formatInr(principal)}</dd>
        </div>
        <div>
          <dt>Total interest</dt>
          <dd>{formatInr(totalInterest)}</dd>
        </div>
        <div>
          <dt>Total payable</dt>
          <dd>{formatInr(totalPayable + downPayment)}</dd>
        </div>
      </dl>
      <p className="tool-note">Indicative only. Actual offers depend on the lender, credit profile, and vehicle age.</p>
    </section>
  );
}

export function OnRoadPrice({ listing }: { listing: Listing }) {
  const breakdown = useMemo(() => onRoadPrice(listing.priceValue, listing.kind), [listing]);

  return (
    <section className="tool-card" aria-label="On-road price breakdown">
      <header className="tool-head">
        <div>
          <p className="eyebrow">ON-ROAD PRICE</p>
          <h2>{formatInr(breakdown.total)}</h2>
        </div>
        <span className="tool-badge">{listing.location}</span>
      </header>

      <dl className="tool-lines stacked">
        <div>
          <dt>Ex-showroom</dt>
          <dd>{formatInrExact(breakdown.exShowroom)}</dd>
        </div>
        <div>
          <dt>Estimated RTO</dt>
          <dd>{formatInrExact(breakdown.rto)}</dd>
        </div>
        <div>
          <dt>Insurance</dt>
          <dd>{formatInrExact(breakdown.insurance)}</dd>
        </div>
        {breakdown.handling > 0 && (
          <div>
            <dt>Handling</dt>
            <dd>{formatInrExact(breakdown.handling)}</dd>
          </div>
        )}
        <div className="total">
          <dt>Total on-road</dt>
          <dd>{formatInrExact(breakdown.total)}</dd>
        </div>
      </dl>
      <p className="tool-note">RTO and insurance are state-dependent estimates, not quotations.</p>
    </section>
  );
}

export function ValuationModal({
  open,
  onOpenChange,
  initialCategory = "Cars",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialCategory?: Category;
}) {
  const [category, setCategory] = useState<Category>(initialCategory);
  const [basePrice, setBasePrice] = useState("");
  const [year, setYear] = useState("");
  const [odometer, setOdometer] = useState("");
  const [condition, setCondition] = useState("Good");
  const [shown, setShown] = useState(false);
  const [thinking, setThinking] = useState(false);

  const numeric = (value: string) => Number(value.replace(/[^0-9]/g, "")) || 0;
  const ready = numeric(basePrice) > 0 && numeric(year) > 1980;

  const estimate = useMemo(
    () =>
      estimateValue({
        category,
        basePrice: numeric(basePrice),
        year: numeric(year),
        odometer: numeric(odometer),
        condition,
      }),
    [category, basePrice, year, odometer, condition],
  );

  const run = () => {
    if (!ready) return;
    setThinking(true);
    setShown(false);
    window.setTimeout(() => {
      setThinking(false);
      setShown(true);
    }, 900);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Ask Motora AI — Instant valuation">
      <div className="valuation">
        <p className="form-copy">
          Get an indicative resale range before you list. Motora uses category depreciation, usage, and condition.
        </p>

        <label className="form-label">Category</label>
        <div className="pill-grid">
          {(["Cars", "Bikes", "Scooters", "Commercial", "Bicycles & Kids"] as Category[]).map((item) => (
            <button
              type="button"
              key={item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="form-label">
          Original ex-showroom price (₹)
          <TextInput
            inputMode="numeric"
            value={basePrice}
            onChange={(event) => setBasePrice(event.target.value)}
            placeholder="e.g. 1200000"
          />
        </label>

        <div className="card-row">
          <label className="form-label">
            Year
            <TextInput
              inputMode="numeric"
              value={year}
              onChange={(event) => setYear(event.target.value)}
              placeholder="e.g. 2021"
            />
          </label>
          <label className="form-label">
            Odometer (km)
            <TextInput
              inputMode="numeric"
              value={odometer}
              onChange={(event) => setOdometer(event.target.value)}
              placeholder="e.g. 34000"
            />
          </label>
        </div>

        <label className="form-label">Condition</label>
        <div className="pill-grid">
          {conditionGrades.map((grade) => (
            <button
              type="button"
              key={grade}
              className={condition === grade ? "selected" : ""}
              onClick={() => setCondition(grade)}
            >
              {grade}
            </button>
          ))}
        </div>

        <button type="button" className="primary full" onClick={run} disabled={!ready || thinking}>
          {thinking ? "Analysing…" : "Estimate my vehicle"}
        </button>

        {shown && !thinking && (
          <div className="valuation-result" role="status">
            <p className="eyebrow">ESTIMATED RESALE RANGE</p>
            <h2>
              {formatInr(estimate.low)} – {formatInr(estimate.high)}
            </h2>
            <p className="tool-note">
              Based on {estimate.ageYears} year{estimate.ageYears === 1 ? "" : "s"} of depreciation, odometer use, and{" "}
              {condition.toLowerCase()} condition. This is an estimate, not an offer.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
