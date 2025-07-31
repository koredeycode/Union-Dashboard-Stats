type TitleDistributionProps = {
  titleCount: { [title: string]: number };
  totalUsers: number;
};

const getLevelFromIndex = (index: number): number => 10 - index;

const TitleDistribution = ({
  titleCount,
  totalUsers,
}: TitleDistributionProps) => {
  const titlesSorted = Object.entries(titleCount).sort(
    ([, countA], [, countB]) => countB - countA // descending
  );

  return (
    <section className="chart_container bg-card-bg rounded-xl p-6">
      <h2 className="text-lg font-medium text-text-primary mb-4">
        Title Distribution
      </h2>
      <div className="space-y-4">
        {titlesSorted.map(([title, count], index) => {
          const percent = ((count / totalUsers) * 100).toFixed(2);
          const level = getLevelFromIndex(index);

          return (
            <div
              key={title}
              className="flex justify-between items-center gap-6 text-sm"
            >
              <div className="">
                <img
                  alt="User Picture"
                  className="w-8 h-8 object-cover"
                  src={`https://app.union.build/badges/${level}.svg`}
                />
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <div
                  className="text-text-primary"
                  style={{ color: `var(--level-${level})` }}
                >
                  {title.trim()}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: `var(--level-${level})`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Right: Count */}

              <div className="w-[50px] text-text-secondary text-right">
                {count.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TitleDistribution;
