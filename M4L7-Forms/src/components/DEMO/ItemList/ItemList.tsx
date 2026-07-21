interface Item {
    id: number;
    text: string;
}

const items: Item[] = [
    { id: 1, text: "Aprender React" },
    { id: 2, text: "Dominar TypeScript" },
    { id: 3, text: "Deployar en Vercel" },
];


function ItemList() {
    return <ul>
        {items.map((item) => <li key={item.id}>{item.text}</li>)}
    </ul>
}

export default ItemList