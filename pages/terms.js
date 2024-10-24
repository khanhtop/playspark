import { useRouter } from "next/router";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/homepage/footer";

export default function Terms() {
  const router = useRouter();
  const publisherName = router.query.companyName ?? "PlaySpark";
  const date = new Date();
  const dateString = date.toString();

  return (
    <>
      <div className="h-auto mx-auto w-full max-w-full bg-white">
        <Navbar />
        <div className="flex flex-row items-start justify-start pt-[150px] max-w-[890px] mx-auto gap-20 text-[16px]">
          <div className="flex flex-col w-1/5 items-center justify-center text-start gap-24">
            <input
              className="border rounded-[24px] bg-white  text-black px-5 py-2 text-[16px] shadow-xl shadow-grey"
              placeholder="Search"
            />
            <p className="leading-[23px] -tracking-normal">
              Our disclosures Introduction Platform licence
            </p>
          </div>
          <div className="flex flex-col w-full py-5 gap-10">
            <h1 className="font-bold text-[26px] font-roboto -tracking-wide">
              Terms and Conditions | PlaySpark
            </h1>
            <div>
              <h1 className="font-bold">1. Our Disclosures</h1>
              <p>
                Our complete terms and conditions are contained below, but some
                important points for you to know before you become a customer
                use our Platform called PlaySpark are set out below:
              </p>
              <ul className="list-disc px-5">
                <li>
                  we may amend these Terms or if you are a Client, your
                  Membership at any time, by providing written notice to you;
                </li>
                <li>
                  if you are a Client and you terminate these Terms for your
                  convenience, you will liable to pay (or you will not be
                  entitled to a refund in respect of) the remaining Fees as
                  outlined in this agreement;
                </li>
                <li>
                  our liability under these Terms is limited to us repaying you
                  an amount up to a maximum of $20,000 and we will not be liable
                  for Consequential Loss;
                </li>
                <li>
                  we will have no liability for the use or results of any Third
                  Party ID Service or Identity Check, any aspect of the User and
                  Client or Advertiser interaction including the goods and
                  services offered by the Client, the description of the goods
                  and services requested or offered, any advice provided, the
                  performance of services supply and delivery of goods solely to
                  the extent that we are not involved in any such interaction,
                  and any event outside of our reasonable control;
                </li>
                <li>
                  we may terminate these Terms at any time by giving 30 days’
                  written notice to you; and
                </li>
              </ul>
              <p>
                Nothing in these Terms limit your rights under the Australian
                Consumer Law.
              </p>
            </div>
            <div>
              <p className="font-bold">2. Introduction</p>
              <p>
                2.1 These terms and conditions (Terms) are entered into between
                Spark Up Group Pty Ltd ABN 94 653 903 916 (we, us or our) and
                you, together the Parties and each a Party. 
                <br />
                2.2 We provide a platform where Clients (Clients ), corporate
                Advertisers (Advertisers) and Users (Users) can connect and
                transact (PlaySpark Platform). 
                <br />
                2.3 In these Terms, you means (as applicable) the person or
                entity registered with us as either a User, Advertiser or
                Client, or the individual accessing or using the PlaySpark
                Platform.
                <br />
                2.4 If you are using the PlaySpark Platform on behalf of your
                employer or a business entity, you, in your individual capacity,
                represent and warrant that you are authorised to act on behalf
                of your employer or the business entity and to bind the entity
                and the entity’s personnel to these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">
                3. Acceptance and PlaySpark Platform Licence
              </p>
              <p>
                3.1 You accept these Terms by the earlier of:
                <br />
                (a) if you are a User, checking the box and, clicking “I accept”
                on the PlaySpark Platform;
                <br />
                (b) if you are a Advertiser or Client, registering for an
                Account on the PlaySpark Platform;, and 
                <br />
                (c) using the PlaySpark Platform or the SportzArcade Games
                Services; or
                <br />
                (d) or by signing these Terms (if applicable).
                <br />
                3.2 You must be at least 13 years old to use the PlaySpark
                Platform. 
                <br />
                3.3 We may amend these Terms at any time, by providing written
                notice to you. By clicking “I accept” or continuing to use the
                PlaySpark Platform after the notice or 30 days after
                notification (whichever date is earlier), you agree to the
                amended Terms. If you do not agree to the amendment, you may
                immediately terminate these Terms in accordance with the
                “Cancellations and Changes to Membership” clause (clause 9.6)by
                notice in writing to us as per clauses 23.1, 23.2 or 23.3.
                <br />
                3.4 If you access or download our mobile application from: (1)
                the Apple App Store, you agree to any Usage Rules set forth in
                the App Store Terms of Service; or (2) the Google Play Store,
                you agree to the Android, Google Inc. Terms and Conditions
                including the Google Apps Terms of Service.
                <br />
                3.5 Subject to your compliance with these Terms, we grant you a
                personal, non-exclusive, royalty-free, revocable, worldwide,
                non-transferable licence to download and use our PlaySpark
                Platform in accordance with these Terms.  All other uses are
                prohibited without our prior written consent.
                <br />
                3.6 When using the PlaySpark Platform, you must not do or
                attempt to do anything that is unlawful or inappropriate,
                including: 
                <br />
                (a) anything that would constitute a breach of an individual’s
                privacy (including uploading private or personal information
                without an individual's consent) or any other legal rights;
                <br />
                (b) using the PlaySpark Platform to defame, harass, threaten,
                menace or offend any person;
                <br />
                (c) using the PlaySpark Platform for unlawful purposes;
                <br />
                (d) interfering with any user of the PlaySpark Platform;
                <br />
                (e) tampering with or modifying the PlaySpark Platform
                (including by transmitting viruses and using trojan horses);
                <br />
                (f) using the PlaySpark Platform to send unsolicited electronic
                messages; 
                <br />
                (g) using data mining, robots, screen scraping or similar data
                gathering and extraction tools on the PlaySpark Platform; or
                <br />
                (h) facilitating or assisting a third party to do any of the
                above acts.
                <br />
              </p>
            </div>
            <div>
              <p className="font-bold">
                4. Accounts for Clients and Advertisers
              </p>
              <p>
                4.1 This clause 4 applies if you are a Client or a Advertiser.
                <br />
                4.2 YYou must register on the PlaySpark Platform and create an
                account (Account) to access the PlaySpark Platform’s features.
                <br />
                4.3 You may only have 1 Account as a Client,  and 1 Account as a
                Advertiser and 1 Account as a User on the PlaySpark Platform, as
                applicable.
                <br />
                4.4 You must provide basic information when registering for an
                Account including your business name (for Clients and
                Advertisers), your name (for Users), contact name and email
                address and you must choose a username and password. 
                <br />
                4.5 The username you choose must not (1) be offensive or in
                other ways insulting or (2) contain characteristics which belong
                to a third party, including names of famous persons, or personal
                names to which you do not own the rights.
                <br />
                4.6 You may also register for an Account using your Facebook,
                Google or other social media network account (Social Media
                Account). If you sign in to your Account using your Social Media
                Account, you authorise us to access certain information on your
                Social Media Account including but not limited to your current
                profile photo, name and email address.
                <br />
                4.7 Once you have registered an Account, your Account
                information will be used to create a profile which you may then
                curate. <br />
                4.8 All personal information you provide to us will be treated
                in accordance with our Privacy Policy and the Privacy Act (1988)
                (Cth).
                <br />
                4.9 You agree to provide and maintain up to date information in
                your Account and to not share your Account password with any
                other person. Your Account is personal and you must not transfer
                it to others. 
                <br />
                4.10 You are responsible for keeping your Account details and
                your username and password confidential and you will be liable
                for all activity on your Account, including purchases made using
                your Account details. You agree to immediately notify us of any
                unauthorised use of your Account.
                <br />
                4.11 If you are a Client or Advertiser, wWe will review your
                request for an Account before approving the request. We may
                request additional information, including ID verification,
                objectives and relevant media or branding. If you do not provide
                us with information we reasonably request, we may refuse to
                create an Account for you. If you provide us with any
                information which indicates you are not a fit and proper person
                to be provided with an Account, we may refuse to provide you
                with an Account, in our sole discretion.
                <br />
                4.12 We may make access to and use of certain parts of the
                PlaySpark Platform subject to conditions or requirements,
                including identity verification, cancellation history, quality
                of services and threshold of reviews.
                <br />
                4.13 When you create an Account as a Client, you must also
                select a membership (Membership). You may choose between
                different tiers of Membership with different services and
                different membership periods as set out on our PlaySpark
                Platform.
                <br />
                4.14 If you discover an issue related to your wallet, please
                contact your wallet provider. Likewise, you are solely
                responsible for your Account and any associated wallet and we
                are not liable for any acts or omissions by you in connection
                with your Account or as a result of your Account or wallet being
                compromised. You agree to immediately notify us if you discover
                or otherwise suspect any security issues related to the
                PlaySpark Platform or your Account.
              </p>
            </div>
            <div>
              <p className="font-bold">5. PlaySpark Platform summary</p>
              <p>
                5.1 The PlaySpark Platform is a gamified loyalty platform
                containing branded arcade games.
                <br />
                <br />
                5.2 Users can earn points for performing certain tasks and
                behaviours on the PlaySpark Platform or participating in games
                (Games). Each Game may be subject to additional terms or rules.
                For the avoidance of doubt, no Game is or involves a form of
                gambling and no gambling can be undertaken on the Platform. 
                <br />
                5.3 The PlaySpark Platform also aims to connect Advertisers of
                Clients closer to Users by allowing them to reward Users for
                interacting with Advertiser content on the PlaySpark Platform.
                <br />
                5.4 We provide the PlaySpark Platform to users (including
                hosting and maintaining the PlaySpark Platform), process
                payments between Users, Clients and Advertisers and assist in
                onboarding Clients and Advertisers (together, the SportzUser
                Arcade Games Services). You understand and agree that we only
                make available the SportzArcade Games Services. We are not party
                to any agreement entered into between a User, Advertiser and/or
                a Client and we have no control over the conduct of Clients,
                Advertisers, Users or any other users of the PlaySpark
                Platform. 
                <br />
                5.5 A Client wanting to offer products to Users creates an
                Account on the PlaySpark Platform and posts an accurate and
                complete description of their Client and the offers they can
                provide to Users, from time to time, including the details of
                particular offers (for example, Client membership offers,product
                coupons or vouchers) (Client Offers).
                <br />
                5.6 A Advertiser wanting to offer Tokens to Users creates an
                Account on the PlaySpark Platform and posts an accurate and
                complete description of their business and the offers they can
                provide to Users for interacting with their and Clients’
                content, from time to time, including the details of particular
                offers (for example, discounts) (Advertiser Offers)
                <br />
                5.7 A User wanting to earn or win Offers from Clients and
                Advertisers creates an Account on the PlaySpark Platform to view
                and browse Client Offers and Advertiser Offers.
                <br />
                5.8 A User can elect to purchase or redeem a Client Offer or
                Advertiser Offer via the PlaySpark Platform by submitting a
                Purchase Request. Once the relevant Client, Advertiser or User
                accepts a Redemption Request it will be deemed to be a Confirmed
                Purchase.
                <br />
                5.9 By accepting a Purchase Request, the relevant Client,
                Advertiser or User confirms that it is legally entitled to and
                capable of supplying the goods or services described in the
                Purchase Request.
                <br />
                5.10 Advertisers and Clients may enter into written agreements
                with Users in relation to the Advertiser’s and Clients goods and
                services, as applicable. To the extent there is inconsistency
                between any additional terms and conditions and these Terms,
                these Terms will prevail.
                <br />
                5.11 Clients and Advertisers must include all additional terms
                and conditions relating to their goods and services in the
                relevant Client Offer or Advertiser Offer or must clearly state
                that there are additional terms and conditions. By sending a
                Purchase Request, a User is accepting the additional terms and
                conditions of the relevant Client or Advertiser.
              </p>
            </div>
            <div>
              <p className="font-bold">
                6. Promotional Opportunities and Discount Codes
              </p>
              <p>
                6.1 As a Client, you may choose to purchase promotional
                opportunities, such as a feature in our email marketing or
                placement on our home page (Promotional Opportunity).
                Promotional Opportunities are subject to the fees and the terms
                and conditions as set out in any Promotional Opportunity offer
                and displayed on the PlaySpark Platform or otherwise
                communicated to you. In the event of any conflict between any
                Promotional Opportunity terms and conditions and these Terms,
                the Promotional Opportunity terms and conditions will prevail.
                <br />
                6.2 As a User, we may from time-to-time issue to you promotional
                discount codes for use on the PlaySpark Platform. To claim the
                discount, you must enter the promotional discount code at the
                time of submitting your Purchase Request on the PlaySpark
                Platform. The conditions of use relating to promotional discount
                codes will be set out on the PlaySpark Platform. We may also
                from time to time run competitions on the PlaySpark Platform or
                on social media. These competitions are subject to terms and
                conditions which will be made available on the PlaySpark
                Platform at the time of the competition.
              </p>
            </div>
            <div>
              <p className="font-bold">Communication</p>
              <p>
                7.1 If you have an Account, wWe may contact you via the
                PlaySpark Platform using in-Account notifications, or via
                off-PlaySpark Platform communication channels, such as text
                message or email. If you do not have an Account (you are a
                User), we may contact you via the PlaySpark Platform using our
                private messaging service, pop ups or text boxes.
                <br />
                7.2 Users, Advertisers and Clients can communicate privately
                using our private messaging service.  Advertisers and Clients
                can communicate privately or offline using the listed contact
                details based on their Accounts. Users and Clients or
                Advertisers must not communicate outside of the PlaySpark
                Platform until a Confirmed Purchase has been made. You must not
                use another party’s the contact details to organise the
                provision of the goods and services off the PlaySpark Platform,
                or otherwise to attempt to circumvent the payment of Service
                Fees to us.
              </p>
            </div>
            <div>
              <p className="font-bold">8. Memberships for Clients</p>
              <p>
                8.1 This clause 8 applies if you are a Client as Membership Fees
                are only payable by Clients, not Users or Advertisers.
                <br />
                8.2 Any Membership will only commence once the PlaySpark
                Platform is live and ready to use, notwithstanding that you may
                have accepted these Terms before this occurs.
                <br />
                8.3 Membership Fees are only payable by Clients, not Users or
                Advertisers.
                <br />
                8.4 If you are a Client, yYour Membership may begin with a free
                trial. The free trial period of your Membership will last for
                the period specified on the PlaySpark Platform or in your
                Account. We determine free trial eligibility in our sole
                discretion and we may limit eligibility to prevent free trial
                abuse. We reserve the right to revoke the free trial and suspend
                your Account at any time in the event that we determine that you
                are not eligible. If you do not cancel during the free trial
                period, we will charge your chosen payment method for the
                Membership you have chosen and its corresponding membership fee
                (Membership Fee) on the day your free trial ends.
                <br />
                8.5 Your Membership is subject to a minimum term of 1 month
                (Initial Term). Without limiting your rights under the
                Australian Consumer Law and subject to clauses 8.7 and 22.5, you
                may only cancel your Membership at the expiry of the minimum
                term. 
                <br />
                8.6 At the end of the period for which you have paid the
                Membership Fee, the Parties may agree to extend Membership for a
                further period as agreed between the Parties. If you are a
                Client, unless your Membership is suspended or terminated in
                accordance with these Terms, at the end of the Initial Term,
                your Membership will be automatically renewed annually and will
                roll over on an ongoing annual basis with a minimum 1 months
                notice of expiry, and you will be charged the same Membership
                Fee each year as set out in your Account (each a Renewal Term).
                We will provide you at least 2 months notice in advance of
                expiry of the Initial Term and each Renewal Term. 
                <br />
                8.7 Cancellations and Changes to your Membership: If you wish to
                cancel, suspend or change your Membership (for example, by
                upgrading to a different Membership tier), you must provide
                notice to us via email or via in Account notification that you
                wish to cancel, suspend or vary your Membership at least 24
                hours before the next date when payment is required under these
                Terms. If you wish to cancel your Membership, you must provide
                notice to us via email or via in Account notification that you
                wish to cancel your Membership at least 30 days before the next
                date when payment is required under these Terms and this is
                subject to clause 23.7(f). If you vary your Membership and the
                Membership Fee also varies, you will be charged the new
                Membership Fee on the next date when payment is required under
                these Terms. 
                <br />
                8.8 We may need to change the Membership (for example, the
                inclusions and exclusions) and Membership Fee from time to time.
                If you are a Client and we change your Membership or Membership
                Fee, we will provide you with 30 days’ notice of the change.
                After 30 days, we will apply the new Membership Fee to your
                existing payment details for all future payments, and your
                Membership changes will take effect on the same date. If you do
                not agree with the new Membership or Membership Fee, you may
                cancel your Membership in accordance with these terms. 
              </p>
            </div>
            <div>
              <p className="font-bold">9. Tax</p>
              <p>
                9.1 You are solely responsible for determining what, if any,
                taxes apply to transactions you participate in on the PlaySpark
                Platform. 
              </p>
            </div>
            <div>
              <p className="font-bold">Refunds and Cancellation Policy</p>
              <p>
                10.1 The cancellation, exchange, variation, or refund of any
                goods and services ordered on this PlaySpark Platform is
                strictly a matter between the relevant User and Client or
                Advertiser. The terms and conditions agreed to between the
                Client and the User must be set out clearly in the relevant
                Client Offer or Advertiser Offer. Should the Client or
                Advertiser and User agree to a refund of the Token Fees, both
                the Client or Advertiser and User acknowledge and agree that to
                the maximum extent permitted by law, our Service Fee is not
                refundable. All sales of Tokens between Users are not
                refundable.
                <br />
                10.2 For disputes between Users, Clients and Advertisers, we
                encourage Parties to attempt to resolve disputes (including
                claims for returns or refunds) with the other Party directly and
                in good faith, either on the PlaySpark Platform or through
                external communication methods. In the event that a dispute
                cannot be resolved through these means, the Parties may choose
                to resolve the dispute in any manner agreed between the Parties
                or otherwise in accordance with applicable laws. 
                <br />
                10.3 This clause 12 will survive the termination or expiry of
                these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">11. Identity verification</p>
              <p>
                11.1 If we choose to conduct identity verification or background
                checks on any  Client or Advertiser, to the extent permitted by
                law, we disclaim all warranties of any kind, either express or
                implied, that such checks will identify prior misconduct by a
                Client or Advertiser or guarantee that a Client or Advertiser
                will not engage in misconduct in the future. Any verification of
                Clients on the PlaySpark Platform is not an endorsement or
                recommendation that the Client is trustworthy or suitable. You
                should do your own due diligence before transacting with another
                user of the PlaySpark Platform.
                <br />
                11.2 As a Client or Advertiser, we may offer you the option of
                verifying your identity and/or validating your Account using a
                third party verification service (Third Party ID Service).
                <br />
                11.3 Where you have elected to verify your identity under this
                clause 13, you acknowledge and agree that (1) we may contact,
                connect to or otherwise liaise with Third Party ID Services to
                validate your identity and information (Identity Check); and (2)
                Third Party ID Services may provide us with your personal
                information or sensitive information, and you consent to us
                receiving and using this information to enable us to perform an
                Identity Check.
                <br />
                11.4 Following a successful Identity Check, you acknowledge and
                agree that (1) we may permit you to use verification signs,
                icons or badges in connection with your Account to indicate that
                a successful Identity Check has been performed (Verification
                Icon); and (2) a Verification Icon may only be used by the
                individual or business for whom the relevant Identity Check has
                been successfully performed and the relevant Verification Icon
                has been issued, and then, only where that individual is
                directly providing the relevant goods and services .
                <br />
                11.5 You acknowledge and agree that (1) the Identity Check and
                any issuance of a Verification Icon may not be fully accurate,
                as they are dependent on the information provided by the
                relevant individual or business and/or information or checks
                performed by third parties; and (2) you should not rely on the
                Identity Checks or the Verification Icons, and you should make
                your own inquiries as to the accuracy, legitimacy, validity,
                credibility or authenticity of any users of the PlaySpark
                Platform. 
              </p>
            </div>
            <div>
              <p className="font-bold">12. Reviews</p>
              <p>
                12.1 Users may review their experience with the Client on the
                PlaySpark Platform, including the goods and services (Review).
                <br />
                12.2 Reviews can be viewed by any user and will remain viewable
                until the relevant Account is removed or terminatedfor a period
                of 3 months.
                <br />
                12.3 You agree to provide true, fair and accurate information in
                your Review. If we consider that the Review is untrue, unfair,
                inaccurate, offensive or inappropriate, we may delete the Review
                or ban you from posting the Review. We do not undertake to
                review each Review. To the maximum extent permitted by law, we
                are not responsible for the content of any Reviews.
                <br />
                12.4 You can write a Review about a Client if you have had an
                experience with that Client, which means that (1) you have
                engaged the Client through the PlaySpark Platform; or (2) you
                can otherwise document your interaction with the Client in
                relation to the PlaySpark Platform, including via correspondence
                (collectively referred to as a User Experience).
                <br />
                12.5 You may not write a review about a Client you have
                previously owned, currently own, or which an immediate family
                member currently owns, or if you are an executive or employee of
                that Client, or work for the Client. Similarly, you may not
                write a Review about a direct competitor to the Client that you
                own, are employed by or work for. 
                <br />
                12.6 Your User Experience must have occurred in the 12 months
                prior to you writing a Review. 
                <br />
                12.7 You may only write about your own User Experience. You are
                not permitted to write a Review about somebody else’s User
                Experience, such as that of a family member or friend.
                <br />
                12.8 You are encouraged to be specific and factual in your
                Reviews. If you have been offered an incentive by a Client to
                write a Review, you should must include information about this
                in your Review. Incentives include the Client offering you a
                gift, reward, discount or advantage for writing a Review about
                the Client on the PlaySpark Platform.
                <br />
                12.9 This clause 14 will survive the termination or expiry of
                these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">13. Intellectual property</p>
              <p>
                13.1 All intellectual property (including copyright) developed,
                adapted, modified or created by a Party or a Party’s personnel
                (including in connection with the Terms, any content on the
                PlaySpark Platform, and the products) (Intellectual Property)
                will at all times vest, or remain vested, in that Party. 
                <br />
                13.2 Each Party authorises the other Party to use the original
                Party’s Intellectual Property solely for the purposes for which
                it was intended to be used.
                <br />
                13.3 A Party must not, without the other Party’s prior written
                consent:
                <br />
                (a) copy, in whole or in part, any of the other Party’s
                Intellectual Property; 
                <br />
                (b) reproduce, retransmit, distribute, disseminate, sell,
                publish, broadcast or circulate any of the other Party’s
                Intellectual Property to any third party; or
                <br />
                (c) breach any intellectual property rights connected with the
                PlaySpark Platform, including (without limitation) altering or
                modifying any of the other Party’s Intellectual Property;
                causing any of the other Party’s Intellectual Property to be
                framed or embedded in another website; or creating derivative
                works from any of the other Party’s Intellectual Property.
                <br />
                13.4 Nothing in the above clause 15.3 restricts a Party’s
                ability to publish, post or repost the other Party’s
                Intellectual Property on your social media page or blog,
                provided that:
                <br />
                (a) the Party does not assert that it is the owner of the other
                Party’s Intellectual Property;
                <br />
                (b) unless explicitly agreed by the other Party in writing, the
                Party does not assert that it is endorsed or approved by the
                other Party; 
                <br />
                (c) the Party does not damage or take advantage of the other
                Party’s reputation, including in a manner that is illegal,
                unfair, misleading or deceptive; and 
                <br />
                (d) the Party complies with all other terms of these Terms.
                <br />
                13.5 This clause 15 will survive the termination or expiry of
                these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">Content you upload </p>
              <p>
                14.1 You may be permitted to post, upload, publish, submit or
                transmit relevant information and content including Reviews
                (User Content) on the PlaySpark Platform. We may run campaigns
                via the PlaySpark Platform and via social media that encourage
                you to post User Content on social media using specific hashtags
                (#) (Tag).
                <br />
                14.2 If you make any User Content available on or through the
                PlaySpark Platform, including on social media using a Tag, you
                grant to us a worldwide, irrevocable, perpetual, non-exclusive,
                non-transferable, royalty-free licence to use the User Content,
                with the right to use, view, copy, communicate, publicly
                display, publicly perform, transmit, stream, broadcast or access
                such User Content on, through or by means of the PlaySpark
                Platform and our social media platforms always subject to your
                written approval. You may request that any of your User Content
                is removed from the PlaySpark Platform or social media by
                sending us an email to the address at the end of these Terms. We
                will endeavour to action any removal requests within a
                reasonable time.
                <br />
                14.3 You agree that you are solely responsible for all User
                Content that you make available on or through the PlaySpark
                Platform, including on social media using a Tag. You represent
                and warrant that: 
                <br />
                (a) you are either the sole and exclusive owner of all User
                Content or you have all rights, licences, consents and releases
                that are necessary to grant to us the rights in such User
                Content (as contemplated by these Terms); and
                <br />
                (b) neither the User Content nor the posting, uploading,
                publication, submission or transmission of the User Content or
                our use of the User Content on, through or by means of our
                PlaySpark Platform (including on social media) will infringe,
                misappropriate or violate a third party’s intellectual property
                rights, or rights of publicity or privacy, or result in the
                violation of any applicable law or regulation.
                <br />
                14.4 We do not endorse or approve, and are not responsible for,
                any User Content. We may, at any time (at our sole discretion),
                remove any User Content.
                <br />
                14.5 We encourage Advertisers and Clients to actively
                collaborate on the PlaySpark Platform. To the extent that
                Advertisers or Clients intend to share or collaborate User
                Content, or to license one another’s Intellectual Property
                Rights, this is a matter for the relevant Advertisers and
                Client. To the maximum extent permitted by law, we have no
                liability for any Liability arising from or in connection with
                any such sharing or collaboration (and we are not a party to any
                Intellectual Property licensing or other agreement covering such
                sharing or collaboration).   
                <br />
                14.6 This clause 16 will survive the termination or expiry of
                these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">15 .User data</p>
              <p>
                15.1 The Parties acknowledge and agree that any data that the
                Users input via the PlaySpark Platform in response to any
                surveys or other content posted by Advertisers will be owned by
                us (User Data).
                <br />
                15.2 If you are a User, you agree that us and the relevant
                Advertiser may access and use the User Data for our respective
                business purposes.
                <br />
                15.3 [Where we provide, or make available, the User Data to a
                Advertiser or Client (on the Platform or otherwise),] we grant
                the relevant Advertiser or Client a revocable, non-exclusive,
                non-transferable, non-sublicensable and royalty-free licence,
                for the duration of the period when the Advertiser has an active
                Account, to use User Data for its [internal] business purposes
                only and as reasonably contemplated by this Agreement. We may
                impose additional terms and conditions at our sole discretion.
              </p>
            </div>
            <div>
              <p className="font-bold">16. Warranties</p>
              <p>
                16.1 You represent, warrant and agree that:
                <br />
                (a) not used;
                <br />
                (b) there are no legal restrictions preventing you from entering
                into these Terms;  
                <br />
                (c) not used;  
                <br />
                (d) you have not relied on any representations or warranties
                made by us in relation to the PlaySpark Platform (including as
                to whether the PlaySpark Platform is or will be fit or suitable
                for your particular purposes), unless expressly stipulated in
                these Terms, including in clause 5;
                <br />
                (e) where you are a Client or Advertiser, you are responsible
                for complying with all laws, rules and regulations which apply
                to providing the goods and services in your Client Offers or
                Advertiser Offers; and
                <br />
                (f) where you are a Client or Advertiser, you are appropriately
                qualified, and have any required skills, knowledge or training,
                to provide the goods and services.
                <br />
                16.2 We represent, warrant and agree that:
                <br />
                (a) there are no legal restrictions preventing us from entering
                into these Terms;
                <br />
                (b) the PlaySpark Platform will perform in a manner that is
                consistent with the su(c) mary outlined in clause 5;
                <br />
                (c) we are responsible for complying with all laws, rules and
                regulations which apply to providing the goods and services; and
                <br />
                (d) our personnel are appropriately qualified, and have any
                required skills, knowledge or training, to provide the goods and
                services.
              </p>
            </div>
            <div>
              <p className="font-bold">17. Australian Consumer Law </p>
              <p>
                17.1 Certain legislation, including the Australian Consumer Law
                (ACL) in the Competition and Consumer Act 2010 (Cth), and
                similar consumer protection laws and regulations, may confer you
                with rights, warranties, guarantees and remedies relating to the
                provision of the PlaySpark Platform by us to you which cannot be
                excluded, restricted or modified (Consumer Law Rights). 
                <br />
                17.2 If the ACL applies to you as a consumer, nothing in these
                Terms excludes your Consumer Law Rights as a consumer under the
                ACL. You agree that our Liability for the PlaySpark Platform
                provided to an entity defined as a consumer under the ACL is
                governed solely by the ACL and these Terms.  
                <br />
                17.3 Subject to your Consumer Law Rights, we exclude all express
                and implied warranties, and all material, work and services
                (including the PlaySpark Platform) are provided to you without
                warranties of any kind, either express or implied, whether in
                statute, at law or on any other basis.
                <br />
                17.4 As a User, the goods and services provided by a Client may
                also confer on you certain rights under the ACL.
                <br />
                17.5 This clause 19 will survive the termination or expiry of
                these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">18. Exclusions to liability </p>
              <p>
                18.1 Despite anything to the contrary, to the maximum extent
                permitted by law, we will not be liable for, and you waive and
                release us from and against, any Liability caused or contributed
                to by, arising from or connected with:  
                <br />
                (a) the use or results of any Third Party ID Service or Identity
                Check;
                <br />
                (b) any interaction between Users, Clients and/or Advertisers,
                including goods and services offered by the Client or
                Advertiser, the description of the goods and services requested
                or offered, any advice provided, the performance of the services
                or supply and delivery of the goods, solely to the extent that
                we are not involved in any such interaction;
                <br />
                (c) risk referred to in the Risk Disclosure Notice below; and
                <br />
                (d) any event outside of our reasonable control.
                <br />
                18.2 You agree to indemnify us for any Liability we incur due to
                your breach of the Acceptance and PlaySpark Platform Licence
                clause (clause 3), the Confidentiality clause (clause 26.3) and
                the Intellectual Property clause (clause 15) of these Terms.
                <br />
                18.3 We agree to indemnify you for any Liability you incur due
                to our breach of the Confidentiality clause (clause 26.3) and
                the Intellectual Property (clause 15) clause of these Terms.
                <br />
                18.4 This clause 20 will survive the termination or expiry of
                these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">19. Risk Disclosure Notice</p>
              <p>
                19.1 Despite our best efforts, there are risks associated with
                our offering, which include:
                <br />
                (a) Software risk – While we will use our best efforts and
                develop our software with high security standards, we do not
                warrant or represent that the Tokens, the PlaySpark Platform or
                any related software are secure or safe, or protected from
                fishing, malware or other malicious attacks. Further, the
                Tokens, the PlaySpark Platform and related software may contain
                weaknesses, bugs, vulnerabilities, viruses or other defects
                which may have a material adverse effect on the operation of the
                Tokens, the PlaySpark Platform or any such related software or
                may lead to losses and damages for you;
                <br />
                (b) Legal uncertainty - Our intended activities, as set out in
                these Terms, are subject to Australian laws and regulations. We
                might be obliged to obtain different licenses or other
                permissive documents in Australia and, accordingly, our business
                in Australia shall always be subject to obtaining licenses or
                permissive documents, if so directed by applicable laws or
                government agencies. Despite our best efforts and seeking legal
                advice, there is a risk that certain activities may be deemed in
                violation of any existing or new laws or regulations. Penalties
                for any such potential violation would be unknown. Additionally,
                changes in applicable laws or regulations or evolving
                interpretations of existing law may result in increased
                compliance costs which may affect our ability to perform our
                business operations.
                <br />
                (c) Platform availability - Whilst we agree to use our best
                endeavours to make the Platform available at all times, from
                time to time we may perform reasonable scheduled and emergency
                maintenance, and the Platform may be unavailable during the
                times we are performing such maintenance. You further
                acknowledge and agree that the Platform may be reliant on, or
                interface with third party systems that are not provided by us
                (for example, internet providers) (Third Party Services), and
                the Platform may be unavailable due to a failure of the Third
                Party Services.
              </p>
            </div>
            <div>
              <p className="font-bold">20. Limitations on liability</p>
              <p>
                20.1 To the maximum extent permitted by law:  
                <br />
                (a) neither Party will be liable for Consequential Loss; 
                <br />
                (b) each Party’s liability for any Liability under these Terms
                will be reduced proportionately to the extent the relevant
                Liability was caused or contributed to by the acts or omissions
                of the other Party or any of that Party’s personnel, including
                any failure by that party to mitigate its losses; and
                <br />
                (c) our aggregate liability for any Liability arising from or in
                connection with these Terms will be limited to $20,000.  
                <br />
                20.2 The limitation of liability in clause 22.1(c) does not
                apply to our liability to you under clause 20.3.
                <br />
                20.3 This clause 22 will survive the termination or expiry of
                these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">21. Termination</p>
              <p>
                21.1 If you are a Client, Your Account and these Terms may be
                terminated by you at any time, using the ‘cancel Account’
                functionality (or similar) in the Account page section of your
                Account settings. 
                <br />
                21.2 If you are a Advertiser, your Account and these Terms may
                be terminated by you, at any time, using the ‘cancel Account’
                functionality (or similar) in the Account page section of your
                Account settings or via email. 
                <br />
                21.3 If you are a User, these Terms may be terminated by you at
                any time by you, at any time, by ceasing to use the PlaySpark
                Platform.
                <br />
                21.4 We may terminate these Terms at any time by giving 30 days’
                written notice to you. You If you are a Client or Advertiser,
                you may terminate these Terms at any time by giving 30 days’
                written notice to us. If you are a User, you may terminate these
                Terms at any time. (Termination for Convenience). 
                <br />
                21.5 These Terms will terminate immediately upon written notice
                by a Party (Non-Defaulting Party) if:
                <br />
                (a) the other Party (Defaulting Party) breaches a material term
                of these Terms and that breach has not been remedied within 10
                Business Days of the Defaulting Party being notified of the
                breach by the Non-Defaulting Party; or
                <br />
                (b) the Defaulting Party is unable to pay its debts as they fall
                due.
                <br />
                21.6 If you are in breach of these Terms, we may suspend your
                Account while we investigate the suspected breach. 
                <br />
                21.7 Upon expiry or termination of these Terms:
                <br />
                (a) we will remove your access to the PlaySpark Platform and
                cease using any of your Intellectual Property;
                <br />
                (b) we will immediately cease providing the SportzUserArcade
                Games Services;
                <br />
                (c) you agree that other than where termination is due to our
                Termination for Convenience or we have breached a material term
                under clause 23.5(a) or clause 9.7 applies and to the maximum
                extent permitted by law, any payments made by you to us
                (including any Membership Fees and Service Fees) are not
                refundable to you;
                <br />
                (d) where you are a User, we will cancel any existing Confirmed
                Purchases, any payments made by you to us (including Service
                Fees) are not refundable to you, any payments made by you to a
                Client or Advertiser using Token Fees are not refundable to you
                and you will lose any Tokens held by youFees and other amounts
                paid other than where termination is due to our Termination for
                Conveniences; 
                <br />
                (e) where you are a Client, we will cancel any existing
                Confirmed Purchases and refund the relevant Users in accordance
                with clause 1211; 
                <br />
                (f) where you are a Client and you terminate these Terms by
                exercising your Termination for Convenience right, you
                acknowledge and agree that unless clause 9.7 applies, you are
                liable to pay the annual Membership Fees in full for the Initial
                Term and each Renewal Term that you enter into under clause 9.5
                for the remainder of the year of your Membership in which you
                terminate these Terms (i.e. not the calendar year) (and such
                payment will be required immediately at the time of early
                termination), or if you have paid the annual Membership Fees in
                advance, you acknowledge and agree that such annual Membership
                Fees are non-refundable to you; and
                <br />
                (g) where we terminate the Terms for any reason other than a
                Termination for Convenience, you also agree to pay us our
                reasonable additional costs directly arising from such
                termination (including legal fees, debt collector fees and
                mercantile agent fees).
                <br />
                21.8 Termination of these Terms will not affect any rights or
                liabilities that a Party has accrued under it.  
                <br />
                21.9 This clause 23 will survive the termination or expiry of
                these Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">22. Client / Advertiser insurance </p>
              <p>
                22.1 As a Client or Advertiser, we may request that you provide
                evidence of your insurance. Where we do so, we are not
                confirming that the insurance you have is sufficient or suitable
                for the goods and services you choose to provide to Users. If we
                do not ask you to provide evidence of insurance this does not
                indicate that we believe you do not require insurance. You
                acknowledge and agree it is your responsibility to make your own
                investigations and receive professional advice on the insurance
                you require.
              </p>
            </div>
            <div>
              <p className="font-bold">23. Notice regarding Apple </p>
              <p>
                23.1 To the extent that you are using or accessing our PlaySpark
                Platform on an iOS device, you further acknowledge and agree to
                the terms of this clause 25. You acknowledge that these Terms
                are between you and us only, not with Apple Inc. (Apple), and
                Apple is not responsible for the PlaySpark Platform and any
                content available on the PlaySpark Platform. 
                <br />
                23.2 Apple has no obligation to furnish you with any maintenance
                and support services with respect to our PlaySpark Platform. 
                <br />
                23.3 If our mobile application fails to conform to any
                applicable warranty, you may notify Apple and Apple will refund
                the purchase price of the mobile application to you. To the
                maximum extent permitted by applicable law, Apple will have no
                other warranty obligation whatsoever with respect to the mobile
                application and any other claims, losses, liabilities, damages,
                costs or expenses attributable to any failure to conform to any
                warranty will be our responsibility.
                <br />
                23.4 Apple is not responsible for addressing any claims by you
                or any third party relating to our mobile application or your
                use of our mobile application, including but not limited to (1)
                product liability claims; (2) any claim that our mobile
                application fails to conform to any applicable legal or
                regulatory requirement; and (3) claims arising under consumer
                protection or similar legislation.
                <br />
                23.5 Apple is not responsible for the investigation, defence,
                settlement and discharge of any third-party claim that our
                mobile application infringes that third party’s intellectual
                property rights. 
                <br />
                23.6 You agree to comply with any applicable third-party terms
                when using our mobile application, including any Usage Rules set
                forth in the Apple App Store Agreement of Service. 
                <br />
                23.7 Apple and Apple’s subsidiaries are third-party
                beneficiaries of these Terms, and upon your acceptance of these
                Terms, Apple will have the right (and will be deemed to have
                accepted the right) to enforce these Terms against you as a
                third-party beneficiary of these Terms.
                <br />
                23.8 You hereby represent and warrant that (1) you are not
                located in a country that is subject to a U.S. Government
                embargo, or that has been designated by the U.S. Government as a
                "terrorist supporting" country; and (2) you are not listed on
                any U.S. Government list of prohibited or restricted parties.
              </p>
            </div>
            <div>
              <p className="font-bold">24. General</p>
              <p>
                24.1 Assignment: Subject to the below clause 26.2, a Party must
                not assign or deal with the whole or any part of its rights or
                obligations under these Terms without the prior written consent
                of the other Party (such consent is not to be unreasonably
                withheld). 
                <br />
                24.2 Assignment of Debt: You agree that we may assign or
                transfer any debt owed by you to us, arising under or in
                connection with these Terms, to a debt collector, debt
                collection agency, or other third party. 
                <br />
                24.3 Confidentiality: Other than where the disclosure is
                permitted by law, each Party agrees not to disclose any
                confidential information it may access on or through the
                PlaySpark Platform to a third party (excluding any legal
                advisers and subject to the same obligation of confidentiality),
                or otherwise misuse such confidential information. Confidential
                information may include confidential information supplied to you
                by us, by a User, or by a Client or Advertiser. 
                <br />
                24.4 Disputes:  In relation to a dispute, controversy or claim
                arising from, or in connection with, these Terms (including any
                question regarding its existence, validity or termination)
                (Dispute) between a User and us, or a Client and us, a Party may
                not commence court proceedings relating to a Dispute without
                first meeting with a senior representative of the other Party to
                seek (in good faith) to resolve the Dispute. If the Parties
                cannot agree how to resolve the Dispute at that initial meeting,
                either Party may refer the matter to a mediator. If the Parties
                cannot agree on who the mediator should be, either Party may ask
                the Law Institute of Victoria to appoint a mediator. The
                mediator will decide the time, place and rules for mediation.
                The Parties agree to attend the mediation in good faith, to seek
                to resolve the Dispute. The costs of the mediation will be
                shared equally between the Parties. Nothing in this clause 26.4
                will operate to prevent a Party from seeking urgent injunctive
                or equitable relief from a court of appropriate jurisdiction. 
                <br />
                24.5 Entire Terms: Subject to your Consumer Law Rights, these
                Terms (and any special conditions entered into between the
                Parties) contain the entire understanding between the Parties
                and the Parties agree that no representation or statement has
                been made to, or relied upon by, either of the Parties, except
                as expressly stipulated in these Terms, and these Terms
                supersedes all previous discussions, communications,
                negotiations, understandings, representations, warranties,
                commitments and agreements, in respect of its subject matter.
                <br />
                24.6 Further assurance: Each Party must promptly do all things
                and execute all further instruments necessary to give full force
                and effect to these Terms and their obligations under it.
                <br />
                24.7 Governing law: This Agreement is governed by the laws of
                Victoria.  Each Party irrevocably and unconditionally submits to
                the exclusive jurisdiction of the courts operating in Victoria
                and any courts entitled to hear appeals from those courts and
                waives any right to object to proceedings being brought in those
                courts.  
                <br />
                24.8 Notices: Any notice given under these Terms must be in
                writing addressed to us at the details set out below or to you
                at the details provided in your Account. Any notice may be sent
                by standard post or email, and will be deemed to have been
                served on the expiry of 48 hours in the case of post, or at the
                time of transmission in the case of transmission by email.
                <br />
                24.9 Privacy: Each Party agrees to comply with the legal
                requirements of the Australian Privacy Principles as set out in
                the Privacy Act 1988 (Cth) and any other applicable legislation
                or privacy guidelines. We will deal with your Personal
                Information (as defined in the Privacy Act) in accordance with
                our Privacy Policy, which can be found on the Platform.
                <br />
                24.10 Publicity: With your prior written consent, you agree that
                we may advertise or publicise the broad nature of our supply of
                the SportzUserArcade Games Services to you, including on our
                website or in our promotional material.
                <br />
                24.11 Relationship of Parties: These Terms are not intended to
                create a partnership, joint venture, employment or agency
                subject to us acting as your limited payment agent) relationship
                between the Parties.
                <br />
                24.12 Severance: If a provision of these Terms is held to be
                void, invalid, illegal or unenforceable, that provision is to be
                read down as narrowly as necessary to allow it to be valid or
                enforceable, failing which, that provision (or that part of that
                provision) will be severed from these Terms without affecting
                the validity or enforceability of the remainder of that
                provision or the other provisions in these Terms.
                <br />
                24.13 Third party sites: The PlaySpark Platform may contain
                links to websites operated by third parties. Unless we tell you
                otherwise, we do not control, endorse or approve, and are not
                responsible for, the content on those websites. We recommend
                that you make your own investigations with respect to the
                suitability of those websites. If you purchase goods or services
                from a third party website linked from the PlaySpark Platform,
                such third party provides the goods and services to you, not us.
                We may receive a benefit (which may include a referral fee or a
                commission) should you visit certain third-party websites via a
                link on the PlaySpark Platform (Affiliate Link) or for featuring
                certain products or services on the PlaySpark Platform. We will
                make it clear by notice to you which (if any) products or
                services we receive a benefit to feature on the PlaySpark
                Platform, or which (if any) third party links are Affiliate
                Links.
                <br />
                24.14 Trust provisions: Each Party described in these Terms as a
                trustee (Trustee) enters into these Terms only in its capacity
                as a trustee of the trust of which it is described as the
                Trustee (Trust). Subject to the following sentence, and despite
                any other provision of these Terms, a Liability arising under or
                in connection with these Terms is limited and can be enforced
                against a Trustee only to the extent to which the Trustee is
                indemnified out of the assets of the Trust. The limitation set
                out in the previous sentence does not apply where the Trustee’s
                right to indemnification is reduced or lost as a result of
                fraud, breach of trust or breach of duty by the Trustee. This
                clause 26.14 will survive the termination or expiry of these
                Terms.
              </p>
            </div>
            <div>
              <p className="font-bold">25. Definitions</p>
              <p>
                25.1 Consequential Loss includes any consequential loss,
                indirect loss, real or anticipated loss of profit, loss of
                benefit, loss of revenue, loss of business, loss of goodwill,
                loss of opportunity, loss of savings, loss of reputation, loss
                of use and/or loss or corruption of data, whether under statute,
                contract, equity, tort (including negligence), indemnity or
                otherwise.
                <br />
                25.2 Intellectual Property means any copyright, registered or
                unregistered designs, patents or trade marks, domain names,
                know-how, inventions, processes, trade secrets or confidential
                information; or circuit layouts, software, computer programs,
                databases or source codes, including any application, or right
                to apply, for registration of, and any improvements,
                enhancements or modifications of, the foregoing.
                <br />
                25.3 Intellectual Property Rights means for the duration of the
                rights in any part of the world, any industrial or intellectual
                property rights, whether registrable or not, including in
                respect of Intellectual Property. 
                <br />
                25.4 Intellectual Property Breach means any breach by a Party
                (or any of that Party’s personnel) of any of the other Party’s
                Intellectual Property Rights (or any breaches of third party
                rights including any Intellectual Property Rights of third
                parties).
                <br />
                25.5 Liability means any expense, cost, liability, loss, damage,
                claim, notice, entitlement, investigation, demand, proceeding or
                judgment (whether under statute, contract, equity, tort
                (including negligence), indemnity or otherwise), howsoever
                arising, whether direct or indirect and/or whether present,
                unascertained, future or contingent and whether involving a
                third party or a party to these Terms or otherwise.
              </p>
            </div>
            <div>
              For any questions or notices, please contact us at: Spark Up Group
              Pty Ltd ABN 94 653 903 916 Email: luke@playspark.co Last update:
              10 October 2024
            </div>
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
