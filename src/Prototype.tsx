import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  Cross1Icon,
  EnvelopeClosedIcon,
  ExitIcon,
  HeartFilledIcon,
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
import {
  AppScroll,
  EmptyState,
  ListingCardSkeleton,
  Rail,
  ResultRowSkeleton,
  TextInput,
  useSimulatedLoad,
} from "./components/shell";
import AuthSheet from "./components/AuthSheet";
import SearchDrawer from "./components/SearchDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Packages from "./components/Packages";
import ShareSheet, { type ShareTarget } from "./components/ShareSheet";
import { EmiCalculator, OnRoadPrice, ValuationModal } from "./components/FinanceTools";
import AdminPanel from "./components/AdminPanel";
import { brandRail, getSeller, listings, listingsBySeller, sellers } from "./data/mockListings";
import { catalogueStats } from "./data/catalogue";
import { applyFilters, countActiveFilters, emptyFilters, sortListings, sortOptions } from "./data/search";
import { loadSession, saveSession, type Session } from "./data/auth";
import { getPackage } from "./data/packages";
import { BrandIcon } from "./components/BrandIcons";
import HeroCarousel, { HERO_SLOTS } from "./components/HeroCarousel";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AccountDeletion from "./pages/AccountDeletion";
import {
  isPopular,
  loadCounts,
  loadSaved,
  persistCounts,
  persistSaved,
  seedCounts,
  urgencyLabel,
  urgencyShort,
  type EngagementCounts,
} from "./data/engagement";
import type {
  AuthUser,
  Category,
  Listing,
  ListingDraft,
  PackageId,
  PackagePlan,
  SearchFilters,
  SortKey,
} from "./data/types";
import { FilterChip, IconButton, ListingCard, SectionHeader, Spec } from "./components/ui";
import SellFlow from "./components/sell/SellFlow";
import { createDraft, draftTitle, formatPrice } from "./components/sell/draft";
import suvImage from "./assets/motora-suv.png";

type View =
  | "home"
  | "results"
  | "detail"
  | "dealer"
  | "dealers"
  | "sell"
  | "seller"
  | "admin"
  | "packages"
  | "saved"
  | "privacy"
  | "terms"
  | "deletion";

/** Google Play requires these to be reachable at stable, linkable URLs. */
const LEGAL_ROUTES: Record<string, View> = {
  "privacy-policy": "privacy",
  terms: "terms",
  "account-deletion": "deletion",
};

/** Reads /store/:dealerId and the legal routes as shareable, deep-linkable URLs. */
function readRoute(): { view: View; sellerId?: string } {
  const path = window.location.pathname.replace(/\/+$/, "");
  const match = path.match(/\/store\/([a-z0-9-]+)$/i);
  if (match) return { view: "dealer", sellerId: match[1] };

  const legal = path.split("/").pop() ?? "";
  if (legal && LEGAL_ROUTES[legal]) return { view: LEGAL_ROUTES[legal] };

  const screen = new URLSearchParams(window.location.search).get("screen");
  if (screen === "sell" || screen === "results" || screen === "packages") return { view: screen as View };
  return { view: "home" };
}

function legalPath(slug: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${slug}`;
}

function storePath(sellerId: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/store/${sellerId}`;
}

const categories: { name: Category; Icon: typeof FaCarSide }[] = [
  { name: "Cars", Icon: FaCarSide },
  { name: "Bikes", Icon: FaMotorcycle },
  { name: "Scooters", Icon: MdElectricScooter },
  { name: "Commercial", Icon: FaTruck },
  { name: "Bicycles & Kids", Icon: FaBicycle },
];

