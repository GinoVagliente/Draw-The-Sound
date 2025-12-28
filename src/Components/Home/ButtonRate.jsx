const ButtonRate = () => {
    return (
        <div className="flex flex-col items-center m-5 relative group">
            <div className="absolute top-2 right-1 w-full h-full rounded-2xl bg-[#7a4b2e] opacity-20 z-0 transition-transform duration-200 group-hover:scale-105 group-hover:opacity-40"></div>

            <a href="/Rate" className="transition-transform duration-200 group-hover:scale-105 relative z-10 
                rounded-2xl bg-[#7a4b2e]
                px-4 py-5 text-2xl text-[#FFC19E] [font-family:'Short_Stack',sans-serif] text-center">
                See how others feel music
            </a>
        </div>
    );
};

export default ButtonRate;
