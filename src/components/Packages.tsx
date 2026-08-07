import { CheckIcon } from "@radix-ui/react-icons";
import { packages } from "../data/packages";
import type { PackageId, PackagePlan } from "../data/types";

export default function Packages({
  currentId,
  onChoose,
  onContactSales,
}: {
  currentId: PackageId;
  onChoose: (plan: PackagePlan) => void;
  onContactSales: () => void;
}) {
  return (
    <div className="package-grid">
      {packages.map((plan) => {
        const active = plan.id === currentId;
        return (
          <article key={plan.id} className={active ? "package-card active" : "package-card"}>
            {plan.featured && <span className="package-flag">Most popular</span>}
            <header>
              <b>{plan.name}</b>
              <p className="package-price">
                {plan.priceLabel}
                <small>{plan.period}</small>
              </p>
            </header>
            {plan.split && <p className="package-split">{plan.split}</p>}
            <ul>
              {plan.highlights.map((line) => (
                <li key={line}>
                  <CheckIcon />
                  {line}
                </li>
              ))}
            </ul>
            {active ? (
              <span className="package-current">Current plan</span>
            ) : plan.custom ? (
              <button type="button" onClick={onContactSales}>
                Talk to sales
              </button>
            ) : (
              <button type="button" className="primary" onClick={() => onChoose(plan)}>
                {plan.price === 0 ? "Switch to Free" : `Upgrade · ${plan.priceLabel}`}
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}
