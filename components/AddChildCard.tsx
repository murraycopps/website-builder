import { ComponentNode } from "@/scripts/types";
import { useState } from "react";

export default function AddCildCard({addChild}: {addChild: (child: string) => void}){
    const types = ["div", "h1", "h2", "p", "br", "button"];
    const [type, setType] = useState<string>("div");
    return (
        <div className="flex flex-col w-full h-full gap-4 p-4">
            <select onChange={(e) => setType(e.target.value)}>
                {types.map((type, i) => (
                    <option value={type} key={i}>{type}</option>
                ))}
            </select>
            <button onClick={() => addChild(type)}>Add</button>
        </div>
    )
   
}