'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Results() {
  const [pairs, setPairs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [displayGiftNumber, setDisplayGiftNumber] = useState(null);
  const [isRandomMode, setIsRandomMode] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const participantsData = localStorage.getItem('secretSantaParticipants');
    const savedMode = localStorage.getItem('secretSantaRandomMode');
    const randomMode = savedMode === 'true';
    setIsRandomMode(randomMode);

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
    let attempts = 0;
    const maxAttempts = 500;

    while (!valid && attempts < maxAttempts) {
      attempts++;
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      valid = true;
      result = [];
      for (let i = 0; i < participants.length; i++) {
        // If random mode is ON, ensure giver's giftIndex is NOT the same as receiver's giftIndex
        if (randomMode && participants[i].giftIndex === shuffled[i].giftIndex) {
          valid = false;
          break;
        }
        // General Secret Santa rule: cannot give to yourself
        if (participants[i].name === shuffled[i].name) {
          valid = false;
          break;
        }
        result.push({ 
          giver: participants[i].name, 
          receiver: shuffled[i].name, 
          giftNumber: randomMode ? shuffled[i].giftIndex : null
        });
      }
    }

    if (!valid) {
      // Fallback if no valid shuffling found (very unlikely with enough attempts)
      alert("Could not find a valid pairing where no one gets their own gift index. Try adjusting the gift numbers.");
      router.push('/');
      return;
    }

    // Shuffle the results list so the order of reveals is random too
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    // Add a slight delay for "animation" effect
    const timer = setTimeout(() => {
      setPairs(result);
      localStorage.setItem('secretSantaFinalPairs', JSON.stringify(result));
      setLoading(false);
      
      const firstPair = result[0];
      setCurrentIndex(0);
      
      if (randomMode) {
        setIsRevealing(true);
        let count = 0;
        const interval = setInterval(() => {
          setDisplayGiftNumber(Math.floor(Math.random() * result.length) + 1);
          count++;
          if (count > 12) {
            clearInterval(interval);
            setDisplayGiftNumber(firstPair.giftNumber);
            setIsRevealing(false);
          }
        }, 60);
      } else {
        setDisplayGiftNumber(null);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  const nextPair = () => {
    if (currentIndex < pairs.length - 1 && !isRevealing) {
      const nextIdx = currentIndex + 1;
      
      if (!isRandomMode) {
        // Skip animation if not in random mode
        setCurrentIndex(nextIdx);
        return;
      }

      // Show next couple first
      setCurrentIndex(nextIdx);
      setIsRevealing(true);
      
      // Animation logic: randomize gift number display
      let count = 0;
      const interval = setInterval(() => {
        setDisplayGiftNumber(Math.floor(Math.random() * pairs.length) + 1);
        count++;
        if (count > 12) {
          clearInterval(interval);
          setDisplayGiftNumber(pairs[nextIdx].giftNumber);
          setIsRevealing(false);
        }
      }, 60);
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
            <div className={`pair-card ${isRevealing ? 'shuffling-gift' : 'fade-in'}`}>
              {isRandomMode && <div className={`gift-number ${isRevealing ? 'animating' : ''}`}>Gift #{displayGiftNumber}</div>}
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
                <button className="next-btn" onClick={nextPair} disabled={isRevealing}>
                  {isRevealing ? 'Choosing... 🎲' : 'Next Pair 🎁'}
                </button>
                <button className="reset-btn" onClick={() => router.push('/')}>
                  Reset & Go Back ⬅️
                </button>
              </div>
            ) : (
              <div className="end-message">
                <p>All gifts have been assigned! 🎅</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                  <button className="next-btn" onClick={() => router.push('/summary')}>
                    View Final List 📋
                  </button>
                  <button className="back-btn" onClick={() => router.push('/')}>
                    ⬅️ Start Over
                  </button>
                </div>
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
          box-sizing: border-box;
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
        .next-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        .shuffling-gift {
          border-color: #ffd700;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }
        .gift-number.animating {
          animation: shake 0.1s infinite;
          color: #ff4d4d;
        }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          25% { transform: translate(-1px, -1px) rotate(-1deg); }
          50% { transform: translate(-1px, 1px) rotate(1deg); }
          75% { transform: translate(1px, -1px) rotate(0deg); }
          100% { transform: translate(1px, 1px) rotate(1deg); }
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
