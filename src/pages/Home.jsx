import { useSeo } from "../hooks/useSeo";
import Hero from "../components/home/Hero";
import TrustBar from "../components/home/TrustBar";
import LuckyDrawPromo from "../components/home/LuckyDrawPromo";
import DestinationsSection from "../components/home/DestinationsSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ServicesSection from "../components/home/ServicesSection";
import StatsStrip from "../components/home/StatsStrip";
import JourneyTimeline from "../components/home/JourneyTimeline";
import Estimator from "../components/home/Estimator";
import Testimonials from "../components/home/Testimonials";
import Faq from "../components/home/Faq";
import ContactCta from "../components/home/ContactCta";

export default function Home() {
  useSeo({
    title: "Study Abroad Consultants in Kerala",
    description: "Free counselling, university selection, admissions, visa support and post-arrival help for studying in the UK, Canada, Australia, USA, Ireland, Germany and New Zealand.",
  });
  return (
    <>
      <Hero />
      <TrustBar />
      <LuckyDrawPromo />
      <DestinationsSection />
      <WhyChooseUs />
      <ServicesSection />
      <StatsStrip />
      <JourneyTimeline />
      <Estimator />
      <Testimonials />
      <Faq />
      <ContactCta />
    </>
  );
}
