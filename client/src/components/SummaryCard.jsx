function SummaryCard({ title, amount }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex-1 min-w-[250px] hover:scale-105 transition duration-300">
      <h2 className="text-gray-500 text-lg">{title}</h2>

      <h1 className="text-5xl font-bold mt-4">₹ {amount}</h1>
    </div>
  );
}

export default SummaryCard;
