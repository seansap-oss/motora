import { useMemo, useState } from "react";
import { CheckIcon, Cross1Icon, PlusIcon } from "@radix-ui/react-icons";
import { TextInput } from "./shell";
import { catalogue, catalogueStats, categorySubcategories } from "../data/catalogue";
import { listings, sellers } from "../data/mockListings";
import type { Category } from "../data/types";

type Tab = "overview" | "dealers" | "catalogue" | "moderation";

const categoryList = Object.keys(categorySubcategories) as Category[];

export default function AdminPanel({ onToast }: { onToast: (message: string) => void }) {
  const [tab, setTab] = useState<Tab>("overview");
  const stats = useMemo(() => catalogueStats(), []);

  const [approvals, setApprovals] = useState(
    sellers.map((seller) => ({ id: seller.id, name: seller.name, type: seller.type, approved: seller.verified })),
  );
  const [newMake, setNewMake] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("Cars");
  const [injected, setInjected] = useState<{ make: string; model: string; category: Category }[]>([]);
  const [duplicated, setDuplicated] = useState<string[]>([]);
  const [queue, setQueue] = useState(
    listings.slice(0, 5).map((item) => ({ id: item.id, name: item.name, seller: item.sellerId, state: "pending" as
      | "pending"
      | "approved"
      | "rejected" })),
  );

  const inject = () => {
    if (!newMake.trim() || !newModel.trim()) {
      onToast("Enter both a make and a model to inject.");
      return;
    }
    setInjected((current) => [{ make: newMake.trim(), model: newModel.trim(), category: newCategory }, ...current]);
    onToast(`${newMake.trim()} ${newModel.trim()} queued for the ${newCategory} catalogue.`);
    setNewMake("");
    setNewModel("");
  };

  return (
    <div className="admin-shell">
      <div className="admin-tabs" role="tablist">
        {(
          [
            ["overview", "Overview"],
            ["dealers", "Dealers"],
            ["catalogue", "Catalogue"],
            ["moderation", "Moderation"],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            type="button"
            role="tab"
            key={id}
            aria-selected={tab === id}
            className={tab === id ? "active" : ""}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <div className="admin-metrics">
            <span>
              <b>{listings.length}</b>
              <small>Live listings</small>
            </span>
            <span>
              <b>{sellers.length}</b>
              <small>Sellers</small>
            </span>
            <span>
              <b>{queue.filter((item) => item.state === "pending").length}</b>
              <small>Pending review</small>
            </span>
            <span>
              <b>{stats.makes}</b>
              <small>Brands</small>
            </span>
            <span>
              <b>{stats.models}</b>
              <small>Models</small>
            </span>
            <span>
              <b>{stats.variants}</b>
              <small>Variants</small>
            </span>
          </div>
          <p className="tool-note">
            Owner super-admin. Actions here are staged locally in the prototype and will write through the Supabase
            service role once the backend is connected.
          </p>
        </>
      )}

      {tab === "dealers" && (
        <section className="admin-list">
          <h2>Dealer approvals</h2>
          {approvals.map((row) => (
            <div className="approval-row" key={row.id}>
              <div>
                <b>{row.name}</b>
                <small>{row.type}</small>
              </div>
              <span className={row.approved ? "state ok" : "state pending"}>
                {row.approved ? "Approved" : "Pending"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setApprovals((current) =>
                    current.map((item) => (item.id === row.id ? { ...item, approved: !item.approved } : item)),
                  );
                  onToast(`${row.name} ${row.approved ? "moved to pending" : "approved"}.`);
                }}
              >
                {row.approved ? "Revoke" : "Approve"}
              </button>
            </div>
          ))}
        </section>
      )}

      {tab === "catalogue" && (
        <>
          <section className="admin-list">
            <h2>Inject a catalogue model</h2>
            <div className="pill-grid">
              {categoryList.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={newCategory === item ? "selected" : ""}
                  onClick={() => setNewCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="card-row">
              <label className="form-label">
                Make
                <TextInput value={newMake} onChange={(event) => setNewMake(event.target.value)} placeholder="e.g. BYD" />
              </label>
              <label className="form-label">
                Model
                <TextInput
                  value={newModel}
                  onChange={(event) => setNewModel(event.target.value)}
                  placeholder="e.g. Seal"
                />
              </label>
            </div>
            <button type="button" className="primary full" onClick={inject}>
              <PlusIcon /> Inject model
            </button>
            {injected.length > 0 && (
              <ul className="injected-list">
                {injected.map((item, index) => (
                  <li key={`${item.make}-${item.model}-${index}`}>
                    <b>
                      {item.make} {item.model}
                    </b>
                    <small>{item.category}</small>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="admin-list">
            <h2>Duplicate a category</h2>
            <p className="tool-note">
              Clone an existing category's subcategory tree as the starting point for a new vertical.
            </p>
            <div className="pill-grid">
              {categoryList.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => {
                    setDuplicated((current) => [...current, `${item} copy`]);
                    onToast(`${item} tree duplicated (${categorySubcategories[item].length} subcategories).`);
                  }}
                >
                  Duplicate {item}
                </button>
              ))}
            </div>
            {duplicated.length > 0 && (
              <ul className="injected-list">
                {duplicated.map((item, index) => (
                  <li key={`${item}-${index}`}>
                    <b>{item}</b>
                    <small>Draft vertical</small>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="admin-list">
            <h2>Coverage by brand</h2>
            <div className="coverage-grid">
              {catalogue.slice(0, 12).map((make) => {
                const count = Object.values(make.models).reduce((sum, list) => sum + (list?.length ?? 0), 0);
                return (
                  <span key={make.make}>
                    <b>{make.make}</b>
                    <small>{count} models</small>
                  </span>
                );
              })}
            </div>
          </section>
        </>
      )}

      {tab === "moderation" && (
        <section className="admin-list">
          <h2>Listing review queue</h2>
          {queue.map((row) => (
            <div className="approval-row" key={row.id}>
              <div>
                <b>{row.name}</b>
                <small>{row.seller}</small>
              </div>
              <span className={row.state === "approved" ? "state ok" : row.state === "rejected" ? "state bad" : "state pending"}>
                {row.state}
              </span>
              <div className="approval-actions">
                <button
                  type="button"
                  aria-label={`Approve ${row.name}`}
                  onClick={() => {
                    setQueue((current) =>
                      current.map((item) => (item.id === row.id ? { ...item, state: "approved" } : item)),
                    );
                    onToast(`${row.name} approved.`);
                  }}
                >
                  <CheckIcon />
                </button>
                <button
                  type="button"
                  aria-label={`Reject ${row.name}`}
                  onClick={() => {
                    setQueue((current) =>
                      current.map((item) => (item.id === row.id ? { ...item, state: "rejected" } : item)),
                    );
                    onToast(`${row.name} rejected.`);
                  }}
                >
                  <Cross1Icon />
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
