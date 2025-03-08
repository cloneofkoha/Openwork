"use client";

// Library import
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Components
import HomeComponent from "../pages-components/Home";
import Talks from "../pages-components/Talks";
import Blog from "../pages-components/Blog";
import Pay from "../pages-components/Pay";

interface Tabs {
  id: number;
  label: string;
  path: string;
}

const GeneralLayout = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "home";

  const tabs: Tabs[] = [
    {
      id: 0,
      label: `${tab === "talks" ? "home" : "talks"}`,
      path: `${tab === "talks" ? "/" : "/?tab=talks"} `,
    },
    {
      id: 1,
      label: `${tab === "blog" ? "Home" : "blog"}`,
      path: `${tab === "blog" ? "/" : "/?tab=blog"} `,
    },
    {
      id: 2,
      label: `${tab === "pay" ? "home" : "pay"}`,
      path: `${tab === "pay" ? "/" : "/?tab=pay"} `,
    },
  ];

  return (
    <div>
      {/* Nav */}
      <nav
        className="py-2 px-5 bg-secondary border border-border rounded-xl
       fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-5"
      >
        {tabs.map((tab, index) => (
          <Link key={index} href={tab.path} className="font-medium lowercase">
            {tab.label}
          </Link>
        ))}

        <div className="h-4 w-[2px] bg-border"></div>

        <Image
          src={`/play_icon.svg`}
          width={15}
          height={15}
          alt="Play icon"
          className="cursor-pointer"
        />
      </nav>

      {/* Main */}
      <div className="w-full px-5 lg:px-0 md:max-w-2xl 2xl:w-1/2 mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {tab === "home" && <HomeComponent />}
            {tab === "talks" && <Talks />}
            {tab === "blog" && <Blog />}
            {tab === "pay" && <Pay />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GeneralLayout;
