import FollowUs from '../components/follow-us';
import ExternalLink from '../components/external-link';
import Link from 'next/link';

interface Link {
  alt: string;
  src: string;
  href: string;
}

const footerLogoClass = 'm-auto w-20 py-3 md:py-0 md:w-28';

const Footer = () => (
  <section className="px-2 md:px-8 bg-black divide-white divide-y">
    <div className="flex flex-col items-center justify-center py-6 md:py-8 space-y-3">
      <FollowUs />
      <ExternalLink
        href="https://forms.gle/aLCqMHYBGURh4cvJ8"
        className="text-white text-small-2 underline"
      >
        ส่งข้อเสนอแนะเพื่อปรับปรุงเว็บไซต์
      </ExternalLink>
    </div>
    <div className="grid grid-cols-3 py-6 md:py-12 w-full max-w-screen-xl mx-auto">
      <Link href="/" passHref>
        <a className={footerLogoClass}>
          <img
            src={require('../assets/images/CONLAB-White.png')}
            alt="CONLAB"
          />
        </a>
      </Link>
      <ExternalLink href="https://spp.cmu.ac.th/" className={footerLogoClass}>
        <img src={require('../assets/images/CMU-SPP.png')} alt="SPP" />
      </ExternalLink>
      <ExternalLink
        href="https://facebook.com/wevisdemo"
        className={footerLogoClass}
      >
        <img
          src={require('../assets/images/wevis.svg')}
          alt="Powered by Wevis"
        />
      </ExternalLink>
    </div>
  </section>
);

export default Footer;
