import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <div className='mx-5 sm:mx-10 p-5'>
      <h1 className='text-xl font-bold text-center mb-10'>Cookie Policy</h1>

      <p>Last Updated: 06/09/2024</p>

      <p>
        At E Floral Designs (“we”, “our”, “us”), we use cookies and similar
        tracking technologies to enhance your experience on our website. This
        Cookie Policy explains what cookies are, how we use them, and how you
        can control your cookie preferences.
      </p>

      <p className='font-bold'>1. What Are Cookies?</p>
      <p>
        Cookies are small text files that are placed on your device (computer,
        smartphone, or tablet) when you visit a website. They allow the website
        to recognize your device and store certain information about your
        preferences or past actions.
      </p>

      <p className='font-bold'>2. How We Use Cookies</p>
      <p>We use cookies for various purposes:</p>

      <p>
        Essential Cookies: These are necessary for the functioning of our
        website. They enable you to navigate the site and use features such as
        secure areas, shopping carts, and access to certain pages. Performance &
        Analytics Cookies: These cookies collect anonymous information about how
        visitors use our website. This helps us improve the way the website
        works and enhance the user experience. Functional Cookies: These cookies
        allow our website to remember choices you make, such as your language or
        region, to provide more personalized experiences. Marketing Cookies:
        These cookies track your online activity and allow us to display
        relevant advertising. They may also be used to limit the number of times
        you see an ad and help measure the effectiveness of advertising
        campaigns.
      </p>
      <p className='font-bold'>3. Types of Cookies We Use</p>
      <p>
        Session Cookies: Temporary cookies that are deleted once you close your
        browser.
      </p>
      <p>
        Persistent Cookies: These remain on your device until they expire or you
        delete them manually.
      </p>

      <p className='font-bold'>4. Third-Party Cookies</p>
      <p>
        In addition to our own cookies, we may use third-party cookies from
        trusted partners such as Google Analytics, Facebook, and other social
        media platforms to provide tracking, analytics, and advertising
        services. These third parties may use cookies to collect information
        about your activities on our website and other sites.
      </p>
      <p className='font-bold'>5. Your Cookie Preferences</p>
      <p>
        You have the option to manage your cookie preferences at any time. You
        can adjust your browser settings to block or delete cookies, but please
        note that this may affect the functionality and performance of our
        website.
      </p>

      <p>
        To learn more about controlling and managing cookies, visit{' '}
        <a href='https://www.allaboutcookies.org'>www.allaboutcookies.org.</a>
      </p>

      <p className='font-bold'>6. Updates to This Policy</p>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in
        our practices or for other operational, legal, or regulatory reasons.
        Please review this page periodically for the latest information on our
        cookie practices.
      </p>
      <p className='font-bold'>7. Contact Us</p>
      <p>
        If you have any questions about this Cookie Policy, please{' '}
        <Link href='/contact'>contact us</Link>
      </p>
    </div>
  );
}
