type StatCardProps = {
  label: string;
  value: string | number;
};

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="stat_card">
    <p className="stat_card_label">{label}</p>
    <p className="stat_card_value">{value.toLocaleString()}</p>
  </div>
);

export default StatCard;
