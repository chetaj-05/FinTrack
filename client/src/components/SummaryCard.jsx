function SummaryCard({ title, amount }) {
    return (
        <div
            style={{
                border: "1px solid gray",
                padding: "20px",
                margin: "10px",
                borderRadius: "10px",
            }}
        >
            <h3>{title}</h3>

            <h2>₹ {amount}</h2>
        </div>
    );
}

export default SummaryCard;