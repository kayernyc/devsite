import Link from 'next/link';

import { ContactForm } from '@components/contact-elements/contact-form';

const Context = () => (
  <main>
    <h1>Context</h1>
    <section>
      <h2>This site:</h2>
      <p>
        It&apos;s a hub for my learnings, thoughts, and engineering projects.
      </p>
      <p>
        Currently I&apos;m building funnels into this site, as I&apos;m also
        building the site, so it&apos;s sparse and evolving.
      </p>
      <h2>About me:</h2>
      <p>
        I&apos;m a creative person. I currently work for a great company helping
        new and small companies be great.
      </p>
      <p>
        Languages are a hobby. Human languages today. Sporatic dives into
        computer languages. I&apos;m always toying with the idea of writing a
        language, just to understand computing better. Or humans better. They
        end up being similar opportunities.
      </p>
    </section>
    <section>
      <p>I&apos;m also an occassionally practicing artist...</p>
      <Link className="link-style" href="https://kathrinayer.com">
        Drawing site
      </Link>
    </section>
    <br />
    <section>
      <ContactForm />
    </section>
    <p>
      <i className="rc-scout__logo"></i>
      <a
        className="rc-scout__link link-style"
        href="https://www.recurse.com/scout/click?t=b989d976a4bb7208d861570a04011f71"
      >
        Join the Recurse Center!
      </a>
    </p>
  </main>
);

export default Context;
