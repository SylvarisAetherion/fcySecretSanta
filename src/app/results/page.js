'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Results() {
  const [pairs, setPairs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const participantsData = localStorage.getItem('secretSantaParticipants');
    if (!participantsData) {
      router.push('/');
      return;
    }

    const participants = JSON.parse(participantsData);
    if (participants.length < 2) {
      router.push('/');
      return;
    }

    // Secret Santa logic
    let shuffled = [...participants];
    let valid = false;
    let result = [];

    while (!valid) {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      valid = true;
      result = [];
      for (let i = 0; i < participants.length; i++) {
        if (participants[i] === shuffled[i]) {
          valid = false;
          break;
        }
        // Assign gift number 1 to N
        result.push({ giver: participants[i], receiver: shuffled[i], giftNumber: i + 1 });
      }
    }

    // Shuffle the results list so the order of reveals is random too
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    // Add a slight delay for "animation" effect
    const timer = setTimeout(() => {
      setPairs(result);
      setLoading(false);
      setCurrentIndex(0);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  const nextPair = () => {
    if (currentIndex < pairs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isLast = currentIndex === pairs.length - 1;

  const pulseStyle = {
    textAlign: 'center',
    padding: '40px'
  };

  const pulseAnimation = {
    animation: 'pulse 1.5s infinite'
  };

  return (
    <main>
      <div className="snow-container"></div>
      <h1>Secret Santa Reveal 🎅</h1>

      {loading ? (
        <div style={pulseStyle}>
          <h2 style={pulseAnimation}>Preparing the gifts... 🎁✨</h2>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes pulse {
              0% { opacity: 0.5; }
              50% { opacity: 1; }
              100% { opacity: 0.5; }
            }
          `}} />
        </div>
      ) : (
        <div className="reveal-container">
          {currentIndex >= 0 && pairs[currentIndex] && (
            <div className="pair-card fade-in">
              <div className="gift-number">Gift #{pairs[currentIndex].giftNumber}</div>
              <div className="names">
                <div className="person">
                  <span className="label">Gifter</span>
                  <strong className="name">{pairs[currentIndex].giver}</strong>
                </div>
                <div className="arrow">➔</div>
                <div className="person">
                  <span className="label">Receiver</span>
                  <strong className="name">{pairs[currentIndex].receiver}</strong>
                </div>
              </div>
            </div>
          )}

          <div className="controls">
            {!isLast ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <button className="next-btn" onClick={nextPair}>
                  Next Pair 🎁
                </button>
                <button className="reset-btn" onClick={() => router.push('/')}>
                  Reset & Go Back ⬅️
                </button>
              </div>
            ) : (
              <div className="end-message">
                <p>All gifts have been assigned! 🎅</p>
                <button className="back-btn" onClick={() => router.push('/')}>
                  ⬅️ Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .reveal-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin-top: 2rem;
        }
        .pair-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2.5rem;
          border-radius: 20px;
          border: 2px solid #ffd700;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          text-align: center;
          width: 100%;
          max-width: 500px;
        }
        .gift-number {
          font-size: 1.5rem;
          color: #ffd700;
          margin-bottom: 1.5rem;
          font-weight: bold;
          text-transform: uppercase;
        }
        .names {
          display: flex;
          justify-content: space-around;
          align-items: center;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .names {
            flex-direction: column;
            gap: 1.5rem;
          }
          .arrow {
            transform: rotate(90deg);
          }
          .name {
            font-size: 1.5rem;
          }
          .pair-card {
            padding: 1.5rem;
          }
        }
        .person {
          display: flex;
          flex-direction: column;
          word-break: break-word;
          max-width: 100%;
        }
        .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }
        .name {
          font-size: 1.8rem;
          color: #fff;
        }
        .arrow {
          font-size: 2rem;
          color: #ff4d4d;
        }
        .controls {
          margin-top: 1rem;
        }
        .next-btn {
          background: #ff4d4d;
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
          box-shadow: 0 4px 15px rgba(255, 77, 77, 0.4);
        }
        .next-btn:hover {
          background: #ff3333;
          transform: scale(1.05);
        }
        .reset-btn {
          background: transparent;
          color: #f8e3a1;
          border: 1px solid #f8e3a1;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-top: 0.5rem;
        }
        .reset-btn:hover {
          opacity: 0.8;
          background: rgba(248, 227, 161, 0.1);
        }
        .end-message {
          text-align: center;
        }
        .fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
