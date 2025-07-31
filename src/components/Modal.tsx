import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

type UserData = {
  rank: number;
  user_id: string;
  total_xp: number;
  level: number;
  current_xp: number;
  xp_required: number;
  title: string;
  display_name: string;
  pfp: string;
};

async function fetchUserData(username: string) {
  const response = await fetch(
    `https://corsproxy.io/?https://union-build-leaderboard.vercel.app/api/search?name=${encodeURIComponent(
      username
    )}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        priority: "u=1, i",
        "sec-ch-ua":
          '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        Referer: "https://union-build-leaderboard.vercel.app/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching user data: ${response.statusText}`);
  }

  return response.json();
}

const IDModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [idStep, setIdStep] = useState<"input" | "loading" | "card">("input");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userName, setUserName] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardReady, setIsCardReady] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const shareText = `🫡 zkgm @union_build Army 🪖\nA level ${userData?.level} ${userData?.title} soldier reporting for duty.\nHere's my zkID card!

Check yours at: https://union-dashboard-stats.vercel.app/

Built with ❤️ by @korefomo`;

  useEffect(() => {
    if (!isOpen) {
      setIdStep("input");
      setUserData(null);
    }
  }, [isOpen]);

  // // Click outside to close
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target as Node)
  //     ) {
  //       onClose();
  //     }
  //   };
  //   if (isOpen) document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [isOpen, onClose]);

  const handleSubmit = async () => {
    setIdStep("loading");
    try {
      const data = await fetchUserData(userName);
      setUserData(data[0]);
      console.log(userData); // ✅ this will log the correct response
      setIdStep("card");
    } catch (err) {
      console.error("Error fetching user:", err);
      setIdStep("input");
    }

    // setTimeout(() => {
    //   setUserData({
    //      rank: 2,
    //     user_id: "0907e95e-4b26-484f-ac8b-7343b4e6423b",
    //     total_xp: 1385,
    //     level: 10,
    //     current_xp: 230,
    //     xp_required: 90,
    //     title: "Junior Captain",
    //     display_name: "NeuroPunker88",
    //     pfp: "https://pbs.twimg.com/profile_images/1808047729144213505/XVhHcjQR_normal.jpg",
    //   });
    //   setIdStep("card");
    // }, 1500);
  };

  const handleDownload = async () => {
    // if (!cardRef.current) return;
    if (!isCardReady || !cardRef.current) return;
    // const canvas = await html2canvas(cardRef.current, {
    //   backgroundColor: null, // preserve transparency
    //   scale: 2, // improve resolution
    // });
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      useCORS: true, // <-- Important
    });

    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${userName}_zkid_card.png`;
    link.click();

    setDownloaded(true);
  };

  useEffect(() => {
    if (userData) {
      console.log("Updated userData:", userData);
    }
  }, [userData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div
        ref={modalRef}
        className="bg-transparent rounded-lg w-full max-w-[320px] mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white/20 backdrop-blur-sm rounded-full p-1 text-white hover:bg-white/30 transition-colors z-10"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {idStep === "input" && (
          <div className="p-6 bg-[var(--card-background)] rounded-lg">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Find User ID Card
            </h3>
            <div className="relative">
              <input
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full bg-[var(--background-color)] border border-[var(--table-border)] rounded-md py-3 pl-10 pr-4 text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-[var(--level-5)]"
                placeholder="Find user by username..."
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                search
              </span>
            </div>
          </div>
        )}

        {idStep === "loading" && (
          <div className="flex flex-col items-center justify-center h-96 bg-[var(--card-background)] rounded-lg">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-text-primary"></div>
            <p className="text-text-secondary mt-4">Fetching user data...</p>
          </div>
        )}

        {idStep === "card" && userData && (
          <div className="flex flex-col items-center gap-4">
            <div
              ref={cardRef}
              className="w-full bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 rounded-lg border-2 border-[var(--id-card-accent)] shadow-2xl shadow-cyan-400/30 p-4 pt-8 text-white"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full border-4 border-[var(--id-card-accent)] shadow-lg bg-slate-300">
                  <img
                    src={`https://unavatar.io/x/${userName}`}
                    onLoad={() => setIsCardReady(true)}
                    crossOrigin="anonymous"
                    alt="User"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-[var(--id-card-accent)] text-black rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg border-2 border-black">
                    {userData.level}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-4">
                  {userData.display_name}
                </h3>
                <div className="w-full mt-6 space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span className="font-semibold">XP:</span>
                    <span className="font-mono">
                      {userData.total_xp.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Rank:</span>
                    <span className="font-mono">
                      {userData.rank.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Issued:</span>
                    <span className="font-mono">29 JUL 2025</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--id-card-accent)]/30 flex items-center justify-center text-center gap-2">
                <div className="">
                  <img
                    alt="User Picture"
                    className="w-4 h-4 object-cover"
                    src={`https://app.union.build/badges/${userData.level}.svg`}
                  />
                </div>
                <h2
                  className="text-xl font-bold tracking-wider"
                  style={{ color: "var(--id-card-accent)" }}
                >
                  {userData.title}
                </h2>
              </div>
            </div>

            {!downloaded ? (
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full bg-[var(--id-card-accent)] text-black font-bold py-2 rounded-md hover:bg-opacity-90 transition-colors mt-2"
              >
                <span className="material-symbols-outlined">download</span>
                <span>Download ID</span>
              </button>
            ) : (
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareText
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[var(--id-card-accent)] text-black font-bold py-2 rounded-md hover:bg-opacity-90 transition-colors mt-2"
              >
                <span className="material-symbols-outlined">share</span>
                <span>Share to X</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IDModal;
