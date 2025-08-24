async function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-4xl bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-green-500 text-center">
          Terms of Service
        </h1>

        <h2 className="text-xl font-semibold text-gray-800">
          Falcon Aiming Code Of Conduct
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>All Sales Are Final (MEANING NO REFUNDS ONCE KEY HAS BEEN USED)</li>
          <li>Tools Can Be Discontinued At Any Time And You Will Not Be Compensated</li>
          <li>Lifetime On Tools Is The Duration Of The Tool, Not 80 Years!</li>
          <li>Any Attempt On Charging Back Will Result In A Permanent Ban From Our Services</li>
          <li>
            Join The Discord For Updates!{" "}
            <a
              href="https://discord.gg/FalconAiming"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 underline"
            >
              https://discord.gg/FalconAiming
            </a>
          </li>
        </ul>

        <p className="text-gray-700">
          We do not sell any software; we sell license keys. Everything we are doing is fully legal as we have not broken any terms of service or laws, as there are no laws against selling license keys rather than software. The software in question is gifted to you as a donation for buying a license key.
        </p>

        <h2 className="text-xl font-semibold text-gray-800">General Terms</h2>
        <p className="text-gray-700 space-y-4">
          This website is operated by anonymous sources, referred to as &quot;The Merchant&quot; in these terms. Throughout the site, the terms &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to The Merchant. The Merchant offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here. By visiting our site and/or purchasing something from us, you engage in our &quot;Service&quot; and agree to be bound by these terms and conditions (&quot;Terms of Service&quot;, &quot;Terms&quot;), including additional terms referenced herein and/or available by hyperlink.
        </p>
        <p className="text-gray-700 space-y-4">
          These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content. Please read these Terms carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, you may not access the website or use any services.
        </p>
        <p className="text-gray-700 space-y-4">
          Any new features or tools added to the store shall also be subject to these Terms of Service. We reserve the right to update, change, or replace any part of these Terms by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of the website following the posting of any changes constitutes acceptance of those changes.
        </p>
        <p className="text-gray-700 space-y-4">
          After the product you have purchased has been sent to the email you entered, we are not responsible for the product purchased. Any chargebacks will be treated as fraud. Please refrain from opening a dispute on PayPal. You must open a support ticket before opening a dispute; failure to do so will result in no further support.
        </p>
      </div>
    </div>
  );
}

export default TermsPage;
