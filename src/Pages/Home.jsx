import { useState } from "react";
import Title from "../Components/Home/Title";
import Entry from "../Components/Home/Entry";
import ButtonRate from "../Components/Home/ButtonRate";
import ProjectDisclaimerModal from "../Components/Home/ProjectDisclaimerModal";
import Footer from "../Components/Footer";

const Home = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[rgb(250,219,197)] to-[rgb(255,147,123)] overflow-hidden">
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden md:px-20">
        <Title startAnimation={startAnimation} />
        <Entry />
        <ButtonRate />
        <ProjectDisclaimerModal
          onAccept={() => setStartAnimation(true)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
