import LegalPage from "./LegalPage";

export const PRIVACY_EFFECTIVE = "8 August 2026";

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <LegalPage title="Privacy Policy" subtitle={`Effective ${PRIVACY_EFFECTIVE}`} onBack={onBack}>
      <p>
        Motora ("Motora", "we", "us") operates an Indian marketplace for cars, motorcycles, scooters, commercial
        vehicles, bicycles and e-bikes. This policy explains what we collect, why we collect it, who we share it with,
        and the controls available to you. It applies to the Motora Android app and to motora.in.
      </p>

      <h2>1. Data we collect</h2>
      <h3>1.1 Information you provide</h3>
      <ul>
        <li>
          <b>Account data:</b> name, email address, mobile number, and seller type (private seller, dealer or
          collector). During closed testing, accounts are pre-issued and no public sign-up occurs.
        </li>
        <li>
          <b>Listing data:</b> vehicle category, make, model, variant, year, odometer reading, fuel and transmission,
          registration number, insurance validity, ownership history, accident and condition disclosures, asking price
          and location.
        </li>
        <li>
          <b>Media:</b> photographs, short walkaround videos and optional voice notes you upload to a listing.
        </li>
        <li>
          <b>Communications:</b> enquiries, in-app messages and support requests.
        </li>
      </ul>

      <h3>1.2 Information collected automatically</h3>
      <ul>
        <li>
          <b>Usage and analytics:</b> screens viewed, searches and filters applied, listing view counts and save counts,
          and aggregate engagement used to show sellers how their ads perform.
        </li>
        <li>
          <b>Device and log data:</b> device model, operating system version, app version, language, coarse IP-derived
          region, and crash diagnostics.
        </li>
        <li>
          <b>Local storage:</b> your session token, saved ads and display preferences are stored on your device.
        </li>
      </ul>

      <h3>1.3 Location</h3>
      <p>
        Motora uses location to show vehicles near you and to set the city on a listing. We use a city or PIN-code level
        location that you type or select. If you grant the optional device location permission, we use it once to
        pre-fill your city; we do not track your location in the background and we do not build a location history.
        You can deny or revoke this permission in Android Settings and continue to use the app by entering a city
        manually.
      </p>

      <h3>1.4 Camera, microphone and photo library</h3>
      <p>
        Camera, microphone and media access are requested only when you actively add photos, a video or a voice note to
        a listing. Media is used to display your advertisement and is not scanned for advertising purposes. Denying
        these permissions only prevents media upload.
      </p>

      <h2>2. How we use data</h2>
      <ul>
        <li>To publish, rank and display your listings and storefront.</li>
        <li>To operate search, filtering and category browsing.</li>
        <li>To connect buyers and sellers via call, WhatsApp or in-app messaging, subject to your contact settings.</li>
        <li>To provide seller analytics such as view and save counts.</li>
        <li>To run the Motora Checked inspection programme and verification badges.</li>
        <li>To process package purchases and issue receipts.</li>
        <li>To detect fraud, moderate content, and enforce our Terms of Service.</li>
        <li>To fix crashes and improve performance.</li>
      </ul>

      <h2>3. Legal bases and consent</h2>
      <p>
        We process personal data to perform our contract with you, to meet legal obligations, for legitimate interests
        such as fraud prevention and service improvement, and with your consent where consent is required — for example
        optional device location and marketing messages. You may withdraw consent at any time.
      </p>

      <h2>4. Sharing</h2>
      <p>We do not sell your personal data. We share it only as follows:</p>
      <ul>
        <li>
          <b>Publicly, by your choice:</b> listing content, media, city and the contact channels you enable. If you turn
          on "Hide my phone number", your number is withheld and buyers reach you through in-app messages.
        </li>
        <li>
          <b>Service providers:</b> hosting and content delivery, database and object storage, crash reporting and
          analytics, and payment processing. Payment card and UPI credentials are handled by the payment gateway and are
          never stored by Motora.
        </li>
        <li>
          <b>Legal:</b> where required by Indian law, valid legal process, or to protect the rights and safety of users.
        </li>
        <li>
          <b>Corporate transactions:</b> in a merger or acquisition, subject to this policy.
        </li>
      </ul>

      <h2>5. Retention</h2>
      <ul>
        <li>Active account and listing data: retained while your account is active.</li>
        <li>Deleted listings: removed from search immediately and purged within 30 days.</li>
        <li>Account deletion: personal data erased within 30 days of a verified request.</li>
        <li>Transaction and tax records: retained up to 8 years where Indian law requires it.</li>
        <li>Fraud and abuse records: retained as long as necessary to prevent recurrence.</li>
      </ul>

      <h2>6. Your rights and controls</h2>
      <ul>
        <li>Access, correct or export your data.</li>
        <li>Delete your account and associated data from the in-app Account Deletion page.</li>
        <li>Control whether your phone number is public.</li>
        <li>Revoke camera, microphone, media and location permissions in Android Settings.</li>
        <li>Opt out of non-essential notifications.</li>
      </ul>

      <h2>7. Security</h2>
      <p>
        Data is transmitted over TLS. Access to production systems is restricted and audited. No system is perfectly
        secure, so please use a unique credential and report anything suspicious to us.
      </p>

      <h2>8. Children</h2>
      <p>
        Motora is intended for users aged 18 and over and is not directed to children. We do not knowingly collect data
        from children. If you believe a child has provided data, contact us and we will delete it.
      </p>

      <h2>9. International transfers</h2>
      <p>
        Motora is operated from India. Where a service provider processes data outside India, we require safeguards
        consistent with applicable Indian data protection law.
      </p>

      <h2>10. Changes</h2>
      <p>
        We will post any material change here and update the effective date. Continued use after a change means you
        accept the revised policy.
      </p>

      <h2>11. Contact</h2>
      <p>
        Grievance Officer, Motora
        <br />
        Email: <a href="mailto:privacy@motora.in">privacy@motora.in</a>
        <br />
        Imphal, Manipur, India
        <br />
        We acknowledge requests within 48 hours and resolve them within 30 days.
      </p>
    </LegalPage>
  );
}
