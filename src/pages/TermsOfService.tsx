import LegalPage from "./LegalPage";

export const TERMS_EFFECTIVE = "8 August 2026";

export default function TermsOfService({ onBack }: { onBack: () => void }) {
  return (
    <LegalPage title="Terms of Service" subtitle={`Effective ${TERMS_EFFECTIVE}`} onBack={onBack}>
      <p>
        These Terms govern your use of the Motora app and motora.in. By creating an account or using Motora you agree to
        them. If you do not agree, do not use the service.
      </p>

      <h2>1. What Motora is</h2>
      <p>
        Motora is a <b>listing platform</b>. We connect buyers with private sellers, dealers and collectors. Motora is
        not a party to any sale, is not an agent, broker, dealer, financier or insurer, and does not take custody of any
        vehicle or payment between a buyer and a seller. Every transaction is solely between the buyer and the seller.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and legally able to enter contracts in India. Dealers must hold any trade
        registrations their state requires. During closed testing, access is restricted to accounts issued by Motora.
      </p>

      <h2>3. Accounts</h2>
      <ul>
        <li>Keep your credentials confidential; you are responsible for activity under your account.</li>
        <li>Provide accurate contact details so buyers can reach you.</li>
        <li>One person or business per account. Do not share, sell or transfer accounts.</li>
        <li>We may suspend or terminate accounts that breach these Terms.</li>
      </ul>

      <h2>4. Listing guidelines</h2>
      <p>Every listing must satisfy all of the following:</p>
      <ul>
        <li>
          <b>Ownership:</b> you own the vehicle or are authorised to sell it. Listing stolen, financed-without-consent,
          or otherwise encumbered vehicles is prohibited.
        </li>
        <li>
          <b>Accuracy:</b> make, model, variant, year, odometer, ownership count, registration and price must be
          truthful. Odometer tampering and mileage misstatement are prohibited.
        </li>
        <li>
          <b>Disclosure:</b> you must disclose accident history, flood or fire damage, major engine or structural
          repair, salvage or rebuilt status, and any outstanding loan, lien or challan.
        </li>
        <li>
          <b>Media rights:</b> upload only photos and video you captured or are licensed to use. Do not reuse images
          from other marketplaces or manufacturers without permission. AI-generated imagery must be labelled and must
          never depict an invented exact vehicle.
        </li>
        <li>
          <b>One vehicle per listing;</b> no duplicate listings for the same vehicle.
        </li>
        <li>
          <b>Prohibited:</b> unrelated goods or services, adult content, weapons, counterfeit parts, fake documents,
          spam, malware links, and discriminatory or harassing content.
        </li>
      </ul>
      <p>
        We may edit, unpublish or remove any listing that breaches these rules, and may report unlawful activity to the
        authorities.
      </p>

      <h2>5. Motora Checked — verification disclaimer</h2>
      <p>
        <b>Motora Checked</b> is an optional, paid, mechanic-led inspection. Read this carefully:
      </p>
      <ul>
        <li>An inspection reflects the vehicle's observable condition on the inspection date only.</li>
        <li>
          It is <b>not</b> a warranty, guarantee, insurance policy, roadworthiness certificate, or title guarantee.
        </li>
        <li>Inspections are visual and diagnostic. They may not detect latent, intermittent or concealed defects.</li>
        <li>A badge does not verify legal title, loan status or the seller's identity beyond stated checks.</li>
        <li>Badges expire and may be revoked if a report is found to be inaccurate.</li>
      </ul>
      <p>
        <b>Always inspect a vehicle in person, verify RC, insurance and challan records independently, and consider an
        independent mechanic before paying.</b> Verified and dealer badges indicate document checks we performed; they
        are not an endorsement or a guarantee of any transaction.
      </p>

      <h2>6. Buyer responsibilities</h2>
      <ul>
        <li>Independently verify the vehicle, its documents and the seller before paying.</li>
        <li>
          Never pay a deposit or full amount to anyone who refuses an in-person meeting, pressures you to transact
          urgently, or asks for payment through unverified channels.
        </li>
        <li>Motora will never ask you to transfer money to a Motora employee's personal account.</li>
      </ul>

      <h2>7. Packages, payments and refunds</h2>
      <ul>
        <li>Free, Standard, Comprehensive and Dealer packages differ in ad allowance, photo limits and placement.</li>
        <li>Prices are shown exclusive of GST; 18% GST is added and displayed at checkout.</li>
        <li>Payments are processed by a licensed Indian gateway. Motora does not store card or UPI credentials.</li>
        <li>
          Paid placements are digital services delivered on activation and are non-refundable once a listing is live,
          except where required by law or where we fail to deliver the purchased placement.
        </li>
        <li>We may change pricing prospectively with notice; active purchased periods are honoured.</li>
      </ul>

      <h2>8. Content licence</h2>
      <p>
        You retain ownership of your content. You grant Motora a non-exclusive, worldwide, royalty-free licence to host,
        store, resize, and display your listing content for the purpose of operating and promoting the marketplace. This
        licence ends when you delete the content, except for copies retained in backups or required by law.
      </p>

      <h2>9. Prohibited conduct</h2>
      <ul>
        <li>Scraping, bulk-harvesting contact details, or automated access without written permission.</li>
        <li>Circumventing fees, ad limits, or verification.</li>
        <li>Impersonation, misrepresenting dealer status, or fake reviews.</li>
        <li>Interfering with the service, its security, or other users.</li>
      </ul>

      <h2>10. Disclaimers</h2>
      <p>
        The service is provided "as is" and "as available". To the maximum extent permitted by law, Motora disclaims all
        implied warranties, including merchantability, fitness for a particular purpose, and non-infringement. We do not
        warrant that listings are accurate, that sellers or buyers are trustworthy, or that the service will be
        uninterrupted or error-free.
      </p>

      <h2>11. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Motora is not liable for indirect, incidental, special, consequential or
        punitive damages, or for loss of profits, data or goodwill. Our total aggregate liability for any claim is
        limited to the greater of the amount you paid Motora in the twelve months before the claim, or ₹1,000. Nothing
        limits liability that cannot be limited under Indian law.
      </p>

      <h2>12. Indemnity</h2>
      <p>
        You agree to indemnify Motora against claims arising from your listings, your content, your transactions, or
        your breach of these Terms.
      </p>

      <h2>13. Termination</h2>
      <p>
        You may stop using Motora and delete your account at any time. We may suspend or terminate access for breach,
        suspected fraud, or legal requirement. Sections that by their nature survive termination will survive.
      </p>

      <h2>14. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Courts at Imphal, Manipur have exclusive jurisdiction, subject to
        any non-waivable consumer rights available to you where you reside.
      </p>

      <h2>15. Contact</h2>
      <p>
        Motora Support — <a href="mailto:support@motora.in">support@motora.in</a>
        <br />
        Grievance Officer — <a href="mailto:grievance@motora.in">grievance@motora.in</a>
      </p>
    </LegalPage>
  );
}
