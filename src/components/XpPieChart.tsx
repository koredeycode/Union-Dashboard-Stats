type XpPieChartProps = {
  levelXp: { [level: string]: number };
  levelXpPercentage: { [level: string]: string };
  totalXp: number;
};

const levelToTitle: { [level: string]: string } = {
  "1": "Conscript",
  "2": "Private First Class",
  "3": "Junior Sergeant",
  "4": "Sergeant",
  "5": "Senior Sergeant",
  "6": "Starshina",
  "7": "Junior Lieutenant",
  "8": "Lieutenant",
  "9": "Senior Lieutenant",
  "10": "Junior Captain",
};

const XpPieChart = ({
  levelXp,
  levelXpPercentage,
  totalXp,
}: XpPieChartProps) => {
  const levels = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  const formatXP = (xp: number) => {
    if (xp >= 1_000_000) return `${(xp / 1_000_000).toFixed(1)}M XP`;
    if (xp >= 1_000) return `${(xp / 1_000).toFixed(1)}k XP`;
    return `${xp} XP`;
  };

  return (
    <section className="chart_container bg-card-bg rounded-xl p-6">
      <h2 className="text-lg font-medium text-text-primary mb-4">
        XP Distribution by Level
      </h2>
      <div className="flex flex-col items-center justify-start gap-6 mt-4">
        {/* SVG Ring */}
        <div className="relative w-50 h-50 flex-shrink-0 mb-8">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              fill="transparent"
              r="15.91549430918954"
              stroke="var(--card-background)"
              strokeWidth="3.8"
            />
            {levels.map((level, index) => {
              const percent = parseFloat(levelXpPercentage[level] || "0");
              const offset =
                -65 +
                levels
                  .slice(0, index)
                  .reduce(
                    (sum, l) => sum - parseFloat(levelXpPercentage[l] || "0"),
                    0
                  );

              return (
                <circle
                  key={level}
                  cx="18"
                  cy="18"
                  fill="transparent"
                  r="15.91549430918954"
                  stroke={`var(--level-${level})`}
                  strokeDasharray={`${percent}, ${100 - percent}`}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  strokeWidth="3.8"
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-bold text-text-primary">
              {formatXP(totalXp)}
            </span>
            <span className="text-xs text-text-secondary">Total XP</span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full flex-grow space-y-1.5 text-sm">
          {levels
            .slice()
            .reverse()
            .map((level) => (
              <div key={level} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-[var(--level-${level})]`}
                    style={{
                      backgroundColor: `var(--level-${level})`,
                    }}
                  />
                  <span className="text-text-secondary">
                    {levelToTitle[level]}
                  </span>
                </div>
                <span className="font-medium text-text-primary">
                  {/* {formatXP(levelXp[level] || 0)} */}
                  {levelXp[level].toLocaleString()} XP
                </span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default XpPieChart;
