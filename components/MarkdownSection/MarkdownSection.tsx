"use client";
import { marked } from "marked";
import { useEffect, useState } from "react";

const markdown = `
**Chris Joslin**, one of the most legendary skateboarders ever, once tried a 360 flip down the infamous El Toro 20 stair and was defeated. He said he wouldn’t try it again.

Years later, he came back stronger, and finally got his revenge. He landed the trick, earned the cover of Thrasher Magazine, and his kids got to watch him make history.

This coin, **$CJET**, is a tribute to that moment and to the biggest 360 flip ever landed.

The goal is simple: help skateboarders discover cryptocurrency, have fun, and maybe make build a community along the way.

**$CJET** was created by **[Shrimpdaddy](https://www.instagram.com/shrimpdaddy/)**, a skateboarder and content creator. He is holding his bag and is not selling.

Good luck to everyone who gets involved.
`;

export default function MarkdownSection() {
  const [rawHtml, setRawHtml] = useState("");
  const [visibleHtml, setVisibleHtml] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const parseMarkdown = async () => {
      const result = await Promise.resolve(marked(markdown));
      const processed = result.replace(
        /<p>/g,
        '<p class="my-custom-class prose-lg text-left dark:prose-invert mb-4">'
      );
      setRawHtml(processed);
    };
    parseMarkdown();

    // Detect mobile (screen < 768px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setVisibleHtml(rawHtml);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i++;
      const partial = rawHtml.slice(0, i);
      const openTag = partial.lastIndexOf("<");
      const closeTag = partial.lastIndexOf(">");
      if (openTag === -1 || openTag < closeTag) {
        setVisibleHtml(partial);
      }
      if (i >= rawHtml.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [rawHtml, isMobile]);

  return (
    <div className="prose prose-lg dark:prose-invert mb-8 text-left text-white flex flex-col items-start justify-start md:justify-center h-full">
      <div dangerouslySetInnerHTML={{ __html: visibleHtml }} />
    </div>
  );
}
