import FollowUs from '../components/follow-us';
import ExternalLink from '../components/external-link';

interface Link {
  alt: string;
  src: string;
  href: string;
}
const links: Link[] = [
  {
    alt: 'CONLAB',
    src: require('../assets/images/logo-conlab.png'),
    href: '/',
  },
  {
    alt: 'SPP',
    src: require('../assets/images/SPP-CMU.svg'),
    href: 'https://spp.cmu.ac.th/',
  },
  {
    alt: 'KAS',
    src: require('../assets/images/KAS_Logo_White.png'),
    href: 'https://www.kas.de/th/web/thailand/',
  },
  {
    alt: 'ELECT',
    src: require('../assets/images/logo-elect.png'),
    href: 'https://elect.in.th/',
  },
];

const Footer = () => (
  <section className="py-12 px-2 space-y-6 md:px-8 md:py-20 md:space-y-8 bg-black divide-white divide-y">
    <div className="flex justify-center">
      <FollowUs />
    </div>
    <div className="grid grid-cols-2 py-6 md:py-12 md:grid-cols-4 w-full max-w-screen-xl mx-auto">
      {links.map(({ alt, src, href }, index) => (
        <ExternalLink
          {...{ href }}
          className="m-auto w-16 py-3 md:py-0 md:w-24"
          key={index}
        >
          <img {...{ src, alt }} />
        </ExternalLink>
      ))}
    </div>
  </section>
);

export default Footer;
