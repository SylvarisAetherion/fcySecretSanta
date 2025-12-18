'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Summary() {
  const [pairs, setPairs] = useState([]);
  const [isRandomMode, setIsRandomMode] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const pairsData = localStorage.getItem('secretSantaFinalPairs');
    const savedMode = localStorage.getItem('secretSantaRandomMode');
    
    if (!pairsData) {
      router.push('/');
      return;
    }

    setPairs(JSON.parse(pairsData));
    setIsRandomMode(savedMode === 'true');
    setIsHydrated(true);
  }, [router]);

  if (!isHydrated) return null;

  return (
    <main>
      <div className="snow-container"></div>
      <h1>Final Secret Santa List 🎁</h1>

      <div className="summary-container fade-in">
        <div className="summary-list">
          {pairs.map((pair, index) => (
            <div key={index} className="summary-item">
              {isRandomMode && <span className="gift-tag">Gift #{pair.giftNumber}</span>}
              <div className="pair-info">
                <span className="name"><strong>{pair.giver}</strong></span>
                <span className="gives-to">gives to</span>
                <span className="name"><strong>{pair.receiver}</strong></span>
              </div>
            </div>
          ))}
        </div>

        <div className="controls">
          <button className="back-btn" onClick={() => router.push('/')}>
            ⬅️ Start New Game
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .summary-container {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid #ffd700;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          width: 100%;
          box-sizing: border-box;
          margin-top: 2rem;
        }
        .summary-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .summary-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.2rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 215, 0, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .gift-tag {
          color: #ffd700;
          font-weight: bold;
          font-size: 0.8rem;
          text-transform: uppercase;
          background: rgba(255, 215, 0, 0.1);
          padding: 2px 10px;
          border-radius: 10px;
        }
        .pair-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          text-align: center;
          width: 100%;
        }
        .name {
          color: #fff;
          font-size: 1.1rem;
          word-break: break-word;
        }
        .gives-to {
          color: #ffd700;
          font-size: 0.9rem;
          font-style: italic;
          opacity: 0.8;
        }
        .controls {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }
        .back-btn {
          background: #d42426;
          color: white;
          padding: 12px 24px;
          border-radius: 30px;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
          box-shadow: 0 4px 15px rgba(212, 36, 38, 0.3);
        }
        .back-btn:hover {
          transform: scale(1.05);
          background: #b31d1f;
        }
        @media (max-width: 480px) {
          .summary-container {
            padding: 1rem;
          }
          .name-col {
            font-size: 0.9rem;
          }
          .summary-table td, .summary-table th {
            padding: 10px 5px;
          }
        }
      `}} />
    </main>
  );
}
