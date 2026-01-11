import { useMemo } from "react";

const Footer = () => {
  const isMobile = useMemo(
    () => window.matchMedia("(max-width: 768px)").matches,
    []
  );

  return (
    <>
      <div className="relative w-full z-0">
        <div className="relative min-h-[0rem] bg-[rgb(255,183,164)]">
          <div className="absolute top-0 left-0 right-0 h-3 bg-[rgb(255,183,164)] filter-goo">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="bubble"
                style={{
                  "--size": `${2 + Math.random() * (isMobile ? 1 : 4)}rem`,
                  "--distance": `${6 + Math.random() * 100}rem`,
                  "--position": `${Math.random() * 100}%`,
                  "--time": `${2 + Math.random() * 5}s`,
                  "--delay": `${-Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <svg className="fixed top-[100vh]">
        <defs>
          <filter id="blob">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 19 -9"
              result="blob"
            />
            <feComposite in="SourceGraphic" in2="blob" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Footer;
