'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretSanta() {
  const [participants, setParticipants] = useState([]);
  const [newName, setNewName] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isRandomMode, setIsRandomMode] = useState(true);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const [showIndices, setShowIndices] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('secretSantaParticipants');
    if (saved) {
      setParticipants(JSON.parse(saved));
    }
    const savedMode = localStorage.getItem('secretSantaRandomMode');
    if (savedMode !== null) {
      setIsRandomMode(savedMode === 'true');
    }
    const savedShowIndices = localStorage.getItem('secretSantaShowIndices');
    if (savedShowIndices !== null) {
      setShowIndices(savedShowIndices === 'true');
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('secretSantaParticipants', JSON.stringify(participants));
      localStorage.setItem('secretSantaRandomMode', isRandomMode.toString());
      localStorage.setItem('secretSantaShowIndices', showIndices.toString());
    }
  }, [participants, isRandomMode, showIndices, isHydrated]);

  const addParticipant = (e) => {
    if (e) e.preventDefault();
    const nameToAdd = newName.trim();
    if (nameToAdd !== '') {
      // Find the next available gift index
      const maxIndex = participants.length > 0 
        ? Math.max(...participants.map(p => p.giftIndex))
        : 0;
      setParticipants(prev => [...prev, { name: nameToAdd, giftIndex: maxIndex + 1 }]);
      setNewName('');
    }
  };

  const removeParticipant = (index) => {
    const updated = [...participants];
    updated.splice(index, 1);
    setParticipants(updated);
  };

  const updateGiftIndex = (index, newGiftIndex) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], giftIndex: parseInt(newGiftIndex) || 0 };
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

    // Validate unique names
    const names = participants.map(p => p.name.toLowerCase().trim());
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== participants.length) {
      alert('Each participant must have a unique name.');
      return;
    }

    // Validate unique gift indices
    if (isRandomMode) {
      const indices = participants.map(p => p.giftIndex);
      const uniqueIndices = new Set(indices);
      if (uniqueIndices.size !== participants.length) {
        alert('Each participant must have a unique Gift #.');
        return;
      }
    }

    router.push('/results');
  };

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // For Firefox support
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updated = [...participants];
    const itemToMove = updated[draggedItemIndex];
    updated.splice(draggedItemIndex, 1);
    updated.splice(index, 0, itemToMove);
    
    setDraggedItemIndex(index);
    setParticipants(updated);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  if (!isHydrated) return null;

  return (
    <main>
      <div className="snow-container"></div>
      <h1>🎄 FCY Secret Santa </h1>
      
      <div className="mode-selection" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <span>Standard</span>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={isRandomMode} 
            onChange={(e) => setIsRandomMode(e.target.checked)} 
          />
          <span className="slider round"></span>
        </label>
        <span>Randomize Gift</span>
      </div>
      
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3>Participants ({participants.length})</h3>
          {isRandomMode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '5px' }}>
              <span style={{ fontSize: '0.7rem', opacity: 0.7, color: '#ffd700', textTransform: 'uppercase', letterSpacing: '1px' }}>Indices</span>
              <label className="switch" style={{ transform: 'scale(0.7)' }}>
                <input 
                  type="checkbox" 
                  checked={showIndices} 
                  onChange={(e) => setShowIndices(e.target.checked)} 
                />
                <span className="slider round"></span>
              </label>
            </div>
          )}
        </div>
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
        {participants.map((participant, index) => (
          <li 
            key={index} 
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={draggedItemIndex === index ? 'dragging' : ''}
            style={{ 
              wordBreak: 'break-word', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              cursor: 'grab'
            }}
          >
            <span style={{ color: '#ffd700', opacity: 0.5, fontSize: '0.8rem', cursor: 'move' }}>☰</span>
            <span style={{ flex: 1 }}>{participant.name}</span>
            {isRandomMode && showIndices && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Gift #</span>
                <input
                  type="number"
                  value={participant.giftIndex}
                  onChange={(e) => updateGiftIndex(index, e.target.value)}
                  style={{ 
                    width: '50px', 
                    padding: '2px 5px', 
                    background: 'rgba(255,255,255,0.1)', 
                    border: '1px solid #ffd700', 
                    color: '#fff',
                    borderRadius: '4px'
                  }}
                />
              </div>
            )}
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
        
        li.dragging {
          opacity: 0.5;
          background: rgba(255, 215, 0, 0.1);
          border: 1px dashed #ffd700;
        }

        /* Toggle Switch */
        .switch {
          position: relative;
          display: inline-block;
          width: 50px;
          height: 24px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255, 255, 255, 0.1);
          transition: .4s;
          border: 1px solid #ffd700;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: #ffd700;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: #1a472a;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 24px;
        }
        .slider.round:before {
          border-radius: 50%;
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
