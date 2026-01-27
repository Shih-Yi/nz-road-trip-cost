import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | VanMath",
  description: "Privacy Policy for VanMath - NZ Campervan Cost Calculator.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Link 
          href="/" 
          className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calculator
        </Link>

        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Privacy Policy
        </h1>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
          <section>
            <p>Last updated: January 27, 2026</p>
            <p>
              Your privacy is important to us. It is VanMath&apos;s policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://camperorcar.co.nz" className="text-blue-600 hover:underline">camperorcar.co.nz</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>
              We only collect information about you if we have a reason to do so — for example, to provide our services, to communicate with you, or to make our services better.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Usage Data:</strong> We may collect information about your interactions with the site, such as the pages you visit and the features you use. This helps us understand how our tool is being used and improve it.
              </li>
              <li>
                <strong>Device Information:</strong> We collect information about the device and browser you use to access our site to ensure compatibility and optimize performance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Third-Party Services</h2>
            <p>
              We use trusted third-party services to help us operate and improve our website. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address.
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Google Analytics & Google Tag Manager:</strong> Used to track website traffic and user behavior anonymously.
              </li>
              <li>
                <strong>Vercel Analytics:</strong> Used to monitor the performance and speed of our application.
              </li>
              <li>
                <strong>Tally Forms:</strong> We use Tally for collecting user feedback. If you choose to submit feedback, the information you provide will be processed by Tally.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Cookies</h2>
            <p>
              We use cookies to help us identify and track visitors, their usage of our website, and their website access preferences. Visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us via the feedback button on the homepage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
