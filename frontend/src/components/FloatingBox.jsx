import React, { useState } from "react";

const FloatingBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(""); // Store AI response
  const [loading, setLoading] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      setLoading(true);
      setResponse(""); // Clear previous response
      try {
        const res = await fetch("http://localhost:3000/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });
  
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
  
        const data = await res.json();
        setResponse(data.content.trim());
      } catch (error) {
        setResponse("An error occurred. Please try again.");
        console.error("Error fetching AI response:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a valid prompt.");
    }
  };

  return (
    <div
      className={`floating-box fixed bottom-5 left-5 z-50 ${
        isOpen ? "open" : "closed"
      }`}
    >
      <button
        onClick={toggleBox}
        className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-800 transition-all"
      >
        {isOpen ? "Close" : "Ask AI"}
      </button>
      {isOpen && (
        <div
          className="box-content bg-white rounded-lg shadow-xl p-4 w-80 resize-y overflow-auto mt-2"
          style={{ minHeight: "100px", maxHeight: "400px" }}
        >
          <h2 className="text-lg font-semibold text-purple-700 mb-4">
            Ask AI a Question
          </h2>
          <form onSubmit={handlePromptSubmit}>
            <textarea
              value={prompt}
              onChange={handlePromptChange}
              placeholder="Type your prompt here..."
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              rows="4"
              required
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-all"
                disabled={loading}
              >
                {loading ? "Thinking..." : "Submit"}
              </button>
            </div>
          </form>
          {response && (
            <div className="mt-4 p-2 bg-gray-100 rounded-lg shadow-inner">
              <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingBox;
