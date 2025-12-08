import { useState } from "react";
import Title from "../Components/Home/Title";
import Entry from "../Components/Home/Entry";
import ButtonRate from "../Components/Home/ButtonRate";
import ProjectDisclaimerModal from "../Components/Home/ProjectDisclaimerModal";

const Home = () => {
  const [startAnimation, setStartAnimation] = useState(false);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-[rgb(255,213,183)] to-[rgb(255,147,123)] flex flex-col items-center justify-center md:pl-20 md:pr-20">
      <Title startAnimation={startAnimation} />
      <Entry />
      <ButtonRate />

      {/* Modal */}
      <ProjectDisclaimerModal
        onAccept={() => setStartAnimation(true)}
      />
    </div>
  );
};

export default Home;
