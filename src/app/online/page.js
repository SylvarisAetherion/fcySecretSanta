'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OnlineMode() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [myParticipant, setMyParticipant] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [participantName, setParticipantName] = useState('');
  const [hostAlsoParticipant, setHostAlsoParticipant] = useState(true);
  const [isRandomMode, setIsRandomMode] = useState(true);
  const [isOttMode, setIsOttMode] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentRoom && !currentRoom.isStarted) {
      const interval = setInterval(async () => {
        const res = await fetch('/api/rooms', {
          method: 'POST',
          body: JSON.stringify({ action: 'status', roomId: currentRoom.id })
        });
        const data = await res.json();
        if (data.isStarted) {
          router.push(`/results?mode=online&roomId=${currentRoom.id}`);
        } else {
          setCurrentRoom(data);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentRoom, router]);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (e) {
      console.error("Failed to fetch rooms", e);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (e) => {
    e.preventDefault();
    if (!participantName) {
      alert("Please enter your name first!");
      return;
    }
    const res = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'create', 
        roomName: roomName || `${participantName}'s Room`,
        isRandomMode,
        isOttMode
      })
    });
    const room = await res.json();
    setCurrentRoom(room);
    setIsHost(true);
    localStorage.setItem(`host_${room.id}`, 'true');

    if (hostAlsoParticipant) {
      await joinRoom(room.id, participantName);
    }
  };

  const joinRoom = async (roomId, name) => {
    const res = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify({ action: 'join', roomId, participantName: name || participantName })
    });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }
    setCurrentRoom(data.room);
    setMyParticipant(data.participant);
    localStorage.setItem(`participant_${roomId}`, JSON.stringify(data.participant));
  };

  const startGame = async () => {
    if (!currentRoom?.participants || currentRoom.participants.length < 2) {
      alert("Need at least 2 participants");
      return;
    }
    setIsStarting(true);
    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify({ action: 'start', roomId: currentRoom.id })
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
        setIsStarting(false);
      } else {
        router.push(`/results?mode=online&roomId=${currentRoom.id}`);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to start game");
      setIsStarting(false);
    }
  };

  const leaveRoom = async () => {
    if (currentRoom) {
      try {
        await fetch('/api/rooms', {
          method: 'POST',
          body: JSON.stringify({ 
            action: 'leave', 
            roomId: currentRoom.id, 
            participantId: myParticipant?.id,
            isHost: isHost
          })
        });
      } catch (e) {
        console.error("Failed to leave room", e);
      }
    }
    setCurrentRoom(null);
    setMyParticipant(null);
    setIsHost(false);
  };

  if (loading) return <main><div className="snow-container"></div><h1>Loading Rooms... ❄️</h1></main>;

  if (currentRoom) {
    return (
      <main>
        <div className="snow-container"></div>
        <h1>🎄 Room: {currentRoom.name}</h1>
        <div className="room-info" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p>Room ID: <strong>{currentRoom.id}</strong></p>
          <p>Share this ID with your friends!</p>
        </div>

        <div className="participants-list">
          <h3>Participants ({currentRoom.participants?.length || 0})</h3>
          <ul>
            {currentRoom.participants?.map((p, i) => (
              <li key={p.id}>
                <span>{p.name}</span>
                <span className="gift-tag">Gift #{p.giftIndex}</span>
              </li>
            ))}
          </ul>
        </div>

        {isHost ? (
          <div className="controls" style={{ marginTop: '20px' }}>
            <button className="start-btn" onClick={startGame} disabled={isStarting}>
              {isStarting ? 'Starting... ✨' : 'Start Game ✨'}
            </button>
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontStyle: 'italic', opacity: 0.8 }}>
            Waiting for the host to start the game...
          </p>
        )}

        <button className="back-btn" onClick={leaveRoom}>Leave Room</button>

        <style dangerouslySetInnerHTML={{ __html: `
          .gift-tag {
            font-size: 0.8rem;
            color: #ffd700;
            background: rgba(255,215,0,0.1);
            padding: 2px 8px;
            border-radius: 10px;
          }
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}} />
      </main>
    );
  }

  return (
    <main>
      <div className="snow-container"></div>
      <h1>🌐 Online Secret Santa</h1>

      <div className="online-container fade-in">
        <div className="global-name-input" style={{ marginBottom: '2rem' }}>
          <h3>Enter your name to join or create a room:</h3>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={participantName} 
            onChange={e => setParticipantName(e.target.value)} 
          />
        </div>

        {rooms.length > 0 ? (
          <div className="rooms-section">
            <h3>Active Rooms</h3>
            <div className="room-grid">
              {rooms.map(room => (
                <div key={room.id} className="room-card">
                  <div>
                    <strong>{room.name}</strong>
                    <p>{room.participantCount} participants • {room.isStarted ? 'Started' : 'Waiting'}</p>
                  </div>
                  {!room.isStarted && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Join</span>
                      <label className="switch" style={{ transform: 'scale(0.8)' }}>
                        <input 
                          type="checkbox" 
                          onChange={(e) => {
                            if (e.target.checked) {
                              if (!participantName) {
                                alert("Please enter your name first!");
                                e.target.checked = false;
                                return;
                              }
                              joinRoom(room.id, participantName);
                            }
                          }} 
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-rooms">
            <p>No active rooms found. Be the first to create one!</p>
          </div>
        )}

        <hr style={{ margin: '2rem 0', opacity: 0.2 }} />

        <form className="create-room-form" onSubmit={createRoom}>
          <h3>Create a New Room</h3>
          
          <input 
            type="text" 
            placeholder="Room Name (Optional)" 
            value={roomName} 
            onChange={e => setRoomName(e.target.value)} 
          />

          <div className="mode-selection" style={{ margin: '15px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
               <span>Host Only</span>
               <label className="switch">
                 <input type="checkbox" checked={hostAlsoParticipant} onChange={e => setHostAlsoParticipant(e.target.checked)} id="host-role" />
                 <span className="slider round"></span>
               </label>
               <span>I am also a participant</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span>Standard</span>
              <label className="switch">
                <input type="checkbox" checked={isRandomMode} onChange={e => setIsRandomMode(e.target.checked)} />
                <span className="slider round"></span>
              </label>
              <span>Randomize Gift</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span>Single</span>
              <label className="switch">
                <input type="checkbox" checked={isOttMode} onChange={e => setIsOttMode(e.target.checked)} />
                <span className="slider round"></span>
              </label>
              <span>OTT Mode</span>
            </div>
          </div>

          <button type="submit" className="start-btn">Create & Join Room 🎅</button>
        </form>
      </div>

      <button className="back-btn" onClick={() => router.push('/')}>⬅️ Back to Home</button>

      <style dangerouslySetInnerHTML={{ __html: `
        .room-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .room-card {
          background: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 12px;
          border: 1px solid rgba(255,215,0,0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .room-card p {
          margin: 0;
          font-size: 0.8rem;
          opacity: 0.7;
        }
        .create-room-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .create-room-form input[type="text"] {
          width: 100%;
          box-sizing: border-box;
        }
        /* Toggle Switch Styles (copied for consistency) */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .switch input {
          opacity: 0; width: 0; height: 0;
        }
        .slider {
          position: absolute; cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(255,255,255,0.1);
          transition: .4s; border: 1px solid #ffd700;
        }
        .slider:before {
          position: absolute; content: "";
          height: 16px; width: 16px; left: 3px; bottom: 3px;
          background-color: #ffd700; transition: .4s;
        }
        input:checked + .slider { background-color: #1a472a; }
        input:checked + .slider:before { transform: translateX(26px); }
        .slider.round { border-radius: 24px; }
        .slider.round:before { border-radius: 50%; }
      `}} />
    </main>
  );
}
