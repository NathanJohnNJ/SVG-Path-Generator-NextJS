import Link from "next/link";
import { RainbowPanel } from '@/components/ui/panels/RainbowPanel';
import '@/styles/globals.css';



export default async function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-start h-screen">
      
      <div id="main" className="flex w-min md:w-10/12 h-fit md:mt-16 items-center md:pl-28 md:ml-10">
        <div className="flex mr-4 w-fit h-fit min-w-40">
          <RainbowPanel>
            <Link
              href='/path/newPath'
              className="group rounded-lg transition-colors text-left"
            >
              <h2 className="pt-2 mb-3 text-xl font-bold font-sans translate-y-2">
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
            href="/path/editPath"
            className="group rounded-lg transition-colors text-left"
          >
            <h2 className="mb-3 text-xl font-bold font-sans pt-2 translate-y-4">
              Edit{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50 translate-y-2">
              Edit an existing path by pasting in your code and changing each command individually.
            </p>
          </Link>
        </RainbowPanel>
        </div>
        <div className="flex mr-2 ml-3 w-fit h-fit min-w-40">
        <RainbowPanel>
          <Link
            href='https://developer.mozilla.org/en-US/docs/Web/SVG'
            className="group rounded-lg transition-colors text-left"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-bold font-sans pt-2 translate-y-2">
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
            className="group rounded-lg transition-colors text-left"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-xl font-bold font-sans pt-2 translate-y-3">
              NJTD{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50 translate-y-2">
              Check out the rest of my portfolio on my website <span className="siteLink">www.njtd.xyz</span>
            </p>
          </Link>
        </RainbowPanel>
        </div>
      </div>  
    </main>   
  );
}