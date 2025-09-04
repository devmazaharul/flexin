import { Ripples } from "ldrs/react";
import "ldrs/react/Ripples.css";

type LoaderColor = "white" | "black" | "green" | "yellow";
type LoaderSize = "20" | "25" | "30" | "35" | "40" | "45" | "50" | "55" | "60";

export const Loader: React.FC<{ color?: LoaderColor; size?: LoaderSize }> = ({
  color = "black",
  size = "45",
}) => (
  <Ripples 
    size={size}   
    speed="2"
    color={color}
  />
);
