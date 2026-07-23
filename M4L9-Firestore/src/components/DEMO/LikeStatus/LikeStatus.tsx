interface LikeStatusProps {
    isLiked: boolean;
}

function LikeStatus({ isLiked }: LikeStatusProps) {
    return (
        <p>{isLiked ? "Te gusta esta publicacion" : "No te gusta todavia"}</p>
    );
}

export default LikeStatus