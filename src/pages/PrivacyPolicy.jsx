import React from 'react';
import '../styles/PrivacyPolicy.scss';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>PRAID AI Privacy Policy</h1>
      <p className="effective-date">Effective Date: Oct 1st 2024</p>

      <p>
        This Privacy Policy describes how PRAID AI ("Company," "we," "our," or "us") collects, uses, discloses, stores, and protects personal data and other information about users of its websites, mobile applications, digital tools, AI models, and related services (collectively, the "Services").
      </p>

      <p>
        PRAID AI is committed to safeguarding personal and health-related data in compliance with global privacy laws, including but not limited to:
      </p>
      <ul>
        <li>General Data Protection Regulation (GDPR) – European Union and United Kingdom</li>
        <li>Health Insurance Portability and Accountability Act (HIPAA) – United States</li>
        <li>Personal Data Protection Bill (PDPB) – Pakistan</li>
        <li>Federal Decree-Law No. 45 of 2021 – United Arab Emirates</li>
        <li>Personal Data Protection Law (PDPL) – Kingdom of Saudi Arabia</li>
        <li>MENA Region Data Frameworks – Applicable national and sector-specific regulations</li>
      </ul>

      <section className="policy-section">
        <h2>1. Scope of This Policy</h2>
        <p>
          This Privacy Policy applies to all users, visitors, patients, healthcare providers, institutions, and any other parties who access or interact with PRAID AI Services globally. By accessing or using the Services, you agree to the terms of this Privacy Policy.
        </p>
      </section>

      <section className="policy-section">
        <h2>2. Information We Collect</h2>
        <p>
          We may collect and process the following categories of personal and health-related data:
        </p>
        <ul>
          <li><strong>Identifying Information:</strong> Name, address, email address, phone number, gender, date of birth, and government-issued identifiers.</li>
          <li><strong>Health Data:</strong> Medical images, pathology/radiology reports, diagnostic test results, clinical notes, patient history, and other Protected Health Information (PHI).</li>
          <li><strong>Device and Technical Information:</strong> IP address, device type, browser type, operating system, language preferences, and usage logs.</li>
          <li><strong>Location Data:</strong> GPS-based or IP-based geographic location data, with your consent.</li>
          <li><strong>Biometric Data:</strong> If applicable, we may process biometric identifiers from medical scans or imaging data.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> PRAID AI uses cookies, web beacons, pixels, and similar technologies to understand usage trends and personalize content.</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>3. Legal Basis for Processing</h2>
        <p>
          We process your personal data based on the following legal grounds, as applicable to your jurisdiction:
        </p>
        <ul>
          <li>Your explicit consent (e.g., Article 6(1)(a) GDPR, UAE Article 5)</li>
          <li>Contractual necessity</li>
          <li>Legal obligations</li>
          <li>Vital interests</li>
          <li>Legitimate interests</li>
          <li>Provision of health or social care services</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>4. How We Use the Information</h2>
        <p>We use collected data to:</p>
        <ul>
          <li>Enable AI-based diagnostic assessments</li>
          <li>Improve model performance and accuracy</li>
          <li>Facilitate clinician collaboration and consultations</li>
          <li>Provide training through our teaching portal</li>
          <li>Deliver personalized learning and diagnostic insights</li>
          <li>Respond to inquiries and offer customer support</li>
          <li>Comply with applicable laws and regulations in the country or region where you reside</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>5. Information Sharing and Disclosure</h2>
        <p>We may disclose your data under the following circumstances:</p>
        <ul>
          <li><strong>Healthcare Providers:</strong> With your consent, data may be shared with authorized radiologists, pathologists, or physicians.</li>
          <li><strong>Vetted Third-Party Service Providers:</strong> Including cloud service providers, data processors, and analytics platforms under strict contractual and regional compliance obligations.</li>
          <li><strong>Legal and Regulatory Authorities:</strong> If required under applicable laws, subpoenas, or court orders.</li>
          <li><strong>Research & Development:</strong> Anonymized and aggregated data may be used for medical research and innovation.</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>6. Data Storage and Security</h2>
        <ul>
            <li>All data is stored on encrypted servers located in data centers that comply with local data residency requirements (e.g., GDPR in the EU, PDPL in Saudi Arabia, and Decree-Law 45 in the UAE).</li>
            <li>Data in transit and at rest is protected using industry-standard encryption protocols (e.g., AES-256, TLS 1.2+).</li>
            <li>Regular audits, vulnerability assessments, and penetration testing are conducted.</li>
            <li>We maintain Business Associate Agreements (BAAs) where applicable to meet HIPAA obligations.</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>7. International Data Transfers</h2>
        <p>If personal data is transferred outside your country or region, such transfers are safeguarded through:</p>
        <ul>
            <li>Standard Contractual Clauses (SCCs)</li>
            <li>Adequacy decisions by data protection authorities</li>
            <li>Binding Corporate Rules (BCRs)</li>
            <li>Local data residency rules where legally required (e.g., KSA and UAE residency requirements)</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>8. Data Retention</h2>
        <p>
          We retain personal data only for as long as necessary to fulfill the purposes for which it was collected or as required by applicable law, regulation, or contractual obligation. Upon expiration, data is securely deleted or anonymized.
        </p>
      </section>

      <section className="policy-section">
        <h2>9. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the following rights:</p>
        <ul>
          <li>Right to Access</li>
          <li>Right to Rectification</li>
          <li>Right to Erasure ("Right to be Forgotten")</li>
          <li>Right to Restrict Processing</li>
          <li>Right to Data Portability</li>
          <li>Right to Object</li>
          <li>Right to Withdraw Consent</li>
          <li>Right to Lodge a Complaint with a Supervisory Authority</li>
        </ul>
        <p>
          To exercise these rights, contact us at [Insert Contact Email - **Remember to replace this placeholder!**]. We will respond within the timelines prescribed by applicable laws.
        </p>
      </section>

      <section className="policy-section">
        <h2>10. Children's Privacy</h2>
        <p>
          PRAID AI does not knowingly collect or process personal data from children under the age of 16 unless explicitly authorized by parental consent or applicable medical guardianship provisions under regional laws.
        </p>
      </section>

      <section className="policy-section">
        <h2>11. AI Model Transparency and Governance</h2>
        <ul>
          <li>PRAID AI ensures explainability of its algorithms where feasible.</li>
          <li>Human oversight is maintained for all clinical decisions.</li>
          <li>We continuously monitor algorithmic fairness, bias, and performance across demographics and geographic regions.</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>12. Updates to This Privacy Policy</h2>
        <p>
          We may periodically update this Privacy Policy. The updated version will be posted on our website with the effective date. We encourage users to review this page regularly.
        </p>
      </section>

      <section className="policy-section contact-info">
        <h2>13. Contact Information</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy, you may contact:
        </p>
        <address>
          <strong>PRAID AI Privacy Office</strong><br />
          10th Floor North Side ISE Towers<br />
          Jinnah Avenue Blue Area<br />
          Islamabad Pakistan - 44000<br />
          Email: info.praid-ai.com<br />
          Phone: +92 51 2895034
        </address>
      </section>

      <p className="closing-statement">
        This Privacy Policy reflects our commitment to respecting your rights and operating in accordance with the highest data protection and clinical integrity standards across Pakistan, UAE, UK, MENA, KSA, US, and beyond.
      </p>
    </div>
  );
};

export default PrivacyPolicy;