export default function Prototype() {
  const initialRoute = useMemo(() => readRoute(), []);
  const [view, setView] = useState<View>(initialRoute.view);
  const [dark, setDark] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [filterOpen, setFilterOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authReason, setAuthReason] = useState<string>();
  const [pendingAction, setPendingAction] = useState<((user: AuthUser) => void) | null>(null);
  const [session, setSession] = useState<Session | null>(() => loadSession());
  const [toast, setToast] = useState("");
  const [sellStep, setSellStep] = useState(1);
  const [activeListing, setActiveListing] = useState<Listing>(listings[0]);
  const [activeSellerId, setActiveSellerId] = useState(initialRoute.sellerId ?? "amit-motors");
  const [draft, setDraft] = useState<ListingDraft>(() => createDraft());
  const [checkoutPlan, setCheckoutPlan] = useState<PackagePlan | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [shareTarget, setShareTarget] = useState<ShareTarget | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [valuationOpen, setValuationOpen] = useState(false);
  // Restored sessions keep their assigned tier rather than resetting to free.
  const [planId, setPlanId] = useState<PackageId>(() => session?.user.packageId ?? "free");
  const [savedIds, setSavedIds] = useState<string[]>(() => loadSaved());
  const [counts, setCounts] = useState<EngagementCounts>(() => seedCounts(listings, loadCounts()));
  const [feedSize, setFeedSize] = useState(6);

  const updateDraft = (patch: Partial<ListingDraft>) => setDraft((current) => ({ ...current, ...patch }));
  const updateFilters = (patch: Partial<SearchFilters>) => setFilters((current) => ({ ...current, ...patch }));
  const user = session?.user ?? null;

  const go = (next: View) => {
    setView(next);
    window.history.pushState({ motoraView: next }, "");
  };
  const back = () => setView("home");

  /** Pushes a real URL for the Play-mandated legal pages. */
  const goLegal = (slug: string, next: View) => {
    setView(next);
    window.history.pushState({ motoraView: next }, "", legalPath(slug));
  };

  useEffect(() => {
    const onPopState = () => {
      const route = readRoute();
      if (route.sellerId) setActiveSellerId(route.sellerId);
      setView(route.view);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const results = useMemo(() => sortListings(applyFilters(listings, filters), sort), [filters, sort]);
  const activeFilterCount = countActiveFilters(filters);
  const resultsLoading = useSimulatedLoad([filters, sort, view === "results"]);
  const homeLoading = useSimulatedLoad([view === "home"], 420);
  const stats = useMemo(() => catalogueStats(), []);

  const signIn = (nextUser: AuthUser, token: string) => {
    const next = { user: nextUser, token, issuedAt: Date.now() };
    setSession(next);
    saveSession(next);
    // Adopt the package tier assigned to the account (dealers/admin are pre-provisioned).
    setPlanId(nextUser.packageId);
    setToast(`Signed in as ${nextUser.name}`);
    // Resume whatever the gate interrupted.
    const resume = pendingAction;
    setPendingAction(null);
    if (resume) resume(nextUser);
  };

  const signOut = () => {
    setSession(null);
    saveSession(null);
    setToast("Signed out");
    setView("home");
  };

  /** Auth gate: selling requires a verified account so listings bind to a userId. */
  const requireAuth = (reason: string, next: (authed: AuthUser) => void) => {
    if (user) {
      next(user);
      return;
    }
    setAuthReason(reason);
    setPendingAction(() => next);
    setAuthOpen(true);
  };

  const openSell = () =>
    requireAuth("Sign in to create a listing. Your ads stay linked to your account.", (authed) => {
      updateDraft({ sellerType: authed.sellerType });
      go("sell");
    });

  const openCategory = (category: Category) => {
    updateFilters({ ...emptyFilters, category });
    go("results");
  };

  /** Opening a listing increments its view counters (session-persisted). */
  const openListing = (item: Listing) => {
    setActiveListing(item);
    setCounts((current) => {
      const entry = current[item.id] ?? { views: item.views ?? 0, saves: 0, viewedToday: 0 };
      const next = {
        ...current,
        [item.id]: { ...entry, views: entry.views + 1, viewedToday: entry.viewedToday + 1 },
      };
      persistCounts(next);
      return next;
    });
    go("detail");
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleSave = (item: Listing) => {
    const already = isSaved(item.id);
    const nextIds = already ? savedIds.filter((id) => id !== item.id) : [...savedIds, item.id];
    setSavedIds(nextIds);
    persistSaved(nextIds);

    setCounts((current) => {
      const entry = current[item.id] ?? { views: item.views ?? 0, saves: 0, viewedToday: 0 };
      const next = {
        ...current,
        [item.id]: { ...entry, saves: Math.max(0, entry.saves + (already ? -1 : 1)) },
      };
      persistCounts(next);
      return next;
    });

    setToast(already ? `${item.name} removed from Saved Ads` : `${item.name} saved to your Saved Ads`);
  };

  /**
   * Premium feed: verified/priority sellers first, then the rest. Cycled so the
   * rail keeps producing pages until the fixture pool is exhausted.
   */
  const premiumFeed = useMemo(() => {
    const priority = listings.filter((item) => item.verified);
    const rest = listings.filter((item) => !item.verified);
    const ordered = [...priority, ...rest];
    const pages: Listing[] = [];
    for (let cycle = 0; cycle < 3; cycle += 1) {
      for (const item of ordered) pages.push(cycle === 0 ? item : { ...item, id: `${item.id}__p${cycle}` });
    }
    return pages;
  }, []);

  /** Ten hero slots: the primary Home feature first, then other premium stock. */
  const heroSlides = useMemo(() => {
    const featured = listings.filter((item) => item.verified);
    const rest = listings.filter((item) => !item.verified);
    return [...featured, ...rest].slice(0, HERO_SLOTS);
  }, []);

  const savedListings = useMemo(
    () => savedIds.map((id) => listings.find((item) => item.id === id)).filter((item): item is Listing => Boolean(item)),
    [savedIds],
  );

  /** Dealer micro-site: pushes a real /store/:dealerId URL so the link is shareable. */
  const openStore = (sellerId: string) => {
    setActiveSellerId(sellerId);
    setView("dealer");
    window.history.pushState({ motoraView: "dealer", sellerId }, "", storePath(sellerId));
  };

  const share = (target: ShareTarget) => {
    setShareTarget(target);
    setShareOpen(true);
  };

  const shareListing = (item: Listing) =>
    share({
      title: item.name,
      text: `${item.name} · ${item.price} · ${item.year} on Motora`,
      url: `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}/?listing=${item.id}`,
    });

  const shareStore = (sellerId: string) => {
    const seller = getSeller(sellerId);
    share({
      title: `${seller.name} on Motora`,
      text: `${seller.name} — ${seller.tagline}`,
      url: `${window.location.origin}${storePath(sellerId)}`,
    });
  };

  const startCheckout = (plan: PackagePlan) => {
    if (plan.price === 0) {
      setPlanId(plan.id);
      setToast("Switched to the Free plan.");
      return;
    }
    requireAuth("Sign in to manage your Motora package.", () => {
      setCheckoutPlan(plan);
      setCheckoutOpen(true);
    });
  };

  const detailSeller = getSeller(activeListing.sellerId);
  const storeSeller = getSeller(activeSellerId);
  const storeStock = listingsBySeller(storeSeller.id);

  const currentPlan = getPackage(planId);
  const myStoreId = useMemo(() => {
    if (!user) return "amit-motors";
    const owned = listings.find((item) => item.userId === user.id);
    return owned?.sellerId ?? sellers[0].id;
  }, [user]);
  const myAds = useMemo(() => (user ? listings.filter((item) => item.userId === user.id) : []), [user]);
  const totalViews = useMemo(() => myAds.reduce((sum, item) => sum + (item.views ?? 0), 0), [myAds]);
  const totalLeads = useMemo(() => myAds.reduce((sum, item) => sum + (item.leads ?? 0), 0), [myAds]);
  const conversion = totalViews ? Math.round((totalLeads / totalViews) * 1000) / 10 : 0;

  return (
    <div className={dark ? "motora-app dark" : "motora-app"}>
      <AppScroll className="motora-scroll">
        {view === "home" && (
          <main className="motora-page home-page">
            <header className="topbar">
              <button className="wordmark" onClick={() => setView("home")}>
                Motora<span>.</span>
              </button>
              <div className="web-nav">
                <button onClick={() => go("results")}>Explore</button>
                <button onClick={() => openStore("amit-motors")}>Dealers</button>
                <button onClick={() => go("packages")}>Packages</button>
                <button onClick={openSell}>List a vehicle</button>
              </div>
              <button className="location">
                Imphal <ChevronDownIcon />
              </button>
              <button className="dealers-nav" onClick={() => go("dealers")}>
                <HomeIcon />
                <span>Dealers &amp; Showrooms</span>
              </button>
              <IconButton label="Switch theme" onClick={() => setDark(!dark)}>
                {dark ? <SunIcon /> : <MoonIcon />}
              </IconButton>
            </header>

            <HeroCarousel slides={heroSlides} onOpen={openListing} />

            <label className="search-field">
              <MagnifyingGlassIcon />
              <TextInput
                value={filters.keyword}
                onChange={(event) => updateFilters({ keyword: event.target.value })}
                onKeyDown={(event) => {
                  if (event.key === "Enter") go("results");
                }}
                placeholder="Search by brand, model or keyword"
              />
              <button type="button" onClick={() => setFilterOpen(true)} aria-label="Open filters">
                <MixerHorizontalIcon />
              </button>
            </label>

            <section className="category-row" aria-label="Vehicle categories">
              {categories.map(({ name, Icon }) => (
                <button type="button" className="category-tile" key={name} onClick={() => openCategory(name)}>
                  <span>
                    <Icon size={30} strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <small>{name === "Bicycles & Kids" ? "Bikes & Kids" : name}</small>
                </button>
              ))}
            </section>

            <button
              type="button"
              className="electric-filter"
              onClick={() => {
                updateFilters({ ...emptyFilters, fuelTypes: ["Electric"] });
                go("results");
              }}
            >
              <span>⚡</span>
              <b>Electric</b>
              <small>Cross-category filter</small>
              <span>›</span>
            </button>

            <SectionHeader title="Premium Ads" action="See all" onAction={() => go("results")} />
            <Rail
              ariaLabel="Premium vehicle listings"
              className="listing-rail"
              contentClassName="listing-rail-track"
              onEndReached={() => setFeedSize((size) => Math.min(size + 6, premiumFeed.length))}
            >
              {homeLoading
                ? [0, 1, 2].map((key) => <ListingCardSkeleton compact key={key} />)
                : premiumFeed.slice(0, feedSize).map((item) => (
                    <ListingCard
                      compact
                      item={item}
                      onOpen={() => openListing(item)}
                      key={item.id}
                      saved={isSaved(item.id)}
                      onToggleSave={() => toggleSave(item)}
                      popular={isPopular(counts, item.id)}
                    />
                  ))}
              {!homeLoading && feedSize < premiumFeed.length && <ListingCardSkeleton compact />}
            </Rail>

            <SectionHeader title="Browse by brand" action="See all" onAction={() => go("results")} />
            <Rail ariaLabel="Browse vehicles by brand" className="brand-rail" contentClassName="brand-rail-track">
              {brandRail.map((brand) => (
                <button
                  type="button"
                  className="brand-chip"
                  key={brand.label}
                  onClick={() => {
                    updateFilters({ ...emptyFilters, category: brand.category, make: brand.label });
                    go("results");
                  }}
                >
                  <BrandIcon name={brand.icon} size={32} />
                  <strong>{brand.label}</strong>
                </button>
              ))}
            </Rail>

            <section className="premium-callout">
              <p className="eyebrow">MOTORA CHECKED</p>
              <h2>Buy with more confidence.</h2>
              <p>Inspection-backed listings with clear records.</p>
              <button
                type="button"
                onClick={() => {
                  updateFilters({ ...emptyFilters, checkedOnly: true });
                  go("results");
                }}
              >
                Explore checked vehicles
              </button>
            </section>

            <section className="catalogue-strip" aria-label="Catalogue coverage">
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
            </section>

            <section className="stage-two-callout">
              <div>
                <p className="eyebrow">SELL ON MOTORA</p>
                <h2>Your collection deserves its own storefront.</h2>
                <p>Upload photos, a short walkaround video, and a voice note—then share one clean link.</p>
              </div>
              <button className="primary" onClick={openSell}>
                Start a listing
              </button>
            </section>

            <footer className="app-footer">
              <nav aria-label="Legal">
                <button type="button" onClick={() => goLegal("privacy-policy", "privacy")}>
                  Privacy Policy
                </button>
                <button type="button" onClick={() => goLegal("terms", "terms")}>
                  Terms of Service
                </button>
                <button type="button" onClick={() => goLegal("account-deletion", "deletion")}>
                  Delete account
                </button>
              </nav>
              <small>© {new Date().getFullYear()} Motora · Imphal, Manipur, India</small>
            </footer>
          </main>
        )}

        {view === "results" && (
          <main className="motora-page results-page">
            <header className="screen-topbar">
              <IconButton label="Back to home" onClick={back}>
                <ArrowLeftIcon />
              </IconButton>
              <div>
                <h1>Search results</h1>
                <p>{resultsLoading ? "Searching…" : `${results.length} of ${listings.length} vehicles`}</p>
              </div>
              <IconButton label="Saved Ads" onClick={() => go("saved")}>
                <HeartIcon />
              </IconButton>
            </header>

            <label className="search-field compact">
              <MagnifyingGlassIcon />
              <TextInput
                value={filters.keyword}
                onChange={(event) => updateFilters({ keyword: event.target.value })}
                placeholder="Refine this search"
              />
              {filters.keyword && (
                <button type="button" onClick={() => updateFilters({ keyword: "" })} aria-label="Clear search">
                  <Cross1Icon />
                </button>
              )}
            </label>

            <div className="filter-stack">
              <button
                type="button"
                className={activeFilterCount ? "filter-chip is-active" : "filter-chip"}
                onClick={() => setFilterOpen(true)}
              >
                <MixerHorizontalIcon />
                Filters{activeFilterCount ? ` · ${activeFilterCount}` : ""}
              </button>
              {filters.category !== "All" && (
                <FilterChip label={filters.category} onClear={() => updateFilters({ category: "All" })} />
              )}
              {filters.make && <FilterChip label={filters.make} onClear={() => updateFilters({ make: "", model: "" })} />}
              {filters.model && <FilterChip label={filters.model} onClear={() => updateFilters({ model: "" })} />}
              {filters.fuelTypes.map((fuel) => (
                <FilterChip
                  key={fuel}
                  label={fuel}
                  onClear={() => updateFilters({ fuelTypes: filters.fuelTypes.filter((item) => item !== fuel) })}
                />
              ))}
              {filters.checkedOnly && (
                <FilterChip label="Motora Checked" onClear={() => updateFilters({ checkedOnly: false })} />
              )}
              {activeFilterCount > 0 && (
                <button type="button" className="clear-all" onClick={() => setFilters(emptyFilters)}>
                  Clear all
                </button>
              )}
            </div>

            <div className="sort-row">
              <label>
                Sort by:
                <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={() => setFilterOpen(true)} aria-label="Open filters">
                <MixerHorizontalIcon />
              </button>
            </div>

            <section className="results-list">
              {resultsLoading ? (
                [0, 1, 2, 3].map((key) => <ResultRowSkeleton key={key} />)
              ) : results.length ? (
                results.map((item) => (
                  <article className="result-row" key={item.id}>
                    <button type="button" className="result-image" onClick={() => openListing(item)}>
                      <img src={item.image} alt="" />
                    </button>
                    <div>
                      <button type="button" className="result-title" onClick={() => openListing(item)}>
                        {item.name}
                      </button>
                      <p>
                        {item.year} · {item.fuel}
                      </p>
                      <p>
                        {item.km} · {item.location}
                      </p>
                      <strong>{item.price}</strong>
                      {item.verified && <span className="verified-mini">✓ Motora Checked</span>}
                      {isPopular(counts, item.id) && <span className="urgency-badge">{urgencyShort(counts, item.id)}</span>}
                    </div>
                    <button
                      type="button"
                      className={isSaved(item.id) ? "icon-button is-saved" : "icon-button"}
                      onClick={() => toggleSave(item)}
                      aria-pressed={isSaved(item.id)}
                      aria-label={isSaved(item.id) ? `Remove ${item.name} from Saved Ads` : `Save ${item.name}`}
                    >
                      {isSaved(item.id) ? <HeartFilledIcon /> : <HeartIcon />}
                    </button>
                  </article>
                ))
              ) : (
                <EmptyState
                  icon={<MagnifyingGlassIcon />}
                  title="No vehicles match those filters"
                  message="Try widening the price range, clearing a brand, or removing the Motora Checked filter."
                  actionLabel="Clear all filters"
                  onAction={() => setFilters(emptyFilters)}
                />
              )}
            </section>
          </main>
        )}

        {view === "detail" && (
          <main className="motora-page detail-page">
            <header className="screen-topbar overlay">
              <IconButton label="Back to results" onClick={() => setView("results")}>
                <ArrowLeftIcon />
              </IconButton>
              <div />
              <div className="header-actions">
                <button
                  type="button"
                  className={isSaved(activeListing.id) ? "icon-button is-saved" : "icon-button"}
                  onClick={() => toggleSave(activeListing)}
                  aria-pressed={isSaved(activeListing.id)}
                  aria-label={isSaved(activeListing.id) ? "Remove from Saved Ads" : "Save to Saved Ads"}
                >
                  {isSaved(activeListing.id) ? <HeartFilledIcon /> : <HeartIcon />}
                </button>
                <IconButton label="Share vehicle" onClick={() => shareListing(activeListing)}>
                  <Share1Icon />
                </IconButton>
              </div>
            </header>

            <section className="detail-hero">
              <img src={activeListing.image} alt={activeListing.name} />
              <span className="gallery-count">▣ 1 / 5</span>
              <button className="video-button" onClick={() => setToast("Video playback connects with real uploads.")}>
                <PlayIcon /> Play video
              </button>
            </section>

            <div className="media-strip">
              <img src={activeListing.image} alt="" />
              <img src={activeListing.image} alt="" />
              <img src={activeListing.image} alt="" />
              <button onClick={() => setToast("Gallery opened")}>+2</button>
            </div>

            <div className="detail-body">
              {activeListing.verified && <span className="verified-badge">✓ Motora Checked</span>}
              <h1>{activeListing.name}</h1>
              <p className="price">
                {activeListing.price} <span>ⓘ</span>
              </p>
              <p className="subtle">Ex-showroom price · Finance options available</p>

              {isPopular(counts, activeListing.id) && (
                <p className="urgency-banner" role="status">
                  {urgencyLabel(counts, activeListing.id)}
                </p>
              )}

              <div className="engagement-row">
                <span>
                  <b>{(counts[activeListing.id]?.views ?? 0).toLocaleString("en-IN")}</b>
                  <small>Views</small>
                </span>
                <span>
                  <b>{counts[activeListing.id]?.saves ?? 0}</b>
                  <small>Saves</small>
                </span>
                <span>
                  <b>{counts[activeListing.id]?.viewedToday ?? 0}</b>
                  <small>Viewed today</small>
                </span>
              </div>

              <div className="spec-grid">
                <Spec label="Year" value={activeListing.year} />
                <Spec label="Driven" value={activeListing.km} />
                <Spec label="Fuel" value={activeListing.fuelType} />
                <Spec label="Transmission" value={activeListing.transmission ?? "—"} />
                <Spec label="Owner" value={activeListing.ownership} />
                <Spec
                  label="Engine"
                  value={
                    activeListing.displacement === 0
                      ? "Electric"
                      : activeListing.displacement
                        ? `${activeListing.displacement} cc`
                        : "—"
                  }
                />
              </div>

              {activeListing.verified && (
                <section className="inspection-card">
                  <div>
                    <span>✓</span>
                    <div>
                      <b>Motora Checked</b>
                      <p>160-point inspection done</p>
                    </div>
                  </div>
                  <strong>Passed</strong>
                </section>
              )}

              <button type="button" className="seller-card" onClick={() => openStore(detailSeller.id)}>
                <div className="seller-avatar">{detailSeller.initials}</div>
                <div>
                  <b>{detailSeller.name}</b>
                  <p>
                    {detailSeller.location} · {detailSeller.stats.rating} ★ · {detailSeller.stats.reviews} reviews
                  </p>
                </div>
              </button>

              <div className="contact-info">
                <span>☎ {activeListing.hidePhone ? "Hidden by seller" : detailSeller.phone}</span>
                <span>✉ {detailSeller.email}</span>
              </div>

              <div className="contact-actions">
                <button onClick={() => setToast("Call request ready")}>Call</button>
                <button onClick={() => setToast("WhatsApp request ready")}>WhatsApp</button>
                <button className="primary" onClick={() => setToast("Secure chat opens with messaging.")}>
                  Chat
                </button>
              </div>

              <button className="dealer-link" onClick={() => openStore(detailSeller.id)}>
                View {detailSeller.name} storefront →
              </button>

              <EmiCalculator listing={activeListing} />
              <OnRoadPrice listing={activeListing} />

              <section className="valuation-cta">
                <div>
                  <p className="eyebrow">ASK MOTORA AI</p>
                  <h2>What is my vehicle worth?</h2>
                  <p>Get an instant, indicative resale range before you list.</p>
                </div>
                <button type="button" className="primary" onClick={() => setValuationOpen(true)}>
                  Instant valuation
                </button>
              </section>
            </div>
          </main>
        )}

        {view === "dealer" && (
          <main className="motora-page dealer-page">
            <header className="screen-topbar">
              <IconButton label="Back to home" onClick={back}>
                <ArrowLeftIcon />
              </IconButton>
              <h1>{storeSeller.type} store</h1>
              <IconButton label="Share store" onClick={() => shareStore(storeSeller.id)}>
                <Share1Icon />
              </IconButton>
            </header>

            <section className="dealer-cover">
              <img src={storeSeller.coverImage} alt={`${storeSeller.name} stock`} />
            </section>

            <section className="dealer-profile">
              <div className="dealer-avatar">{storeSeller.initials}</div>
              <h2>
                {storeSeller.name} {storeSeller.verified && <span>✓</span>}
              </h2>
              <p>
                {storeSeller.verified ? "Verified" : "Unverified"} {storeSeller.type.toLowerCase()} · {storeSeller.location}
              </p>
              <div className="dealer-stats">
                <span>
                  <b>{storeSeller.stats.rating} ★</b>
                  <small>{storeSeller.stats.reviews} reviews</small>
                </span>
                <span>
                  <b>{storeSeller.stats.listings}</b>
                  <small>Listings</small>
                </span>
                <span>
                  <b>{storeSeller.stats.responseRate}%</b>
                  <small>Response rate</small>
                </span>
              </div>
              <button className="share-store" onClick={() => shareStore(storeSeller.id)}>
                Share storefront
              </button>
            </section>

            <SectionHeader title="Live stock" action="See all" onAction={() => go("results")} />
            {storeStock.length ? (
              <div className="store-grid">
                {storeStock.map((item) => (
                  <ListingCard item={item} onOpen={() => openListing(item)} key={item.id} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<FaCarSide />}
                title="No live stock yet"
                message="This seller has not published any vehicles."
              />
            )}
          </main>
        )}

        {view === "dealers" && (
          <main className="motora-page dealers-page">
            <header className="screen-topbar">
              <IconButton label="Back to home" onClick={back}>
                <ArrowLeftIcon />
              </IconButton>
              <div>
                <h1>Dealers &amp; Showrooms</h1>
                <p>{sellers.length} verified stores near you</p>
              </div>
              <div />
            </header>

            <section className="dealer-list">
              {sellers.map((seller) => {
                const stock = listingsBySeller(seller.id);
                return (
                  <article className="dealer-card" key={seller.id}>
                    <button type="button" className="dealer-card-main" onClick={() => openStore(seller.id)}>
                      <span className="dealer-avatar">{seller.initials}</span>
                      <span className="dealer-card-body">
                        <b>
                          {seller.name} {seller.verified && <i className="verified-dot">✓</i>}
                        </b>
                        <small>
                          {seller.type} · {seller.location}
                        </small>
                        <small className="dealer-card-stats">
                          {seller.stats.rating} ★ · {stock.length} in stock · {seller.stats.responseRate}% response
                        </small>
                      </span>
                    </button>
                    <div className="dealer-card-actions">
                      <button type="button" onClick={() => openStore(seller.id)}>
                        Visit store
                      </button>
                      <button type="button" onClick={() => shareStore(seller.id)} aria-label={`Share ${seller.name}`}>
                        <Share1Icon />
                      </button>
                    </div>
                  </article>
                );
              })}
            </section>
          </main>
        )}

        {view === "saved" && (
          <main className="motora-page saved-page">
            <header className="screen-topbar">
              <IconButton label="Back" onClick={back}>
                <ArrowLeftIcon />
              </IconButton>
              <div>
                <h1>Saved Ads</h1>
                <p>{savedListings.length} saved</p>
              </div>
              <div />
            </header>

            {savedListings.length ? (
              <section className="results-list">
                {savedListings.map((item) => (
                  <article className="result-row" key={item.id}>
                    <button type="button" className="result-image" onClick={() => openListing(item)}>
                      <img src={item.image} alt="" />
                    </button>
                    <div>
                      <button type="button" className="result-title" onClick={() => openListing(item)}>
                        {item.name}
                      </button>
                      <p>
                        {item.year} · {item.fuel}
                      </p>
                      <p>
                        {item.km} · {item.location}
                      </p>
                      <strong>{item.price}</strong>
                      <small className="saved-stats">
                        {(counts[item.id]?.views ?? 0).toLocaleString("en-IN")} views · {counts[item.id]?.saves ?? 0} saves
                      </small>
                    </div>
                    <button
                      type="button"
                      className="icon-button is-saved"
                      onClick={() => toggleSave(item)}
                      aria-label={`Remove ${item.name} from Saved Ads`}
                    >
                      <HeartFilledIcon />
                    </button>
                  </article>
                ))}
              </section>
            ) : (
              <EmptyState
                icon={<HeartIcon />}
                title="No saved ads yet"
                message="Tap the heart on any listing to keep it here for later."
                actionLabel="Browse vehicles"
                onAction={() => go("results")}
              />
            )}
          </main>
        )}

        {view === "sell" && (
          <SellFlow
            draft={draft}
            onDraftChange={updateDraft}
            step={sellStep}
            onStepChange={setSellStep}
            onExit={back}
            onOpenProfile={() => go("seller")}
            onPublish={() => {
              setToast("Listing submitted for review.");
              go("seller");
            }}
            onToast={setToast}
          />
        )}

        {view === "seller" && (
          <main className="motora-page seller-page">
            <header className="screen-topbar">
              <IconButton label="Back to home" onClick={back}>
                <ArrowLeftIcon />
              </IconButton>
              <div>
                <h1>Your Motora space</h1>
                <p>Dashboard, ads & analytics</p>
              </div>
              <IconButton label="Sign out" onClick={signOut}>
                <ExitIcon />
              </IconButton>
            </header>

            <section className="seller-welcome">
              <div className="seller-avatar">{user?.initials ?? "MO"}</div>
              <div>
                <p className="eyebrow">{(user?.sellerType ?? draft.sellerType).toUpperCase()}</p>
                <h2>{user?.name ?? "Motora seller"}</h2>
                <p>{user?.phone ?? "Sign in to publish"}</p>
              </div>
              <button onClick={() => shareStore(myStoreId)}>Share</button>
            </section>

            <section className="plan-banner">
              <div>
                <p className="eyebrow">CURRENT PACKAGE</p>
                <h2>{currentPlan.name}</h2>
                <p>
                  {myAds.length} of {currentPlan.adLimit === 999 ? "unlimited" : currentPlan.adLimit} ads used ·{" "}
                  {currentPlan.photoLimit} photos per ad
                </p>
              </div>
              <button type="button" className="primary" onClick={() => go("packages")}>
                {currentPlan.id === "free" ? "Upgrade" : "Manage plan"}
              </button>
            </section>

            <div className="analytics-grid" aria-label="Lead analytics">
              <span>
                <b>{totalViews.toLocaleString("en-IN")}</b>
                <small>Total views</small>
              </span>
              <span>
                <b>{totalLeads}</b>
                <small>Leads</small>
              </span>
              <span>
                <b>{conversion}%</b>
                <small>View to lead</small>
              </span>
              <span>
                <b>{myAds.length}</b>
                <small>Live ads</small>
              </span>
            </div>

            <div className="seller-actions">
              <button onClick={openSell}>
                <PlusIcon />
                Create listing
              </button>
              <button onClick={() => setToast(`${totalLeads} enquiries waiting. Inbox connects with messaging.`)}>
                <EnvelopeClosedIcon />
                Enquiries
              </button>
            </div>

            <button type="button" className="saved-entry" onClick={() => go("saved")}>
              <span>
                <HeartFilledIcon />
                Saved Ads
              </span>
              <b>{savedListings.length}</b>
            </button>

            <SectionHeader title="My ads" action="View storefront" onAction={() => openStore(myStoreId)} />
            {myAds.length ? (
              <section className="my-ads">
                {myAds.map((item) => (
                  <article className="my-ad-row" key={item.id}>
                    <button type="button" className="my-ad-image" onClick={() => openListing(item)}>
                      <img src={item.image} alt="" />
                    </button>
                    <div>
                      <b>{item.name}</b>
                      <p>
                        {item.price} · {item.year}
                      </p>
                      <small>
                        {(item.views ?? 0).toLocaleString("en-IN")} views · {item.leads ?? 0} leads
                      </small>
                    </div>
                    <div className="my-ad-actions">
                      <button type="button" onClick={() => shareListing(item)} aria-label={`Share ${item.name}`}>
                        <Share1Icon />
                      </button>
                      <button type="button" onClick={() => setToast(`${item.name} paused.`)}>
                        Pause
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            ) : (
              <EmptyState
                icon={<PlusIcon />}
                title="No live ads yet"
                message="Publish your first vehicle to start receiving enquiries."
                actionLabel="Create a listing"
                onAction={openSell}
              />
            )}

            <SectionHeader title="Draft" action="Continue" onAction={openSell} />
            <article className="draft-row">
              <img src={draft.media.find((item) => item.previewUrl)?.previewUrl ?? suvImage} alt="Draft vehicle" />
              <div>
                <b>{draftTitle(draft)}</b>
                <p>
                  {draft.category ?? "Category pending"} · {draft.price ? formatPrice(draft.price) : "Draft"}
                </p>
                <small>
                  {draft.media.length} media · Step {sellStep} of 6
                </small>
              </div>
              <button onClick={openSell}>Finish</button>
            </article>

            <section className="valuation-cta">
              <div>
                <p className="eyebrow">ASK MOTORA AI</p>
                <h2>Price it right the first time.</h2>
                <p>Estimate resale value before you publish.</p>
              </div>
              <button type="button" className="primary" onClick={() => setValuationOpen(true)}>
                Instant valuation
              </button>
            </section>

            {user?.isAdmin && (
              <button type="button" className="admin-entry" onClick={() => go("admin")}>
                Open owner super-admin →
              </button>
            )}
          </main>
        )}

        {view === "packages" && (
          <main className="motora-page packages-page">
            <header className="screen-topbar">
              <IconButton label="Back" onClick={() => go("seller")}>
                <ArrowLeftIcon />
              </IconButton>
              <div>
                <h1>Packages</h1>
                <p>Listing limits & placement</p>
              </div>
              <div />
            </header>
            <p className="form-copy packages-intro">
              Launch pricing. All prices exclude 18% GST, which is shown at checkout. Cancel or change anytime.
            </p>
            <Packages
              currentId={planId}
              onChoose={startCheckout}
              onContactSales={() => setToast("Our dealer team will reach out within one business day.")}
            />
          </main>
        )}

        {view === "admin" && (
          <main className="motora-page admin-page">
            <header className="screen-topbar">
              <IconButton label="Back to profile" onClick={() => go("seller")}>
                <ArrowLeftIcon />
              </IconButton>
              <div>
                <h1>Owner super-admin</h1>
                <p>Catalogue, dealers & moderation</p>
              </div>
              <IconButton label="Switch theme" onClick={() => setDark(!dark)}>
                {dark ? <SunIcon /> : <MoonIcon />}
              </IconButton>
            </header>
            <AdminPanel onToast={setToast} />
          </main>
        )}
        {view === "privacy" && <PrivacyPolicy onBack={back} />}
        {view === "terms" && <TermsOfService onBack={back} />}
        {view === "deletion" && <AccountDeletion onBack={back} />}
      </AppScroll>

      <nav className="motora-bottom-nav" aria-label="Main navigation">
        <button className={view === "home" ? "active" : ""} onClick={() => setView("home")}>
          <HomeIcon />
          <span>Home</span>
        </button>
        <button className={view === "results" ? "active" : ""} onClick={() => go("results")}>
          <MagnifyingGlassIcon />
          <span>Explore</span>
        </button>
        <button className={view === "sell" ? "active" : ""} onClick={openSell}>
          <PlusIcon />
          <span>Sell</span>
        </button>
        <button className={view === "saved" ? "active" : ""} onClick={() => go("saved")}>
          {savedIds.length ? <HeartFilledIcon /> : <HeartIcon />}
          <span>Saved{savedIds.length ? ` (${savedIds.length})` : ""}</span>
        </button>
        <button
          className={view === "seller" ? "active" : ""}
          onClick={() => requireAuth("Sign in to view your profile and listings.", () => go("seller"))}
        >
          <PersonIcon />
          <span>Profile</span>
        </button>
      </nav>

      {toast && (
        <div className="motora-toast" role="status">
          {toast}
          <button onClick={() => setToast("")} aria-label="Dismiss">
            <Cross1Icon />
          </button>
        </div>
      )}

      <SearchDrawer
        open={filterOpen}
        onOpenChange={setFilterOpen}
        filters={filters}
        onChange={updateFilters}
        onReset={() => setFilters(emptyFilters)}
        resultCount={results.length}
      />

      <AuthSheet open={authOpen} onOpenChange={setAuthOpen} onAuthenticated={signIn} reason={authReason} />

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        plan={checkoutPlan}
        onSuccess={(plan) => {
          setPlanId(plan.id);
          setToast(`${plan.name} plan activated.`);
          // Return to the dashboard so the new limits are visible immediately.
          go("seller");
        }}
      />

      <ShareSheet open={shareOpen} onOpenChange={setShareOpen} target={shareTarget} onToast={setToast} />

      <ValuationModal
        open={valuationOpen}
        onOpenChange={setValuationOpen}
        initialCategory={draft.category ?? activeListing.kind}
      />
    </div>
  );
}
