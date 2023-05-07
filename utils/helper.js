module.exports = {
    format_date: () => {
        return date.toLocaleDateString();
    },
    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },
    get_emoji: () => {
        const randomNum = Math.random();
        let emoji = "";
        if (randomNum < 0.25) {
            emoji = "💸";
        } else if (randomNum < 0.5) {
            emoji = "🤑";
        } else if (randomNum < 0.75) {
            emoji = "😍";
        } else {
            emoji = "👀";
        }
        return emoji;
    },

};
