"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const FIPS_TO_ABBR: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA", "08": "CO",
  "09": "CT", "10": "DE", "11": "DC", "12": "FL", "13": "GA", "15": "HI",
  "16": "ID", "17": "IL", "18": "IN", "19": "IA", "20": "KS", "21": "KY",
  "22": "LA", "23": "ME", "24": "MD", "25": "MA", "26": "MI", "27": "MN",
  "28": "MS", "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND", "39": "OH",
  "40": "OK", "41": "OR", "42": "PA", "44": "RI", "45": "SC", "46": "SD",
  "47": "TN", "48": "TX", "49": "UT", "50": "VT", "51": "VA", "53": "WA",
  "54": "WV", "55": "WI", "56": "WY",
};

interface OperatingAreaMapProps {
  operatingStates: string[];
  headquartersStates?: string[];
}

export function OperatingAreaMap({
  operatingStates = [],
  headquartersStates = [],
}: OperatingAreaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const operatingSet = new Set(operatingStates.map((s) => s.toUpperCase()));
  const headquartersSet = new Set((headquartersStates ?? []).map((s) => s.toUpperCase()));

  const isHeadquarters = (fipsId: string) => {
    const abbr = FIPS_TO_ABBR[fipsId];
    return abbr ? headquartersSet.has(abbr) : false;
  };

  const isOperating = (fipsId: string) => {
    const abbr = FIPS_TO_ABBR[fipsId];
    return abbr ? operatingSet.has(abbr) : false;
  };

  return (
    <div>
      <div className="w-full overflow-hidden rounded-xl border border-white/8">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: 1000, center: [-95, 39] as [number, number] }}
          width={800}
          height={500}
          className="max-w-full h-auto"
          style={{ width: "100%", height: "auto", background: "rgba(255,255,255,0.02)" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: Array<{ rsmKey: string; id: string; properties: Record<string, unknown> }> }) =>
              geographies.map((geo) => {
                const fipsId = geo.id;
                const abbr = FIPS_TO_ABBR[fipsId];
                const headquarters = isHeadquarters(fipsId);
                const operating = isOperating(fipsId);
                const isHovered = hoveredState === fipsId;

                let fill = "rgba(255,255,255,0.03)";
                if (isHovered) {
                  fill = headquarters
                    ? "rgba(96,165,250,0.6)"
                    : operating
                      ? "rgba(74,222,128,0.5)"
                      : "rgba(255,255,255,0.1)";
                } else if (headquarters) {
                  fill = "rgba(59,130,246,0.7)";
                } else if (operating) {
                  fill = "rgba(34,197,94,0.5)";
                }

                return (
                  <g
                    key={geo.rsmKey}
                    onMouseEnter={() => setHoveredState(fipsId)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    <Geography
                      geography={geo}
                      fill={fill}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth={0.75}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  </g>
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Tooltip on hover */}
      {hoveredState && (
        <div className="mt-2 text-center text-xs text-neutral-500">
          {(() => {
            const abbr = FIPS_TO_ABBR[hoveredState];
            const hq = isHeadquarters(hoveredState);
            const op = isOperating(hoveredState);
            return `${abbr || ""}${hq ? " — Headquarters" : op ? " — Operating" : " — Not Operating"}`;
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-neutral-500">
        <span className="font-medium text-neutral-400">Legend:</span>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(59,130,246,0.7)" }} />
          <span>Headquarters</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "rgba(34,197,94,0.5)" }} />
          <span>Operating Area</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm border border-white/10" style={{ backgroundColor: "rgba(255,255,255,0.03)" }} />
          <span>Non-Operating</span>
        </div>
      </div>
    </div>
  );
}
