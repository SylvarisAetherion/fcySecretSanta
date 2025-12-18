'use client';

import { useRouter } from 'next/navigation';

export default function ModeSelection() {
  const router = useRouter();

  return (
    <main>
      <div className="snow-container"></div>
      <h1>🎄 FCY Secret Santa</h1>
      
      <div className="mode-container fade-in">
        <p className="description">Choose how you want to play this year!</p>
        
        <div className="selection-grid">
          <div className="mode-card" onClick={() => router.push('/offline')}>
            <div className="icon">🏠</div>
            <h3>Offline Mode</h3>
            <p>Perfect for when everyone is together. Manage participants on one device.</p>
            <button className="select-btn">Start Offline</button>
          </div>

          <div className="mode-card" onClick={() => router.push('/online')}>
            <div className="icon">🌐</div>
            <h3>Online Mode</h3>
            <p>Join from your own device! Create a room and invite your friends.</p>
            <button className="select-btn">Go Online</button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mode-container {
          text-align: center;
          margin-top: 2rem;
        }
        .description {
          color: #f8e3a1;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }
        .selection-grid {
          display: flex;
          gap: 1.5rem;
          flex-direction: column;
        }
        .mode-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 20px;
          border: 2px solid #ffd700;
          cursor: pointer;
          transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .mode-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
        .mode-card .icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .mode-card h3 {
          margin: 0;
          color: #ffd700;
        }
        .mode-card p {
          font-size: 0.9rem;
          color: #fff;
          opacity: 0.8;
          margin: 0;
          line-height: 1.4;
        }
        .select-btn {
          margin-top: 10px;
          pointer-events: none; /* Let the card click handle it */
        }
        @media (min-width: 600px) {
          .selection-grid {
            flex-direction: row;
          }
          .mode-card {
            flex: 1;
          }
        }
      `}} />
    </main>
  );
}
