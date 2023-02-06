const baseColors = [
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
];
const shades = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
];
const withShades = [...baseColors.map((color) => {
    return shades.map((shade) => {
        return `${color}-${shade}`;
    });
}), ["transparent", "white", "black"]]

export default function ColorCard({setColor}: { setColor: (color: string) => void }) {
    return (
        <div className="grid grid-cols-1 gap-2">
            {withShades.map((color) => {
                return (
                    <div className="grid grid-cols-10"
                         key={color[0]}
                    >
                        {color.map((shade) => {
                            return (
                                <div
                                    key={shade}
                                    className={`bg-${shade} w-8 h-8 border-2 border-gray-500 ${shade === "transparent" ? "border-dashed" : ""}`}
                                    onClick={() => setColor(shade)}
                                />
                            );
                        })}
                    </div>
                );
            })
            }
        </div>
    )
}