type LevelBarChartProps = {
  levelPercentages: { [level: string]: string }; // e.g., { "1": "21.09%", ..., "10": "0.02%" }
};

const LevelBarChart = ({ levelPercentages }: LevelBarChartProps) => {
  const levels = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  return (
    <section className="chart_container bg-card-bg rounded-xl p-6">
      <h2 className="text-lg font-medium text-text-primary mb-4">
        Level Distribution
      </h2>
      <div className="flex justify-around items-end h-48 pt-4 space-x-2">
        {levels.map((level) => {
          const percentageStr = levelPercentages[level] || "0%";
          // const percent = parseFloat(percentageStr);

          return (
            <div
              key={level}
              className="flex flex-col items-center w-1/10 h-full"
            >
              <div className="relative w-full h-full flex items-end">
                <div
                  className={`w-full rounded-t-md bg-[var(--level-${level})]`}
                  // style={{ height: percentageStr }}
                  style={{
                    height: percentageStr,
                    backgroundColor: `var(--level-${level})`,
                  }}
                />
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-text-secondary">
                  {percentageStr}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-2">Lvl {level}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LevelBarChart;
