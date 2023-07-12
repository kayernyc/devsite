import { ContactForm } from '@/components/contact-elements/contact-form';
import Link from 'next/link';

const Context = () => (
  <main>
    <h1>Context</h1>
    <section>
      <h2>This site:</h2>
      <p>It's a hub for my learnings, thoughts, and engineering projects.</p>
      <p>
        Currently I'm building funnels into this site, as I'm also building the
        site, so it's sparse and evolving.
      </p>
      <h2>About me:</h2>
      <p>
        I'm a creative person. Messes, experiments, problems, toys. All
        solutions in waiting.
      </p>
      <p>
        Languages are a hobby. Human languages today. Sporatic dives into
        computer languages. I'm always toying with the idea of writing a
        language, just to understand computing better.
      </p>
      <p>future list of things</p>
    </section>
    <section>
      <p>I'm also an occassionally practicing artist...</p>
      <Link href="https://kathrinayer.com">Drawing site</Link>
    </section>
    <section>
      <ContactForm />
    </section>
  </main>
);

export default Context;
