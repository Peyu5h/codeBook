import { useEffect } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/dist/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("cubic-text", "0.25, 1, 0.5, 1");

const TextRevealMultiple = ({ text }) => {
  useEffect(() => {
    const titles = document.querySelectorAll(".h_title");
    const tl = gsap.timeline({ defaults: { duration: 1 } });

    if (!text) return;

    text.forEach((line, index) => {
      const el = titles[index].querySelectorAll("span span");
      const delay = index * 1.5; // Adjust the delay for each line

      tl.to(
        el,
        {
          y: 0,
          duration: 1.5,
          ease: "cubic-text",
        },
        delay
      );
    });

    return () => {};
  }, [text]);

  return (
    <div className="">
      <div className="h_container">
        {text.map((line, index) => (
          <h1 className="h_title" key={index}>
            <span className="-mb-1.5 -mt-6 inline-block overflow-hidden align-bottom">
              <span className=" inline-block  translate-y-full pb-1.5 pt-6 will-change-transform ">
                {line}
              </span>
            </span>
          </h1>
        ))}
      </div>
    </div>
  );
};

export default TextRevealMultiple;
