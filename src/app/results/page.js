'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResultsContent() {
  const [pairs, setPairs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);
  const [displayGiftNumber, setDisplayGiftNumber] = useState(null);
  const [isRandomMode, setIsRandomMode] = useState(true);
  const [isOttMode, setIsOttMode] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const lastIndexRef = useRef(-1);

  useEffect(() => {
    const mode = searchParams.get('mode');
    const rId = searchParams.get('roomId');
    
    if (mode === 'online' && rId) {
      setIsOnline(true);
      setRoomId(rId);
      setIsHost(localStorage.getItem(`host_${rId}`) === 'true');
      fetchOnlineData(rId);
    } else {
      loadOfflineData();
    }
  }, [searchParams]);

  // Polling for online mode
  useEffect(() => {
    if (isOnline && roomId) {
      const interval = setInterval(() => {
        fetchOnlineStatus(roomId);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isOnline, roomId]);

  const fetchOnlineData = async (rId) => {
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify({ action: 'status', roomId: rId })
      });
      const room = await res.json();
      if (room.error) {
        router.push('/');
        return;
      }
      setPairs(room.results);
      setIsRandomMode(room.isRandomMode);
      setIsOttMode(room.isOttMode);
      setLoading(false);
      handleIndexChange(room.revealIndex, room.results, room.isRandomMode);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchOnlineStatus = async (rId) => {
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify({ action: 'status', roomId: rId })
      });
      const room = await res.json();
      if (room.revealIndex !== lastIndexRef.current) {
        handleIndexChange(room.revealIndex, room.results, room.isRandomMode);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleIndexChange = (newIdx, resultPairs, randomMode) => {
    if (newIdx === lastIndexRef.current) return;
    
    const isFirstReveal = lastIndexRef.current === -1;
    lastIndexRef.current = newIdx;
    
    if (newIdx < 0 || !resultPairs[newIdx]) return;

    if (!randomMode) {
      setCurrentIndex(newIdx);
      return;
    }

    setCurrentIndex(newIdx);
    setIsRevealing(true);
    let count = 0;
    const interval = setInterval(() => {
      const pairCount = resultPairs ? resultPairs.length : 0;
      setDisplayGiftNumber(pairCount > 0 ? Math.floor(Math.random() * pairCount) + 1 : 1);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setDisplayGiftNumber(resultPairs[newIdx]?.giftNumber || 1);
        setIsRevealing(false);
      }
    }, 60);
  };

  const loadOfflineData = () => {
    const participantsData = localStorage.getItem('secretSantaParticipants');
    const savedMode = localStorage.getItem('secretSantaRandomMode');
    const randomMode = savedMode === 'true';
    setIsRandomMode(randomMode);

    const savedOttMode = localStorage.getItem('secretSantaOttMode');
    setIsOttMode(savedOttMode === 'true');

    if (!participantsData) {
      router.push('/');
      return;
    }

    const participants = JSON.parse(participantsData);
    if (participants.length < 2) {
      router.push('/');
      return;
    }

    // Use current logic from the previous version (simplified here for brevity as it was already provided)
    // Actually, I should keep the full logic if I'm rewriting the file.
    generateAndSetOfflinePairs(participants, randomMode, savedOttMode === 'true');
  };

  const generateAndSetOfflinePairs = (participants, randomMode, ottMode) => {
    let shuffled = [...participants];
    let valid = false;
    let result = [];
    let attempts = 0;
    while (!valid && attempts < 500) {
      attempts++;
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      let availableGiftIndices = participants.map(p => p.giftIndex);
      if (ottMode) {
        for (let i = availableGiftIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [availableGiftIndices[i], availableGiftIndices[j]] = [availableGiftIndices[j], availableGiftIndices[i]];
        }
      }
      valid = true;
      result = [];
      for (let i = 0; i < participants.length; i++) {
        if ((randomMode && (ottMode ? availableGiftIndices[i] : participants[i].giftIndex) === shuffled[i].giftIndex) || participants[i].name === shuffled[i].name) {
          valid = false; break;
        }
        const assignedGiftIndex = ottMode ? availableGiftIndices[i] : participants[i].giftIndex;
        result.push({ giver: participants[i].name, receiver: shuffled[i].name, giftNumber: randomMode ? assignedGiftIndex : null, giftOwner: participants.find(p => p.giftIndex === assignedGiftIndex).name });
      }
    }
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    setPairs(result);
    localStorage.setItem('secretSantaFinalPairs', JSON.stringify(result));
    setLoading(false);
    handleIndexChange(0, result, randomMode);
  };

  const nextPair = async () => {
    if (currentIndex < (pairs?.length || 0) - 1 && !isRevealing) {
      if (isOnline) {
        setIsRevealing(true); // Immediate feedback
        try {
          await fetch('/api/rooms', {
            method: 'POST',
            body: JSON.stringify({ action: 'revealNext', roomId })
          });
        } catch (e) {
          console.error(e);
          setIsRevealing(false);
        }
        // Polling will update the UI and eventually reset isRevealing
      } else {
        handleIndexChange(currentIndex + 1, pairs, isRandomMode);
      }
    }
  };

  const leaveRoom = async () => {
    if (isOnline && roomId) {
      try {
        const participantData = localStorage.getItem(`participant_${roomId}`);
        const participant = participantData ? JSON.parse(participantData) : null;
        await fetch('/api/rooms', {
          method: 'POST',
          body: JSON.stringify({ 
            action: 'leave', 
            roomId, 
            participantId: participant?.id,
            isHost: isHost
          })
        });
      } catch (e) {
        console.error("Failed to leave room", e);
      }
      router.push('/online');
    } else {
      router.push('/offline');
    }
  };

  const isLast = pairs && currentIndex === pairs.length - 1;

  if (loading) return (
    <main>
      <div className="snow-container"></div>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 className="pulse">Preparing the gifts... 🎁✨</h2>
      </div>
    </main>
  );

  return (
    <main>
      <div className="snow-container"></div>
      <h1>Secret Santa Reveal 🎅</h1>

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
              {(!isOnline || isHost) ? (
                <button className="next-btn" onClick={nextPair} disabled={isRevealing}>
                  {isRevealing ? 'Choosing... 🎲' : 'Next Pair 🎁'}
                </button>
              ) : (
                <p style={{ fontStyle: 'italic', opacity: 0.8 }}>Waiting for host to reveal next pair...</p>
              )}
              <button className="reset-btn" onClick={leaveRoom}>
                {isOnline ? 'Leave Room ⬅️' : 'Reset & Go Back ⬅️'}
              </button>
            </div>
          ) : (
            <div className="end-message">
              <p>All gifts have been assigned! 🎅</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <button className="next-btn" onClick={() => router.push(`/summary${isOnline ? `?mode=online&roomId=${roomId}` : ''}`)}>
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

      <style dangerouslySetInnerHTML={{ __html: `
        .reveal-container { display: flex; flex-direction: column; align-items: center; gap: 2rem; margin-top: 2rem; }
        .pair-card { background: rgba(255, 255, 255, 0.1); padding: 2.5rem; border-radius: 20px; border: 2px solid #ffd700; box-shadow: 0 0 20px rgba(255, 215, 0, 0.3); text-align: center; width: 100%; box-sizing: border-box; }
        .gift-number { font-size: 1.5rem; color: #ffd700; margin-bottom: 1.5rem; font-weight: bold; text-transform: uppercase; }
        .names { display: flex; justify-content: space-around; align-items: center; gap: 1rem; }
        .person { display: flex; flex-direction: column; word-break: break-word; max-width: 100%; }
        .label { font-size: 0.8rem; text-transform: uppercase; opacity: 0.8; margin-bottom: 0.5rem; }
        .name { font-size: 1.8rem; color: #fff; }
        .arrow { font-size: 2rem; color: #ff4d4d; }
        .next-btn { background: #ff4d4d; color: white; border: none; padding: 1rem 2.5rem; border-radius: 50px; font-size: 1.2rem; cursor: pointer; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(255, 77, 77, 0.4); }
        .next-btn:hover:not(:disabled) { transform: scale(1.05); }
        .next-btn:disabled { background: #ccc; cursor: not-allowed; }
        .reset-btn { background: transparent; color: #f8e3a1; border: 1px solid #f8e3a1; padding: 0.5rem 1.5rem; border-radius: 50px; font-size: 0.9rem; cursor: pointer; margin-top: 0.5rem; }
        .pulse { animation: pulse 1.5s infinite; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
        .shuffling-gift { border-color: #ffd700; box-shadow: 0 0 30px rgba(255, 215, 0, 0.5); }
        .gift-number.animating { animation: shake 0.1s infinite; color: #ff4d4d; }
        @keyframes shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          25% { transform: translate(-1px, -1px) rotate(-1deg); }
          50% { transform: translate(-1px, 1px) rotate(1deg); }
          75% { transform: translate(1px, -1px) rotate(0deg); }
          100% { transform: translate(1px, 1px) rotate(1deg); }
        }
        .fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 600px) {
          .names { flex-direction: column; gap: 1.5rem; }
          .arrow { transform: rotate(90deg); }
          .name { font-size: 1.5rem; }
        }
      `}} />
    </main>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
