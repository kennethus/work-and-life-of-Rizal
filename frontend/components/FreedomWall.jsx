import { useEffect, useState, useRef } from "react";
import axios from "axios";

import Note from "../components/Note";

const getRandomPosition = (container) => {
  if (!container) return { x: 0, y: 0 };

  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  if (containerWidth === 0 || containerHeight === 0) {
    // fallback to some default or delay positioning until container has size
    return { x: 50, y: 50 };
  }

  const marginRatio = 0.2; // 20% padding

  const x = Math.floor(
    marginRatio * containerWidth +
      Math.random() * (containerWidth * (1 - 2 * marginRatio))
  );
  const y = Math.floor(
    marginRatio * containerHeight +
      Math.random() * (containerHeight * (1 - 2 * marginRatio))
  );

  return { x, y };
};

const FreedomWall = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedNotes, setLikedNotes] = useState(
    JSON.parse(localStorage.getItem("likedNotes") || "[]")
  );
  const containerRef = useRef(null);
  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem("notePositions");
    return saved ? JSON.parse(saved) : {};
  });

  const [form, setForm] = useState({
    content: "",
    nickname: "",
    color: "#ffeb3b",
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/notes/`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          const fetchedNotes = response.data.data;

          // Assign random positions to new notes
          const updatedPositions = { ...positions };
          fetchedNotes.forEach((note) => {
            if (!updatedPositions[note._id]) {
              updatedPositions[note._id] = getRandomPosition(
                containerRef.current
              );
            }
          });

          setPositions(updatedPositions);
          localStorage.setItem(
            "notePositions",
            JSON.stringify(updatedPositions)
          );
          setNotes(fetchedNotes);
        } else {
          console.log("Fetching notes failed");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleDragEnd = (noteId, event, info) => {
    setPositions((prev) => {
      const prevPos = prev[noteId] || { x: 0, y: 0 };
      const newPos = {
        x: prevPos.x + info.delta.x,
        y: prevPos.y + info.delta.y,
      };
      const newPositions = {
        ...prev,
        [noteId]: newPos,
      };
      localStorage.setItem("notePositions", JSON.stringify(newPositions));
      return newPositions;
    });
  };

  const likeNote = async (noteId) => {
    if (likedNotes.includes(noteId)) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/notes/${noteId}/like`
      );

      if (response.data.success) {
        const updatedNotes = notes.map((note) =>
          note._id === noteId ? response.data.data : note
        );
        setNotes(updatedNotes);

        const updatedLikedNotes = [...likedNotes, noteId];
        setLikedNotes(updatedLikedNotes);
        localStorage.setItem("likedNotes", JSON.stringify(updatedLikedNotes));
      }
    } catch (error) {
      console.error("Failed to like the note:", error);
    }
  };

  const postNote = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) return;

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/notes/`,
      form
    );

    const newNote = res.data.data;

    const newPosition = getRandomPosition(containerRef.current);

    const newPositions = {
      ...positions,
      [newNote._id]: newPosition,
    };

    setPositions(newPositions);
    localStorage.setItem("notePositions", JSON.stringify(newPositions));
    setNotes([newNote, ...notes].slice(0, 10)); // max 15 notes for liveliness

    setForm({ content: "", nickname: "", color: "#ffeb3b" });
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-yellow-700">Loading notes...</p>
    );

  return (
    <div
      className="p-6 min-h-screen bg-yellow-50 bg-opacity-80"
      style={{
        backgroundImage: `url('/oldpaper.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header & Prompt */}
      <div className="max-w-3xl mx-auto mb-8 text-center bg-white/20 backdrop-blur-sm">
        <h1 className="text-4xl font-extrabold text-yellow-900 mb-2 drop-shadow-lg">
          Freedom Wall
        </h1>
        <p className="text-yellow-800 text-lg md:text-xl font-semibold">
          How do <span className="underline decoration-yellow-600">YOU</span>{" "}
          remember and see Rizal nowadays in the 21st century?
        </p>
        <p className="mt-1 text-yellow-700 italic text-lg md:text-lg">
          Share your thoughts and memories below!
        </p>
      </div>

      {/* Note Submission Form */}
      <form
        onSubmit={postNote}
        className="mb-12 max-w-xl mx-auto bg-yellow-100 p-6 rounded-lg shadow-lg border border-yellow-300"
      >
        <input
          type="text"
          placeholder="Your nickname (optional)"
          className="border border-yellow-400 rounded px-3 py-2 w-full mb-3 focus:outline-yellow-500 focus:ring-1 focus:ring-yellow-500 text-yellow-900 placeholder-yellow-600"
          value={form.nickname}
          onChange={(e) => setForm({ ...form, nickname: e.target.value })}
        />
        <textarea
          placeholder="Write your note here — What does Rizal mean to you today?"
          className="border border-yellow-400 rounded px-3 py-3 w-full h-28 resize-none focus:outline-yellow-500 focus:ring-1 focus:ring-yellow-500 text-yellow-900 placeholder-yellow-600"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          maxLength={120}
          required
        />
        <div className="flex items-center mt-4 space-x-4">
          <label className="font-semibold text-yellow-700 select-none">
            Note color:
          </label>
          <input
            type="color"
            value={form.color}
            className="w-10 h-10 rounded border border-yellow-400 cursor-pointer"
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />
          <button
            type="submit"
            className="ml-auto bg-yellow-500 hover:bg-yellow-600 text-yellow-100 font-bold px-6 py-2 rounded shadow-md transition duration-200"
          >
            Post
          </button>
        </div>
      </form>

      <div className="max-w-3xl mx-auto mb-8 text-center bg-white/20 backdrop-blur-sm">
        <p className="mt-1 text-yellow-900  italic text-center text-lg md:text-lg  ">
          You can drag the notes in your prefered position! Add a like to them
          too!
        </p>
      </div>

      {/* Notes Display Area */}
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto min-h-[60vh] bg-yellow-50 bg-opacity-90 rounded-xl shadow-inner border border-yellow-300 overflow-visible"
      >
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <Note
              key={note._id}
              note={note}
              index={index}
              containerRef={containerRef}
              position={positions[note._id]}
              onDragEnd={handleDragEnd}
              onLike={likeNote}
              isLiked={likedNotes.includes(note._id)}
            />
          ))
        ) : (
          <p className="text-center text-yellow-700 py-10 italic">
            No notes yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
};

export default FreedomWall;
