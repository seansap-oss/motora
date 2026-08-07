import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  Cross1Icon,
  EnvelopeClosedIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
  MoonIcon,
  PersonIcon,
  PlayIcon,
  PlusIcon,
  Share1Icon,
  SunIcon,
} from "@radix-ui/react-icons";
import { FaBicycle, FaCarSide, FaMotorcycle, FaTruck } from "react-icons/fa6";
import { MdElectricScooter } from "react-icons/md";
import { BottomSheet, Carousel, KeyboardInput, MobileScroll } from "./mobile";
import { brands, listings } from "./data/mockListings";
import type { Category, ListingDraft } from "./data/types";
import { FilterChip, IconButton, ListingCard, SectionHeader, Spec } from "./components/ui";
import SellFlow from "./components/sell/SellFlow";
import { createDraft, draftTitle, formatPrice } from "./components/sell/draft";
import suvImage from "./assets/motora-suv.png";

type View = "home" | "results" | "detail" | "dealer" | "sell" | "seller" | "admin";

const categories: { name: Category; Icon: typeof FaCarSide }[] = [
  { name: "Cars", Icon: FaCarSide },
  { name: "Bikes", Icon: FaMotorcycle },
  { name: "Scooters", Icon: MdElectricScooter },
  { name: "Commercial", Icon: FaTruck },
  { name: "Bicycles & Kids", Icon: FaBicycle },
];

