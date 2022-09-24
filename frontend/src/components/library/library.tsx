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

export const Library = () => {
  const [cards, setCards] = useState<MTGCard[]>([]);

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
