import { ContactForm } from '@components/contact-elements/contact-form';
import Link from 'next/link';

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
        I&apos;m a creative person. Messes, experiments, problems, toys. All
        solutions in waiting.
      </p>
      <p>
        Languages are a hobby. Human languages today. Sporatic dives into
        computer languages. I&apos;m always toying with the idea of writing a
        language, just to understand computing better.
      </p>
    </section>
    <section>
      <p>I&apos;m also an occassionally practicing artist...</p>
      <Link href="https://kathrinayer.com">Drawing site</Link>
    </section>
    <section>
      <ContactForm />
    </section>
  </main>
);

export default Context;
