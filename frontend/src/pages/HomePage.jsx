import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        setNotes(response.data);

        setIsRateLimited(false);
      } catch (error) {
        console.log(error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">Loading...</div>
        ) : isRateLimited ? (
          <RateLimitUI />
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        ) : (
          <NotesNotFound />
        )}
      </div>
    </div>
  );
};

export default HomePage;
