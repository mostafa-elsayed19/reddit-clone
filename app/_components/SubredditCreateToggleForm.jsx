"use client";
import { Plus } from "lucide-react";
import Button from "./Button";
import SubredditForm from "./SubredditForm";
import { useEffect, useState } from "react";

function SubredditCreateToggleForm() {
  const [showForm, setShowForm] = useState(false);
  const [shouldRenderForm, setShouldRenderForm] = useState(false);

  useEffect(() => {
    if (showForm) {
      setShouldRenderForm(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRenderForm(false);
      }, 300); // Match the duration of the fade-out animation

      return () => clearTimeout(timeout);
    }
  }, [showForm]);

  return (
    <section className="flex flex-col justify-center gap-4">
      <Button
        className="flex gap-2 self-end"
        onClick={() => setShowForm(!showForm)}
      >
        <Plus />
        Create a subreddit
      </Button>
      {shouldRenderForm && (
        <div className={showForm ? "animate-fade-in" : "animate-fade-out"}>
          <SubredditForm />
        </div>
      )}
    </section>
  );
}

export default SubredditCreateToggleForm;
