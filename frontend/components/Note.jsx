// components/Note.jsx
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

function getTextColor(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "text-black" : "text-white";
}

const Note = ({
  note,
  index,
  containerRef,
  position,
  onDragEnd,
  onLike,
  isLiked,
}) => {
  const rotations = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];
  const rotateClass = rotations[index % rotations.length];
  const textColor = getTextColor(note.color);

  return (
    <motion.div
      key={note._id || index}
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      whileTap={{ scale: 1.05 }}
      initial={{ x: position?.x || 0, y: position?.y || 0 }}
      animate={{ x: position?.x || 0, y: position?.y || 0 }}
      onDragEnd={(event, info) => onDragEnd(note._id, event, info)}
      style={{
        backgroundColor: note.color,
        position: "absolute",
        x: position?.x || 0,
        y: position?.y || 0,
      }}
      className={`w-48 h-48 p-4 shadow-lg border border-white cursor-move
        transform ${rotateClass} transition duration-300 ease-in-out
        hover:shadow-2xl hover:z-10 ${textColor}
        flex flex-col justify-between select-text`}
    >
      <div className="break-words whitespace-pre-wrap">
        <p className="text-xs italic opacity-80 truncate">
          ~ {note.nickname || "Anonymous"}
        </p>
        <p className="mt-2 text-sm">{note.content}</p>
      </div>
      <button
        onClick={() => onLike(note._id)}
        className={`mt-4 flex items-center space-x-1 text-sm focus:outline-none ${textColor} hover:scale-110 transition-transform`}
        aria-label={isLiked ? "Unlike note" : "Like note"}
      >
        {isLiked ? (
          <Heart className="text-red-500 fill-red-500 w-5 h-5" />
        ) : (
          <Heart className="text-gray-400 w-5 h-5" />
        )}
        <span>{note.likes}</span>
      </button>
    </motion.div>
  );
};

export default Note;
