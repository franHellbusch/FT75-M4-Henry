interface HeartButtonProps {
    isLiked: boolean;
    onToggle: () => void;
}

function HeartButton({ isLiked, onToggle }: HeartButtonProps) {
    return <button onClick={onToggle}>
        {isLiked ? "❤️" : "🤍"}
    </button>
}

export default HeartButton