import { useRef } from "react";
import { projectData } from "../libs/data";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

type ProjectProps = (typeof projectData)[number];

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <a href="#" target="_blank">
        <section
          className={
            "max-w-[52rem] border rounded-lg overflow-hidden relative sm:h-[20rem] transition hover:bg-zinc-100  dark:hover:bg-darkOcean"
          }
        >
          <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem] text-black">
            <Reveal>
              <h3 className="text-2xl font-semibold uppercase"> {title}</h3>
            </Reveal>
            <p className="mt-2 leading-relaxed">{description}</p>
            <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
              {tags.map((tag, index) => (
                <li
                  className="text-black bg-[#ffcbb4] px-3 py-1 text-[0.7rem] uppercase tracking-wider rounded-full"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <img
            src={imageUrl}
            alt="Project I worked on"
            className={`absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg ${
              title.toLowerCase() === "filedrive" ? "" : "shadow-2xl"
            }
          transition 
          group-hover:scale-[1.04]
          group-hover:-translate-x-3
          group-hover:translate-y-3
          group-hover:-rotate-2
          
          group-even:group-hover:translate-x-3
          group-even:group-hover:translate-y-3
          group-even:group-hover:rotate-2
          
          group-even:right-[initial] group-even:-left-40`}
          />
        </section>
      </a>
    </motion.div>
  );
}
