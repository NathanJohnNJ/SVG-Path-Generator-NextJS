'use client';
import { CommandStyledPanel } from "./Panel";
import { RainbowButton } from "./RainbowPanel";
import { StyleSheet, View, Text, Pressable } from 'react-native-web';
import Link from "next/link";

const CommandPanel = (props) => {
  return (
    <CommandStyledPanel>
      <RainbowButton>
        <Link
        href='addCommand'
        className="rounded-lg border border-transparent transition-colors text-center text-base"
        >
          Add
        </Link>
      </RainbowButton>
      <RainbowButton>
        <Link
        href='changeCommand'
        className="rounded-lg border border-transparent transition-colors text-center text-base"
        >
          Change
        </Link>
      </RainbowButton>
      <RainbowButton>
        <Link
        href='editCommand'
        className="rounded-lg border border-transparent transition-colors text-center text-base"
        >
          Edit
        </Link>
      </RainbowButton>
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