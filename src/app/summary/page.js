'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function SummaryContent() {
  const [pairs, setPairs] = useState([]);
  const [isRandomMode, setIsRandomMode] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const mode = searchParams.get('mode');
    const rId = searchParams.get('roomId');

    if (mode === 'online' && rId) {
      setIsOnline(true);
      setRoomId(rId);
      setIsHost(localStorage.getItem(`host_${rId}`) === 'true');
      fetchOnlineSummary(rId);
    } else {
      loadOfflineSummary();
    }
  }, [searchParams, router]);

  // Poll for room existence in online mode
  useEffect(() => {
    if (isOnline && roomId) {
      const interval = setInterval(async () => {
        try {
          const res = await fetch('/api/rooms', {
            method: 'POST',
            body: JSON.stringify({ action: 'status', roomId })
          });
          const data = await res.json();
          if (data.error) {
            router.push('/');
          }
        } catch (e) {
          console.error(e);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOnline, roomId, router]);

  const fetchOnlineSummary = async (roomId) => {
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify({ action: 'status', roomId })
      });
      const room = await res.json();
      if (room.results) {
        setPairs(room.results);
        setIsRandomMode(room.isRandomMode);
        setIsHydrated(true);
      } else {
        router.push('/');
      }
    } catch (e) {
      console.error(e);
      router.push('/');
    }
  };

  const loadOfflineSummary = () => {
    const pairsData = localStorage.getItem('secretSantaFinalPairs');
    const savedMode = localStorage.getItem('secretSantaRandomMode');
    
    if (!pairsData) {
      router.push('/');
      return;
    }

    setPairs(JSON.parse(pairsData));
    setIsRandomMode(savedMode === 'true');
    setIsHydrated(true);
  };

  const closeRoom = async () => {
    if (isOnline && roomId && isHost) {
      try {
        await fetch('/api/rooms', {
          method: 'POST',
          body: JSON.stringify({ 
            action: 'leave', 
            roomId, 
            isHost: true 
          })
        });
      } catch (e) {
        console.error("Failed to close room", e);
      }
    }
    router.push('/');
  };

  if (!isHydrated) return null;

  return (
    <main>
      <div className="snow-container"></div>
      <h1>Final Secret Santa List 🎁</h1>

      <div className="summary-container fade-in">
        <div className="summary-list">
          {pairs.map((pair, index) => (
            <div key={index} className="summary-item">
              {isRandomMode && <span className="gift-tag">Gift #{pair.giftNumber} - by {pair.giftOwner || pair.giver}</span>}
              <div className="pair-info">
                <span className="name"><strong>{pair.giver}</strong></span>
                <span className="gives-to">gives to</span>
                <span className="name"><strong>{pair.receiver}</strong></span>
              </div>
            </div>
          ))}
        </div>

        <div className="controls" style={{ flexDirection: 'column', gap: '1rem' }}>
          {isOnline && isHost && (
            <button className="close-room-btn" onClick={closeRoom}>
              Close Room & Back Home 🏠
            </button>
          )}
          <button className="back-btn" onClick={() => router.push('/')}>
            ⬅️ Start New Game
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .summary-container { background: rgba(255, 255, 255, 0.1); padding: 2rem; border-radius: 20px; border: 2px solid #ffd700; box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); width: 100%; box-sizing: border-box; margin-top: 2rem; }
        .summary-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        .summary-item { background: rgba(255, 255, 255, 0.05); padding: 1.2rem; border-radius: 12px; border: 1px solid rgba(255, 215, 0, 0.2); display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .gift-tag { color: #ffd700; font-weight: bold; font-size: 0.8rem; text-transform: uppercase; background: rgba(255, 215, 0, 0.1); padding: 2px 10px; border-radius: 10px; }
        .pair-info { display: flex; align-items: center; justify-content: center; gap: 10px; flex-wrap: wrap; text-align: center; width: 100%; }
        .name { color: #fff; font-size: 1.1rem; word-break: break-word; }
        .gives-to { color: #ffd700; font-size: 0.9rem; font-style: italic; opacity: 0.8; }
        .controls { display: flex; justify-content: center; margin-top: 1rem; align-items: center; }
        .back-btn { background: #d42426; color: white; padding: 12px 24px; border-radius: 30px; border: none; font-size: 1.1rem; cursor: pointer; transition: transform 0.2s, background 0.2s; box-shadow: 0 4px 15px rgba(212, 36, 38, 0.3); width: 100%; }
        .close-room-btn { background: #1a472a; color: #ffd700; padding: 12px 24px; border-radius: 30px; border: 2px solid #ffd700; font-size: 1.1rem; cursor: pointer; transition: transform 0.2s, background 0.2s; box-shadow: 0 4px 15px rgba(26, 71, 42, 0.3); width: 100%; }
        .close-room-btn:hover { transform: scale(1.05); background: #245c38; }
        .back-btn:hover { transform: scale(1.05); background: #b31d1f; }
        @media (max-width: 480px) { .summary-container { padding: 1rem; } }
      `}} />
    </main>
  );
}

export default function Summary() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}
