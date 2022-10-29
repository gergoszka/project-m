import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "../card/card";

import "./library.css";

export type MTGCard = {
  id: string;
  name: string;
  count: number;
  image_uris: { normal: string };
};

const DUMMY_CARDS: MTGCard[] = [
  {
    name: "Counterspell",
    id: "1",
    count: 2,
    image_uris: {
      normal:
        "https://c1.scryfall.com/file/scryfall-cards/normal/front/a/4/a457f404-ddf1-40fa-b0f0-23c8598533f4.jpg?1645328634",
    },
  },
  {
    name: "Fireball",
    id: "2",
    count: 4,
    image_uris: {
      normal:
        "https://c1.scryfall.com/file/scryfall-cards/normal/front/d/f/df45a43e-a5b7-4fd4-873b-7b3c021be198.jpg?1660726398",
    },
  },
  {
    name: "Red Dragon",
    id: "3",
    count: 1,
    image_uris: {
      normal:
        "https://c1.scryfall.com/file/scryfall-cards/normal/front/7/c/7cf57369-b8e2-481c-89d4-c83c617499a3.jpg?1627706749",
    },
  },
];

export const Library = () => {
  const [cards, setCards] = useState<MTGCard[]>(DUMMY_CARDS);

  const convertBackendCard = (card: any): MTGCard => {
    return {
      id: card.scryfall_id,
      name: card.name,
      count: card.count,
      image_uris: card.image_uris,
    };
  };

  useEffect(() => {
    axios.get("http://localhost:4040/cards").then((res: any) => {
      const cardData: Array<any> = res.data;

      console.log(cardData.map(convertBackendCard));
      setCards(cardData.map(convertBackendCard));
    });
  }, []);

  return (
    <main>
      <section className="card-container">
        <ul>
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </ul>
      </section>
    </main>
  );
};
