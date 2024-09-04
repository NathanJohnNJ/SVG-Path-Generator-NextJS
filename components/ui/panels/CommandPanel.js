'use client';
import { CommandStyledPanel } from "./Panels";
import { RainbowButton } from "./RainbowPanel";
import { StyleSheet } from 'react-native-web';
import Link from "next/link";

const CommandPanel = (props) => {
  return (
    <div className="-mt-12">
    <CommandStyledPanel>
      <RainbowButton>
        <Link
        href='/path/addCommand'
        className="rounded-lg border border-transparent transition-colors text-center text-base"
        >
          Add
        </Link>
      </RainbowButton>
     {props.selected &&
      <>
        <RainbowButton>
          <Link
          href='/path/changeCommand'
          className="rounded-lg border border-transparent transition-colors text-center text-base"
          >
            Change
          </Link>
        </RainbowButton>
        <RainbowButton>
          <Link
          href='/path/editCommand'
          className="rounded-lg border border-transparent transition-colors text-center text-base"
          >
            Edit
          </Link>
        </RainbowButton>
      </>}
    </CommandStyledPanel>
    </div>
  )
};

export default CommandPanel;
