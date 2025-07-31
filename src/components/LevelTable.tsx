type LevelRange = {
  minXP: number;
  maxXP: number | string;
};

type LevelTableProps = {
  levelRanges: { [level: string]: LevelRange };
  levelTitles: string[];
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

const LevelTable = ({ levelRanges, levelTitles }: LevelTableProps) => {
  const levels = Object.keys(levelRanges).sort((a, b) => Number(a) - Number(b));

  return (
    <section className="chart_container bg-card-bg rounded-xl">
      <h2 className="text-lg font-medium text-text-primary mb-4">
        Level XP Ranges & Titles
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-transparent">
            <tr>
              {["Level", "Title", "Min XP", "Max XP"].map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 whitespace-nowrap text-sm text-left font-medium text-text-secondary"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {levels.map((level, idx) => {
              const { minXP, maxXP } = levelRanges[level];
              const title = levelToTitle[level] ?? "—";
              const isEven = idx % 2 === 1;

              return (
                <tr
                  key={level}
                  className={`border-b border-[var(--table-border)] ${
                    isEven ? "bg-[var(--table-row-even)]" : ""
                  }`}
                >
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm font-medium"
                    style={{ color: `var(--level-${level})` }}
                  >
                    {level}
                  </td>
                  <td
                    className="px-4 py-3 whitespace-nowrap text-sm font-medium"
                    style={{ color: `var(--level-${level})` }}
                  >
                    {title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {minXP.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {typeof maxXP === "number" ? maxXP.toLocaleString() : maxXP}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LevelTable;
