import React from "react";

function pointsToString(points) {
    return points.map(p => `${p.x},${p.y}`).join(" ");
}

function radarPoints(cx, cy, r, values) {
    const n = values.length;
    return values.map((v, i) => {
        const angle = (-Math.PI / 2) + (2 * Math.PI * i) / n;
        return {
            x: cx + Math.cos(angle) * r * v,
            y: cy + Math.sin(angle) * r * v,
        };
    });
}

function gridPolygon(cx, cy, r, n) {
    return Array.from({ length: n }).map((_, i) => {
        const angle = (-Math.PI / 2) + (2 * Math.PI * i) / n;
        return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
    });
}

export default function RadarCard() {
    const labels = ["速度", "声量", "目線", "表情", "文法"];
    const values = [1, 0.7, 0.8, 0.6, 0.75];

    const size = 320;
    const cx = size / 2;
    const cy = size / 2;
    const r = 110;

    // Label တွေ Chart နဲ့ မကပ်နေအောင် ၃၀ လောက် ထပ်ပေါင်းထည့်လိုက်ပါတယ်
    const labelRadius = r + 25;

    const dataPts = radarPoints(cx, cy, r, values);
    const outer = gridPolygon(cx, cy, r, labels.length);

    const levels = [0.25, 0.5, 0.75, 1].map(k =>
        gridPolygon(cx, cy, r * k, labels.length)
    );

    return (
        <>
            <div className="w-full flex justify-center mt-10">
                <div className="rounded-2xl bg-white/90 backdrop-blur-md border border-gray-100 p-6 shadow-lg">
                    <svg width={size} height={size} className="block overflow-visible">
                        {/* overflow-visible ထည့်ထားမှ စာတွေ ဘောင်ကျော်ရင် မပြတ်သွားမှာပါ */}

                        {/* grid */}
                        {levels.map((poly, idx) => (
                            <polygon
                                key={idx}
                                points={pointsToString(poly)}
                                fill="none"
                                stroke="currentColor"
                                className="text-gray-300"
                                strokeWidth="1"
                            />
                        ))}

                        {/* axes */}
                        {outer.map((p, i) => (
                            <line
                                key={i}
                                x1={cx}
                                y1={cy}
                                x2={p.x}
                                y2={p.y}
                                stroke="currentColor"
                                className="text-gray-300"
                                strokeWidth="1"
                            />
                        ))}

                        {/* data area */}
                        <polygon
                            points={pointsToString(dataPts)}
                            fill="currentColor"
                            className="text-emerald-400/30"
                            stroke="currentColor"
                            strokeWidth="2"
                        />

                        {/* data points */}
                        {dataPts.map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r="4" className="fill-emerald-500" />
                        ))}

                        {/* labels - Modified Section */}
                        {labels.map((label, i) => {
                            // Label တစ်ခုချင်းစီအတွက် Angle ကိုပြန်တွက်ပြီး နေရာချပါတယ်
                            const angle = (-Math.PI / 2) + (2 * Math.PI * i) / labels.length;
                            const x = cx + Math.cos(angle) * labelRadius;
                            const y = cy + Math.sin(angle) * labelRadius;

                            return (
                                <text
                                    key={i}
                                    x={x}
                                    y={y}
                                    className="fill-gray-600 text-[14px] font-medium"
                                    textAnchor="middle"       // ဘယ်ညာ အလယ်တည့်တည့်ဖြစ်အောင်
                                    dominantBaseline="middle" // အပေါ်အောက် အလယ်တည့်တည့်ဖြစ်အောင်
                                >
                                    {label}
                                </text>
                            );
                        })}
                    </svg>
                </div>
            </div>
        </>
    );
}