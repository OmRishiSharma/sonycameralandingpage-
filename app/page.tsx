import IntroCurtain from "@/components/IntroCurtain";
import Navigation from "@/components/Navigation";
import CameraScroll from "@/components/CameraScroll";
import BrandStatement from "@/components/BrandStatement";
import ImagingTechnology from "@/components/ImagingTechnology";
import OpticalEngineering from "@/components/OpticalEngineering";
import AutofocusPerformance from "@/components/AutofocusPerformance";
import PhotographyShowcase from "@/components/PhotographyShowcase";
import CreatorsSection from "@/components/CreatorsSection";
import Specifications from "@/components/Specifications";
import ClosingSection from "@/components/ClosingSection";

export default function Page() {
  return (
    <>
      <a href="#camera-track" className="skip-link">
        Skip to main content
      </a>
      <IntroCurtain />
      <Navigation />
      <main>
        <CameraScroll />
        <BrandStatement />
        <ImagingTechnology />
        <OpticalEngineering />
        <AutofocusPerformance />
        <PhotographyShowcase />
        <CreatorsSection />
        <Specifications />
        <ClosingSection />
      </main>
    </>
  );
}
