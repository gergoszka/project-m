import { MTGCard } from "../library/library";
import { useState } from "react";

import "./card.css";

interface CardProps {
  card: MTGCard;
}

export const Card = ({ card }: CardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const HoverText = () => {
    return (
      <div className="hover-img">
        <img src={card.image_uris.normal} alt={card.name} />
      </div>
    );
  };
  return (
    <>
      <li
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        className="mtg-card"
      >
        <div className="card-item">
          <span>{card.count}</span>
          <span className="card-name">{card.name}</span>
        </div>
      </li>
      {isHovering && <HoverText />}
    </>
  );
};
