import Link from "next/link";
import { RainbowPanel } from '@/components/ui/panels/RainbowPanel';
import '@/styles/globals.css';



export default async function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-start h-screen">
      
      <div id="main" className="flex w-full h-fit mt-16 items-center ">
        <div className="flex mr-4 w-fit h-fit min-w-40">
          <RainbowPanel>
            <Link
              href='newPath'
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors text-left pl-0"
            >
              <h2 className="mb-3 text-xl font-semibold">
                Create{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </h2>
              <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
                Create a new SVG path. You can define your own starting point if you know it, or start with the default one.
              </p>
            </Link>
          </RainbowPanel>
        </div>
        <div className="flex mr-3 ml-2 w-fit h-fit min-w-40">
        <RainbowPanel>
          <Link
            href="/editPath"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Edit{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
              Edit an existing path by pasting in your code and changing each command individually.
            </p>
          </Link>
        </RainbowPanel>
        </div>
        <div className="flex mr-2 ml-3 w-fit h-fit min-w-40">
        <RainbowPanel>
          <Link
            href='https://developer.mozilla.org/en-US/docs/Web/SVG'
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              Help{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              View the help pages offered by MDN to understand the different commands used for an SVG path.
            </p>
          </Link>
        </RainbowPanel>
        </div>
        <div className="flex ml-4 w-fit h-fit min-w-40 min-h-48">
        <RainbowPanel>
          <Link
            href="https://www.njtd.xyz"
            className="group rounded-lg border border-transparent"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-semibold">
              NJTD{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Check out the rest of my portfolio on my website <span className="siteLink">www.njtd.xyz</span>
            </p>
          </Link>
        </RainbowPanel>
        </div>
      </div>  
    </main>   
  );
}