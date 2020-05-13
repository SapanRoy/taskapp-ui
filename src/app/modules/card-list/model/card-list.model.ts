export class CardListModel {
   public lists: Array<List>;
}

export class List {
    id: string;
    name: string;
    cards: Array<Card>;
}

export class Card {
    id: string;
    name: string;
}