export default function Prototype({ web = false }: { web?: boolean }) {
  const [view, setView] = useState<View>("home");
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">("All");
  const [toast, setToast] = useState("");
  const [sellStep, setSellStep] = useState(1);
  const [draft, setDraft] = useState<ListingDraft>(() => createDraft());
  const updateDraft = (patch: Partial<ListingDraft>) => setDraft((current) => ({ ...current, ...patch }));

  const go = (next: View) => {
    setView(next);
    window.history.pushState({ motoraView: next }, "");
  };
  const back = () => setView("home");

  useEffect(() => {
    const onPopState = () => setView("home");
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(id);
  }, [toast]);

  const results = useMemo(() => listings.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.kind === selectedCategory;
    const matchesQuery = !query || `${item.name} ${item.kind}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [query, selectedCategory]);

  const openCategory = (category: Category) => {
    setSelectedCategory(category);
    go("results");
  };

  return (
    <div className={`${dark ? "motora-app dark" : "motora-app"}${web ? " web-layout" : ""}`}>
      <MobileScroll className="motora-scroll">
        {view === "home" && (
          <main className="motora-page home-page">
            <header className="topbar"><button className="wordmark" onClick={() => setView("home")}>Motora<span>.</span></button><div className="web-nav"><button onClick={() => go("results")}>Explore</button><button onClick={() => go("dealer")}>Dealers</button><button onClick={() => go("sell")}>List a vehicle</button></div><button className="location">Imphal <ChevronDownIcon /></button><IconButton label="Switch theme" onClick={() => setDark(!dark)}>{dark ? <SunIcon /> : <MoonIcon />}</IconButton></header>
            <section className="hero-panel">
              <div><p className="eyebrow">MOTORA INDIA · V1.0</p><h1>Find your<br />perfect ride</h1><p>Cars, bikes & more. All in one place.</p></div>
              <img src={suvImage} alt="Premium featured SUV" />
              <button className="hero-cta" onClick={() => go("detail")}>View details</button>
            </section>
            <label className="search-field"><MagnifyingGlassIcon /><KeyboardInput value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") go("results"); }} placeholder="Search by brand, model or keyword" /><button type="button" onClick={() => web ? go("results") : setFilterOpen(true)} aria-label="Open filters"><MixerHorizontalIcon /></button></label>
            <section className="category-row" aria-label="Vehicle categories">{categories.map(({ name, Icon }) => <button type="button" className="category-tile" key={name} onClick={() => openCategory(name)}><span><Icon /></span><small>{name === "Bicycles & Kids" ? "Bikes & Kids" : name}</small></button>)}</section>
            <button type="button" className="electric-filter" onClick={() => { setSelectedCategory("All"); go("results"); }}><span>⚡</span><b>Electric</b><small>Cross-category filter</small><span>›</span></button>
            <SectionHeader title="Popular near you" action="See all" onAction={() => go("results")} />
            <Carousel ariaLabel="Popular vehicle listings" className="listing-rail" contentClassName="listing-rail-track">{listings.slice(0, 3).map((item) => <ListingCard compact item={item} onOpen={() => go("detail")} key={item.name} />)}</Carousel>
            <SectionHeader title="Browse by brand" action="See all" onAction={() => go("results")} />
            <div className="brand-grid">{brands.map((brand) => <button type="button" key={brand} onClick={() => { setQuery(brand); go("results"); }}><strong>{brand}</strong><small>Browse</small></button>)}</div>
            <section className="premium-callout"><p className="eyebrow">MOTORA CHECKED</p><h2>Buy with more confidence.</h2><p>Inspection-backed listings with clear records.</p><button type="button" onClick={() => go("results")}>Explore checked vehicles</button></section>
            <section className="stage-two-callout"><div><p className="eyebrow">SELL ON MOTORA</p><h2>Your collection deserves its own storefront.</h2><p>Upload photos, a short walkaround video, and a voice note—then share one clean link.</p></div><button className="primary" onClick={() => go("sell")}>Start a listing</button></section>
          </main>
        )}

        {view === "results" && (
          <main className="motora-page results-page">
            <header className="screen-topbar"><IconButton label="Back to home" onClick={back}><ArrowLeftIcon /></IconButton><div><h1>Search results</h1><p>{results.length ? "12,842 results" : "No matches yet"}</p></div><IconButton label="Saved vehicles"><HeartIcon /></IconButton></header>
            <div className="filter-stack"><FilterChip label="Make" /><FilterChip label="Model" /><FilterChip label="Price" /><FilterChip label="Location" /><FilterChip label="New / Used" /><FilterChip label="Fuel / Electric" /><FilterChip label="Year" /><FilterChip label="Kilometres" /></div>
            <button className="sort-row" onClick={() => web ? setToast("Desktop filters will open in the next Stage 2 iteration.") : setFilterOpen(true)}><span>Sort by: <b>Relevance</b></span><MixerHorizontalIcon /></button>
            <section className="results-list">{results.map((item) => <article className="result-row" key={item.name}><button type="button" className="result-image" onClick={() => go("detail")}><img src={item.image} alt="" /></button><div><button type="button" className="result-title" onClick={() => go("detail")}>{item.name}</button><p>{item.year} · {item.fuel}</p><p>{item.km} · Imphal</p><strong>{item.price}</strong>{item.verified && <span className="verified-mini">✓ Verified listing</span>}</div><IconButton label="Save vehicle"><HeartIcon /></IconButton></article>)}</section>
          </main>
        )}

        {view === "detail" && (
          <main className="motora-page detail-page">
            <header className="screen-topbar overlay"><IconButton label="Back to results" onClick={back}><ArrowLeftIcon /></IconButton><div /><div className="header-actions"><IconButton label="Save vehicle"><HeartIcon /></IconButton><IconButton label="Share vehicle"><Share1Icon /></IconButton></div></header>
            <section className="detail-hero"><img src={suvImage} alt="Featured SUV" /><span className="gallery-count">▣ 1 / 5</span><button className="video-button" onClick={() => setToast("Video preview will be connected in Stage 2.")}><PlayIcon /> Play video</button></section>
            <div className="media-strip"><img src={suvImage} alt="" /><img src={suvImage} alt="" /><img src={suvImage} alt="" /><button onClick={() => setToast("Gallery opened")}>+2</button></div>
            <div className="detail-body"><span className="verified-badge">✓ Verified listing</span><h1>Tata Safari XZA+</h1><p className="price">₹21.90 L <span>ⓘ</span></p><p className="subtle">Ex-showroom price · Finance options available</p><div className="spec-grid"><Spec label="Year" value="2023" /><Spec label="Driven" value="32,450 km" /><Spec label="Fuel" value="Diesel" /><Spec label="Transmission" value="Automatic" /><Spec label="Owner" value="1st Owner" /><Spec label="Registration" value="MN01 XX 1234" /></div>
              <section className="inspection-card"><div><span>✓</span><div><b>Motora Checked</b><p>160-point inspection done</p></div></div><strong>Passed</strong></section>
              <section className="seller-card"><div className="seller-avatar">AM</div><div><b>Amit Motors</b><p>Imphal, Manipur · 4.7 ★ · 46 reviews</p></div></section>
              <div className="contact-info"><span>☎ +91 98765 43210</span><span>✉ amitmotors@email.com</span></div>
              <div className="contact-actions"><button onClick={() => setToast("Call request ready")}>Call</button><button onClick={() => setToast("WhatsApp request ready")}>WhatsApp</button><button className="primary" onClick={() => setToast("Secure chat opens in Stage 2")}>Chat</button></div>
              <button className="dealer-link" onClick={() => go("dealer")}>View Amit Motors storefront →</button>
            </div>
          </main>
        )}

        {view === "dealer" && (
          <main className="motora-page dealer-page"><header className="screen-topbar"><IconButton label="Back to home" onClick={back}><ArrowLeftIcon /></IconButton><h1>Dealer store</h1><IconButton label="Share dealer store"><Share1Icon /></IconButton></header><section className="dealer-cover"><img src={suvImage} alt="Dealer showroom inventory" /></section><section className="dealer-profile"><div className="dealer-avatar">AM</div><h2>Amit Motors <span>✓</span></h2><p>Verified dealer · Imphal, Manipur</p><div className="dealer-stats"><span><b>4.7 ★</b><small>46 reviews</small></span><span><b>58</b><small>Listings</small></span><span><b>96%</b><small>Response rate</small></span></div><button className="share-store" onClick={() => setToast("Storefront link copied")}>Share storefront</button></section><div className="store-tabs"><button className="active">Cars</button><button>Bikes</button><button>Scooters</button></div><SectionHeader title="Live stock" action="See all" onAction={() => go("results")} /><div className="store-grid">{listings.slice(0, 2).map((item) => <ListingCard item={item} onOpen={() => go("detail")} key={item.name} />)}</div></main>
        )}

        {view === "sell" && (
          <SellFlow
            draft={draft}
            onDraftChange={updateDraft}
            step={sellStep}
            onStepChange={setSellStep}
            onExit={back}
            onOpenProfile={() => go("seller")}
            onPublish={() => { setToast("Listing submitted for review. Backend publish connects in Phase 3."); go("seller"); }}
            onToast={setToast}
          />
        )}

        {view === "seller" && (
          <main className="motora-page seller-page"><header className="screen-topbar"><IconButton label="Back to home" onClick={back}><ArrowLeftIcon /></IconButton><div><h1>Your Motora space</h1><p>Seller profile & listings</p></div><IconButton label="Admin tools" onClick={() => go("admin")}><MixerHorizontalIcon /></IconButton></header><section className="seller-welcome"><div className="seller-avatar">AM</div><div><p className="eyebrow">{draft.sellerType.toUpperCase()}</p><h2>Amit Motors</h2><p>Your shareable storefront is live.</p></div><button onClick={() => setToast("Storefront link copied")}>Share</button></section><div className="seller-actions"><button onClick={() => go("sell")}><PlusIcon />Create listing</button><button onClick={() => setToast("Enquiry inbox will connect in the backend stage.")}><EnvelopeClosedIcon />Enquiries</button></div><SectionHeader title="Listing drafts" action="View live store" onAction={() => go("dealer")} /><article className="draft-row"><img src={draft.media.find((item) => item.previewUrl)?.previewUrl ?? suvImage} alt="Draft vehicle" /><div><b>{draftTitle(draft)}</b><p>{draft.category ?? "Category pending"} · {draft.price ? formatPrice(draft.price) : "Draft"}</p><small>{draft.media.length} media · Step {sellStep} of 6</small></div><button onClick={() => go("sell")}>Finish</button></article><section className="admin-teaser"><p className="eyebrow">ADMIN</p><h2>Manage catalogue and media</h2><p>Private backend tools for approved Motora staff.</p><button onClick={() => go("admin")}>Open admin preview</button></section></main>
        )}

        {view === "admin" && (
          <main className="motora-page admin-page"><header className="screen-topbar"><IconButton label="Back to seller profile" onClick={() => go("seller")}><ArrowLeftIcon /></IconButton><div><h1>Admin preview</h1><p>Catalogue & moderation</p></div><IconButton label="Switch theme" onClick={() => setDark(!dark)}>{dark ? <SunIcon /> : <MoonIcon />}</IconButton></header><div className="admin-metrics"><span><b>18</b><small>Pending review</small></span><span><b>124</b><small>New media</small></span><span><b>6</b><small>Checked queue</small></span></div><section className="admin-list"><h2>Catalogue tools</h2><button onClick={() => setToast("Official/licensed catalogue photo uploader queued for backend.")}><span><b>Model assets</b><small>Upload licensed manufacturer or seller photos</small></span><PlusIcon /></button><button onClick={() => setToast("Model data import workflow queued for backend.")}><span><b>Model catalogue</b><small>Make, model, variant and category mapping</small></span><ChevronDownIcon /></button><button onClick={() => setToast("Verification review workflow queued for backend.")}><span><b>Motora Checked</b><small>Inspection certificates and reviewer queue</small></span><ChevronDownIcon /></button></section></main>
        )}
      </MobileScroll>

      <nav className="motora-bottom-nav" aria-label="Main navigation"><button className={view === "home" ? "active" : ""} onClick={() => setView("home")}><HomeIcon /><span>Home</span></button><button onClick={() => go("results")}><MagnifyingGlassIcon /><span>Explore</span></button><button className={view === "sell" ? "active" : ""} onClick={() => go("sell")}><PlusIcon /><span>Sell</span></button><button onClick={() => setToast("Shortlist is next in the buyer account build.")}><HeartIcon /><span>Shortlist</span></button><button className={view === "seller" ? "active" : ""} onClick={() => go("seller")}><PersonIcon /><span>Profile</span></button></nav>
      {toast && <div className="motora-toast">{toast}<button onClick={() => setToast("")} aria-label="Dismiss"><Cross1Icon /></button></div>}
      {!web && <BottomSheet open={filterOpen} onOpenChange={setFilterOpen} title="Search filters" description="Stage 1 preview filters"><div className="filter-sheet"><p>Filters are ready for real catalogue data in Stage 2.</p><button className="primary full" onClick={() => { setFilterOpen(false); go("results"); }}>Show matching vehicles</button></div></BottomSheet>}
    </div>
  );
}

