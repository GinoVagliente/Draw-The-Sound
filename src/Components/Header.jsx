import { FaGithub, FaHome, FaLinkedin, FaFolder } from "react-icons/fa";

const Header = () => {
    const links = [
        {
            title: "DrawTheSound",
            icon: <FaHome className="h-8 w-8 text-neutral-700" />,
            href: "/",
            newTab: false,
        },
        {
            title: "GitHub",
            icon: <FaGithub className="h-8 w-8 text-neutral-700" />,
            href: "https://github.com/GinoVagliente",
            newTab: true,
        },
        {
            title: "LinkedIn",
            icon: <FaLinkedin className="h-8 w-8 text-neutral-700" />,
            href: "https://www.linkedin.com/in/gino-vagliente-734568337/",
            newTab: true,
        },
        {
            title: "Portfolio",
            icon: <FaFolder className="h-8 w-8 text-neutral-700" />,
            href: "https://gino-vagliente-portfolio.vercel.app/",
            newTab: true,
        },
    ];

    return (
        <div className="absolute w-full flex flex-row justify-center md:justify-end mt-5 gap-6 z-10 md:pr-5">
            {links.map((link) => (
                <a
                    key={link.title}
                    href={link.href}
                    target={link.newTab ? "_blank" : "_self"}
                    rel={link.newTab ? "noopener noreferrer" : undefined}
                    title={link.title}
                    className="flex flex-col transform transition-transform duration-200 hover:scale-125"
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default Header;
