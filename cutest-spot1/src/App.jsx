import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [riddleVisible, setRiddleVisible] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  // Generate floating letters only once
  const [floatingLetters] = useState(() => {
    const letters = [
      "S",
      "A",
      "K",
      "W",
      "I",
      "V",
      "C",
      "S",
      "K",
      "A",
      "S",
      "H",
      "I",
      "W",
      "V",
      "C",
    ];
    const specialLetters = ["S", "A", "K", "S", "H", "I"];

    return letters.map((letter, i) => {
      const isSpecial = specialLetters.includes(letter);
      let left, top;

      if (isSpecial) {
        // Position special letters in safe zones (avoid center where riddle appears)
        const zone = Math.floor(Math.random() * 4);
        switch (zone) {
          case 0: // Top area
            left = Math.random() * 100;
            top = Math.random() * 25; // Top 25%
            break;
          case 1: // Bottom area
            left = Math.random() * 100;
            top = 75 + Math.random() * 25; // Bottom 25%
            break;
          case 2: // Left area
            left = Math.random() * 20; // Left 20%
            top = 25 + Math.random() * 50; // Middle vertically
            break;
          case 3: // Right area
            left = 80 + Math.random() * 20; // Right 20%
            top = 25 + Math.random() * 50; // Middle vertically
            break;
        }
      } else {
        // Regular letters can go anywhere
        left = Math.random() * 100;
        top = Math.random() * 100;
      }

      return {
        letter,
        id: `letter-${i}`,
        className: `floating-letter ${isSpecial ? "special-letter" : ""}`,
        style: {
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${15 + Math.random() * 10}s`,
          fontSize: `${3 + Math.random() * 2}rem`,
        },
      };
    });
  });

  const riddle = `I do not speak, yet prove what's true,
                  In silent form, I point to you.
                  I follow facts, not fiction's dance,
                  The truth is known if given a chance.
                  I hold the key in every case
                  What am I in justice's face?`;

  useEffect(() => {
    const timer2 = setTimeout(() => setRiddleVisible(true), 2500);
    return () => {
      clearTimeout(timer2);
    };
  }, []);

  const handleAnswerSubmit = () => {
    if (riddleAnswer.toLowerCase().includes("evidence")) {
      setShowHint(true);
      setRiddleAnswer(""); // Clear the input
    }
  };

  const handleSecondAnswer = () => {
    if (riddleAnswer.toLowerCase().includes("sakshi")) {
      setShowAnswer(true);
      setRiddleAnswer(""); // Clear the input
      // Transition to final screen after a delay
      setTimeout(() => {
        setShowFinalScreen(true);
      }, 3000);
    }
  };

  return (
    <div className="love-letter-container">
      {!showFinalScreen ? (
        <>
          <div className="stars-background"></div>

          <div className="floating-letters-container">
            {floatingLetters.map((letterData) => (
              <div
                key={letterData.id}
                className={letterData.className}
                style={letterData.style}
              >
                {letterData.letter}
              </div>
            ))}
          </div>

          <div className="main-content">
            <div className="title-section">
              <h1 className="love-title">
                <span className="gradient-text">For Someone Special</span>
              </h1>
            </div>

            {riddleVisible && (
              <div className="riddle-container">
                <div className="riddle-card">
                  <div className="riddle-header">
                    <h2>Riddel Me This</h2>
                  </div>

                  <div className="riddle-text">
                    {riddle.split("\n").map((line, index) => (
                      <div key={index} className="riddle-line">
                        {line}
                      </div>
                    ))}
                  </div>

                  {!showHint && !showAnswer && (
                    <div className="answer-section">
                      <input
                        type="text"
                        value={riddleAnswer}
                        onChange={(e) => setRiddleAnswer(e.target.value)}
                        placeholder="What am I?"
                        className="answer-input"
                      />
                      <button
                        onClick={handleAnswerSubmit}
                        className="submit-btn"
                      >
                        Submit Answer 💭
                      </button>
                    </div>
                  )}

                  {showHint && !showAnswer && (
                    <div className="hint-section">
                      <div className="poetic-hint">
                        <p className="hint-verse">
                          You found me, yet I'm not the key, <br /> Try another
                          tongue, and you might see. <br /> The truth you seek
                          is in your view, <br /> In shining letters, floating
                          through.
                        </p>
                      </div>
                      <div className="continue-section">
                        <input
                          type="text"
                          value={riddleAnswer}
                          onChange={(e) => setRiddleAnswer(e.target.value)}
                          placeholder="Who is this person?"
                          className="answer-input"
                        />
                        <button
                          onClick={handleSecondAnswer}
                          className="submit-btn"
                        >
                          Try Again ✨
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="sparkles">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="final-screen">
          <div className="youtube-background">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/UTqmc5zcDD4?autoplay=1&loop=1&playlist=UTqmc5zcDD4&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
              title="My Love - Kuba Oms (Radio Version)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="video-overlay"></div>

          <div className="center-note">
            <div className="love-note-card">
              <div className="note-header">
                <h2>💕 for the cutest girl, for you 💕</h2>
              </div>
              <div className="note-content">
                <p>
                  Hey.... I'd rather do this in person but since we are soo far
                  apart, I'll give you this
                </p>
                <p>
                  I know we basically met by chance from 2 of our friends, at
                  first i thought "k ill give this a try" but as we went on
                  talking for days I liked you more and more day by day, and now
                  I can't go a single day without talking to you and this is me
                  confessing my feelings to you, I know we are not in a
                  relationship yet but I hope this will change soon, I really
                  like you and I hope you like me too
                </p>

                <p>
                  And I would really love to here your voice sometime 🥰
                  well......... <br />
                </p>

                {/* <p className="note-highlight">
                  You are my favorite song, my sweetest melody,
                </p>
                <p className="note-highlight">
                  And the most beautiful evidence of love I've ever known.
                </p> */}
                <div className="note-signature">
                  <p>Forever yours,</p>
                  <p className="signature">💖</p>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-hearts-final">
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                className="heart-final"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              >
                💕
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
