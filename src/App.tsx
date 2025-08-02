import Header from "./components/Header";
import Footer from "./components/Footer";
import StatCard from "./components/StatCard";
// import GetIDButton from "./components/GetIDButton";
// import LevelBarChart from "./components/LevelBarChart";
import XpPieChart from "./components/XpPieChart";
import LevelTable from "./components/LevelTable";
import TitleDistribution from "./components/TitleDistribution";
import data from "./data/mockData";
import { Analytics } from "@vercel/analytics/react";

function formatDateToLongForm(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const getOrdinalSuffix = (n: number) => {
    if (n >= 11 && n <= 13) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export const date = formatDateToLongForm(data.date);

function App() {
  return (
    <div className="main_container">
      <Header />
      <p className="typography_subtitle mb-2">Last Updated At: {date}</p>
      <section className="grid grid-cols-2 gap-4 mb-4">
        <StatCard label="Total Users" value={data.total_users} />
        <StatCard label="Total XP" value={data.total_xp} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <TitleDistribution
          titleCount={data.title_count}
          totalUsers={data.total_users}
        />
        <XpPieChart
          totalXp={data.total_xp}
          levelXp={data.level_xp}
          levelXpPercentage={data.level_xp_percentage}
        />
        <LevelTable
          levelRanges={data.level_xp_ranges}
          levelTitles={Object.keys(data.title_count)}
        />
      </div>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
