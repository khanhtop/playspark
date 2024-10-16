import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";
import clsx from "clsx";
export default function Privacy() {
  const textClass = "text-16px";
  const headerClass = "font-bold";
  return (
    <>
      <div className="h-auto mx-auto w-full max-w-full bg-white">
        <Navbar />
        <div className=" py-12 max-w-[624px] mx-auto pt-[120px] text-[16px] items-start text-start">
          <h1 className="text-[26px] font-bold mb-[50px] px-10">
            Privacy Policy
          </h1>
          <div className="flex flex-col items-start justify-start gap-5">
            <div>
              <p>
                {" "}
                Spark Up Group Pty Ltd T/A PlaySpark ABN 94 653 903 916
                (we, us or our), understands that protecting your personal
                information is important. This Privacy Policy sets out our
                commitment to protecting the privacy of personal information
                provided to us, or otherwise collected by us when providing our
                online platform to you (Services) or when otherwise interacting
                with you. 
              </p>
            </div>
            <p className="font-bold">The information we collect</p>
            <p>
              <span className="font-bold">Personal information:</span> is
              information or an opinion, whether true or not and whether
              recorded in a material form or not, about an individual who is
              identified or reasonably identifiable.
            </p>
            <p>
              The types of personal information we may collect about you
              include:
            </p>
            <div>
              <p className="font-bold">When you visit our website:</p>
              <ul class="list-disc px-5">
                <li>your name;</li>

                <li>images of you;</li>
                <li>
                  your contact details, including email address, street address
                  and/or telephone number; 
                </li>
                <li>your date of birth;</li>
                <li>
                  your credit card or other payment details (through our third
                  party payment processor);
                </li>
                <li>your preferences and/or opinions;</li>
                <li>
                  information you provide to us, including through feedback,
                  customer surveys or otherwise;
                </li>
                <li>your sensitive information as set out below;</li>
                <li>
                  details of products and services we have provided to you
                  and/or that you have enquired about, and our response to you;
                </li>
                <li>
                  support requests submitted to us and our response to you;
                </li>
                <li>
                  your browser session and geo-location data, device and network
                  information, statistics on page views and sessions,
                  acquisition sources, search queries and/or browsing behaviour;
                </li>
                <li>
                  information about your access and use of our Services,
                  including through the use of Internet cookies, your
                  communications with our online Services, the type of browser
                  you are using, the type of operating system you are using and
                  the domain name of your Internet service provider;
                </li>
                <li>
                  additional personal information that you provide to us,
                  directly or indirectly, through your use of our Services,
                  associated applications, associated social media platforms
                  and/or accounts from which you permit us to collect
                  information; and
                </li>
                <li>
                  any other personal information requested by us and/or provided
                  by you or a third party.
                </li>
              </ul>
            </div>
            <p>
              <span className="font-bold">Sensitive information:</span> is a
              sub-set of personal information that is given a higher level of
              protection. Sensitive information means information relating to
              your racial or ethnic origin, political opinions, religion, trade
              union or other professional associations or memberships,
              philosophical beliefs, sexual orientation or practices, criminal
              records, health information or biometric information. 
            </p>
            <div>
              <p>
                <span className="font-bold">Sensitive information:</span> The
                types of sensitive information we may collect about you include:
              </p>
              <ul className="list-disc px-5">
                <li>your criminal record; </li>
                <li>sexual orientation;</li>
                <li>your racial or ethnic origin; and</li>
                <li>your nationality and place of birth.</li>
              </ul>
              <p>
                If at any time we need to collect sensitive information about
                you, and unless otherwise permitted by law, we will first obtain
                your consent and we will only use it as required or authorised
                by law. 
              </p>
            </div>
            <p className="font-bold">How we collect personal information</p>
            <div>
              <p>
                We collect personal information in a variety of ways, including:
              </p>
              <ul className="list-disc px-5">
                <li>
                  Directly: We collect personal information which you directly
                  provide to us, including when you register for an account or
                  when you request our assistance via email, or over the
                  telephone.
                </li>
                <li>
                  Indirectly: We may collect personal information which you
                  indirectly provide to us while interacting with us, such as
                  when you use our website, in emails, over the telephone and in
                  your online enquiries.
                </li>
                <li>
                  From third parties: We collect personal information from third
                  parties, such as from your employer where they enrol you in
                  our program / details of your use of our website from our
                  analytics and cookie providers and marketing providers. See
                  the “Cookies” section below for more detail on the use of
                  cookies.
                </li>
              </ul>
            </div>
            <p className="font-bold">
              Why we collect, hold, use and disclose personal information
            </p>
            <div>
              <p>
                <span className="font-bold">Personal information:</span> We may
                collect, hold, use and disclose personal information for the
                following purposes:
              </p>
              <ul className="list-disc px-5">
                <li>
                  to enable you to access and use our Services, including to
                  provide you with a login;
                </li>
                <li>
                  to provide our Services to you, including to manage your
                  account;
                </li>
                <li>
                  to enable you to access and use our associated applications;
                </li>
                <li>
                  to contact and communicate with you about our Services,
                  including in response to any support requests you lodge with
                  us or other enquiries you make with us;
                </li>
                <li>
                  for internal record keeping, administrative, invoicing and
                  billing purposes;
                </li>
                <li>
                  for analytics, market research and business development,
                  including to operate and improve our Services, associated
                  applications;
                </li>
                <li>
                  to run promotions, competitions and/or offer additional
                  benefits to you;
                </li>
                <li>
                  for advertising and marketing, including to send you
                  promotional information about our products and services and
                  other information that we consider may be of interest to you;
                </li>
                <li>
                  to comply with our legal obligations and resolve any disputes
                  that we may have; and
                </li>
                <li>if otherwise required or authorised by law.</li>
              </ul>
            </div>
            <div>
              <p>
                Sensitive information: We only collect, hold, use and disclose
                sensitive information for the following purposes:
              </p>
              <ul className="list-disc px-5">
                <li>any purposes you consent to;</li>
                <li>
                  the primary purpose for which it is collected, including to
                  provide our platform to you and to provide you with
                  opportunities to earn rewards on the platform through
                  providing your information;
                </li>
                <li>
                  secondary purposes that are directly related to the primary
                  purpose for which it was collected, including disclosure to
                  the below listed third parties as reasonably necessary to
                  provide our Services to you; 
                </li>
                <li>
                  to contact emergency services, or to speak with your family,
                  partner or support person where we reasonably believe there is
                  a serious risk to the life, health or safety of you or another
                  person and it is impracticable for us to obtain your consent;
                  and
                </li>
                <li>if otherwise required or authorised by law. </li>
              </ul>
            </div>
            <div>
              <p className="font-bold">
                Our disclosures of personal information to third parties
              </p>
              <p>We may disclose personal information to:</p>
              <ul className="list-disc px-5">
                <li>
                  third party service providers for the purpose of enabling them
                  to provide their services, to us, including (without
                  limitation) IT service providers, data storage, web-hosting
                  and server providers, email marketing providers, debt
                  collectors, couriers, maintenance or problem-solving
                  providers, marketing or advertising providers, professional
                  advisors and payment systems operators;
                </li>
                <li>our employees, contractors and/or related entities;</li>
                <li>our existing or potential agents or business partners;</li>
                <li>
                  sponsors or promoters of any promotions or competition we run;
                </li>
                <li>
                  anyone to whom our business or assets (or any part of them)
                  are, or may (in good faith) be, transferred;
                </li>
                <li>
                  courts, tribunals and regulatory authorities, in the event you
                  fail to pay for goods or services we have provided to you;
                </li>
                <li>
                  courts, tribunals, regulatory authorities and law enforcement
                  officers, as required or authorised by law, in connection with
                  any actual or prospective legal proceedings, or in order to
                  establish, exercise or defend our legal rights; and
                </li>
                <li>
                  third parties to collect and process data, such as [Google
                  Analytics (To find out how Google uses data when you use third
                  party websites or applications, please see
                  www.google.com/policies/privacy/partners/ or any other URL
                  Google may use from time to time), Facebook Pixel or other
                  relevant analytics businesses]; and
                </li>
                <li>
                  any other third parties as required or permitted by law, such
                  as where we receive a subpoena.
                </li>
              </ul>
            </div>
            <p>
              <span>Google Analytics:</span> We have enabled Google Analytics
              Advertising Features including Remarketing Features, Advertising
              Reporting Features, Demographics and Interest Reports, Store
              Visits, Google Display Network Impression reporting etc]. We and
              third-party vendors use first-party cookies (such as the Google
              Analytics cookie) or other first-party identifiers, and
              third-party cookies (such as Google advertising cookies) or other
              third-party identifiers together.  You can opt-out of Google
              Analytics Advertising Features including using a Google Analytics
              Opt-out Browser add-on found here. To opt-out of personalised ad
              delivery on the Google content network, please visit Google’s Ads
              Preferences Manager here or if you wish to opt-out permanently
              even when all cookies are deleted from your browser you can
              install their plugin here.  To opt out of interest-based ads on
              mobile devices, please follow these instructions for your mobile
              device: On android open the Google Settings app on your device and
              select “ads” to control the settings. On iOS devices with iOS 6
              and above use Apple’s advertising identifier. To learn more about
              limiting ad tracking using this identifier, visit the settings
              menu on your device. 
            </p>
            <p>
              <span className="font-bold">Overseas disclosure</span> We may
              store personal information overseas. Where we disclose your
              personal information to the third parties listed above, these
              third parties may also store, transfer or access personal
              information outside of Australia. Your rights and controlling your
              personal information Your choice: Please read this Privacy Policy
              carefully. If you provide personal information to us, you
              understand we will collect, hold, use and disclose your personal
              information in accordance with this Privacy Policy. You do not
              have to provide personal information to us, however, if you do
              not, it may affect our ability to provide our Services to you and
              your use of our Services.
            </p>
            <p>
              <span className="font-bold">Information from third parties:</span>{" "}
              If we receive personal information about you from a third party,
              we will protect it as set out in this Privacy Policy. If you are a
              third party providing personal information about somebody else,
              you represent and warrant that you have such person’s consent to
              provide the personal information to us.  Restrict and
              unsubscribe: To object to processing for direct
              marketing/unsubscribe from our email database or opt-out of
              communications (including marketing communications), please
              contact us using the details below or opt-out using the opt-out
              facilities provided in the communication.
            </p>
            <p>
              Access: You may request access to the personal information that we
              hold about you.  An administrative fee may be payable for the
              provision of such information. Please note, in some situations, we
              may be legally permitted to withhold access to your personal
              information. If we cannot provide access to your information, we
              will advise you as soon as reasonably possible and provide you
              with the reasons for our refusal and any mechanism available to
              complain about the refusal. If we can provide access to your
              information in another form that still meets your needs, then we
              will take reasonable steps to give you such access.
            </p>
            <p>
              Correction: If you believe that any information we hold about you
              is inaccurate, out of date, incomplete, irrelevant or misleading,
              please contact us using the details below. We will take reasonable
              steps to promptly correct any information found to be inaccurate,
              out of date, incomplete, irrelevant or misleading. Please note, in
              some situations, we may be legally permitted to not correct your
              personal information. If we cannot correct your information, we
              will advise you as soon as reasonably possible and provide you
              with the reasons for our refusal and any mechanism available to
              complain about the refusal.
            </p>
            <p>
              Complaints: If you wish to make a complaint, please contact us
              using the details below and provide us with full details of the
              complaint. We will promptly investigate your complaint and respond
              to you, in writing, setting out the outcome of our investigation
              and the steps we will take in response to your complaint. 
            </p>
            <p>
              <span className="font-bold">Storage and security</span> We are
              committed to ensuring that the personal information we collect is
              secure. In order to prevent unauthorised access or disclosure, we
              have put in place suitable physical, electronic and managerial
              procedures, to safeguard and secure personal information and
              protect it from misuse, interference, loss and unauthorised
              access, modification and disclosure. While we are committed to
              security, we cannot guarantee the security of any information that
              is transmitted to or by us over the Internet. The transmission and
              exchange of information is carried out at your own risk. 
            </p>
            <p>
              <span className="font-bold">Cookies</span>
              We may use cookies on our website from time to time. Cookies are
              text files placed in your computer’s browser to store your
              preferences. Cookies, by themselves, do not tell us your email
              address or other personally identifiable information. However,
              they do recognise you when you return to our online website and
              allow third parties, such as Google and Facebook, to cause our
              advertisements to appear on your social media and online media
              feeds as part of our retargeting campaigns. If and when you choose
              to provide our online website with personal information, this
              information may be linked to the data stored in the cookie. You
              can block cookies by activating the setting on your browser that
              allows you to refuse the setting of all or some cookies. However,
              if you use your browser settings to block all cookies (including
              essential cookies) you may not be able to access all or parts of
              our website.
            </p>
            <p>
              <span className="font-bold">Links to other websites</span> Our
              website may contain links to other party’s websites. We do not
              have any control over those websites and we are not responsible
              for the protection and privacy of any personal information which
              you provide whilst visiting those websites. Those websites are not
              governed by this Privacy Policy. Personal information from social
              network accounts If you connect your account with us to a social
              network account, such as Facebook and Google, we will collect your
              personal information from the social network. We will do this in
              accordance with the privacy settings you have chosen on that
              social network. 
            </p>
            <p>
              The personal information that we may receive includes your name,
              ID, user name, handle, profile picture, gender, age, language,
              list of friends or follows and any other personal information you
              choose to share. We use the personal information we receive from
              the social network to create a profile for you on our platform. If
              you agree, we may also use your personal information to give you
              updates on the social network which might interest you. We will
              not post to your social network without your permission. 
            </p>
            <p>
              Where we have accessed your personal information through your
              Facebook account, you have the right to request the deletion of
              personal information that we have been provided by Facebook. To
              submit a request for the deletion of personal information we
              acquired from Facebook, please send us an email at the address at
              the end of this Privacy Policy and specify in your request which
              personal information you would like deleted. If we deny your
              request for the deletion of personal information, we will explain
              why. 
            </p>
            <p>
              <span className="font-bold">Amendments</span> We may, at any time
              and at our discretion, vary this Privacy Policy by publishing the
              amended Privacy Policy on our website. We recommend you check our
              website regularly to ensure you are aware of our current Privacy
              Policy.
            </p>
            <p>
              For any questions or notices, please contact us at: Spark Up Group
              Pty Ltd T/A PlaySpark ABN 94 653 903 916 
              Email: luke@playspark.co
              Last update: 10 October 2024
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

function Paragraph({ children }) {
  return <p className="py-4 px-4">{children}</p>;
}

function Heading({ children }) {
  return <p className="text-2xl px-4 font-bold uppercase">{children}</p>;
}
