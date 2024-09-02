'use client';
import { CommandStyledPanel } from "./Panels";
import { RainbowButton } from "./RainbowPanel";
import { StyleSheet } from 'react-native-web';
import Link from "next/link";

const CommandPanel = (props) => {
  return (
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
  )
};

export default CommandPanel;

const styles = StyleSheet.create({
  panel:{
    padding: 4,
    borderRadius: 18,
    boxShadow: '-2px 2px 8px #9c9c9c',
    margin: 10
  },

})