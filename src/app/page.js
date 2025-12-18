'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretSanta() {
  const [participants, setParticipants] = useState([]);
  const [newName, setNewName] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('secretSantaParticipants');
    if (saved) {
      setParticipants(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('secretSantaParticipants', JSON.stringify(participants));
    }
  }, [participants, isHydrated]);

  const addParticipant = (e) => {
    if (e) e.preventDefault();
    const nameToAdd = newName.trim();
    if (nameToAdd !== '') {
      setParticipants(prev => [...prev, nameToAdd]);
      setNewName('');
    }
  };

  const removeParticipant = (index) => {
    const updated = [...participants];
    updated.splice(index, 1);
    setParticipants(updated);
  };

  const removeAll = () => {
    setShowConfirmModal(true);
  };

  const confirmRemoveAll = () => {
    setParticipants([]);
    setShowConfirmModal(false);
  };

  const startGame = () => {
    if (participants.length < 2) {
      alert('Need at least 2 participants');
      return;
    }

    router.push('/results');
  };

  if (!isHydrated) return null;

  return (
    <main>
      <div className="snow-container"></div>
      <h1>🎄 FCY Secret Santa </h1>
      
      <form className="input-group" onSubmit={addParticipant}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter participant name"
        />
        <button type="submit">Add</button>
      </form>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '400px', margin: '0 auto', gap: '10px', flexWrap: 'wrap' }}>
        <h3>Participants ({participants.length})</h3>
        {participants.length > 0 && (
          <button 
            onClick={removeAll}
            className="remove-all-btn"
          >
            Remove All
          </button>
        )}
      </div>

      <ul>
        {participants.map((name, index) => (
          <li key={index} style={{ wordBreak: 'break-word' }}>
            {name}
            <button 
              onClick={() => removeParticipant(index)}
              style={{ padding: '4px 8px', background: 'transparent', color: '#f8e3a1', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {participants.length >= 2 && (
        <button className="start-btn" onClick={startGame}>
          Start Game ✨
        </button>
      )}

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Clear All Participants? 🎅</h3>
            <p>This will remove everyone from the list. Are you sure?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmRemoveAll}>Remove All</button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .modal-content {
          background: #1a472a;
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid #ffd700;
          text-align: center;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
          animation: modalAppear 0.3s ease-out;
        }
        @keyframes modalAppear {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-content h3 {
          color: #ffd700;
          margin-top: 0;
        }
        .modal-content p {
          color: #f8e3a1;
          margin-bottom: 2rem;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .modal-actions button {
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.2s;
        }
        .modal-actions button:hover {
          transform: scale(1.05);
        }
        .cancel-btn {
          background: transparent;
          color: #f8e3a1;
          border: 1px solid #f8e3a1;
        }
        .confirm-btn {
          background: #ff4d4d;
          color: white;
          border: none;
          box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
        }
        .remove-all-btn {
          background: transparent;
          color: #ff4d4d;
          border: 1px solid #ff4d4d;
          padding: 4px 12px;
          borderRadius: 20px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: background 0.2s;
        }
        .remove-all-btn:hover {
          background: rgba(255, 77, 77, 0.1);
        }
        @media (max-width: 480px) {
          .input-group {
            flex-direction: column;
            width: 100%;
          }
          .input-group input {
            border-radius: 50px;
            margin-bottom: 0.5rem;
          }
          .input-group button {
            border-radius: 50px;
            width: 100%;
          }
          h1 {
            font-size: 1.8rem;
          }
        }
      `}} />
    </main>
  );
}
