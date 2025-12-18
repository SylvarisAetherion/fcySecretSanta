import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = (redisUrl && redisToken) 
  ? new Redis({ url: redisUrl, token: redisToken })
  : null;

export async function GET() {
  try {
    if (!redis) {
      console.error('Redis configuration missing');
      return NextResponse.json([]);
    }
    // Get all room IDs from the 'rooms_list' set
    const roomIds = await redis.smembers('rooms_list');
    
    if (!roomIds || roomIds.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch all room data in parallel
    const roomData = await Promise.all(
      roomIds.map(id => redis.get(`room:${id}`))
    );

    // Filter out any null values and format for the list
    const roomList = roomData
      .filter(r => r !== null)
      .map(r => ({
        id: r.id,
        name: r.name,
        participantCount: r.participants?.length || 0,
        isStarted: r.isStarted
      }));

    return NextResponse.json(roomList);
  } catch (error) {
    console.error('Redis error:', error);
    // Fallback to empty list if Redis is not configured or fails
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  const body = await request.json();
  const { action, roomId, participantName, roomName, isRandomMode, isOttMode, participantId, isHost } = body;

  try {
    if (!redis) {
      console.error('Redis configuration missing');
      return NextResponse.json({ 
        error: 'Upstash Redis configuration missing. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.' 
      }, { status: 500 });
    }

    if (action === 'create') {
      const id = Math.random().toString(36).substring(2, 8).toUpperCase();
      const newRoom = {
        id,
        name: roomName || `Room ${id}`,
        participants: [],
        hostId: Math.random().toString(36).substring(2),
        isStarted: false,
        isRandomMode: isRandomMode ?? true,
        isOttMode: isOttMode ?? false,
        results: null,
        revealIndex: -1,
        createdAt: new Date()
      };
      
      // Save room data and add to the room list set
      await redis.set(`room:${id}`, newRoom);
      await redis.sadd('rooms_list', id);
      
      return NextResponse.json(newRoom);
    }

    if (action === 'join') {
      const room = await redis.get(`room:${roomId}`);
      if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
      if (room.isStarted) return NextResponse.json({ error: 'Game already started' }, { status: 400 });

      const giftIndex = (room.participants?.length || 0) + 1;
      const participant = {
        id: Math.random().toString(36).substring(2),
        name: participantName,
        giftIndex
      };
      if (!room.participants) room.participants = [];
      room.participants.push(participant);
      
      await redis.set(`room:${roomId}`, room);
      return NextResponse.json({ room, participant });
    }

    if (action === 'status') {
      const room = await redis.get(`room:${roomId}`);
      if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
      return NextResponse.json(room);
    }

    if (action === 'start') {
      const room = await redis.get(`room:${roomId}`);
      if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
      
      if (!room.participants || room.participants.length < 2) {
        return NextResponse.json({ error: 'Need at least 2 participants' }, { status: 400 });
      }

      room.isStarted = true;
      room.results = generatePairs(room.participants, room.isRandomMode, room.isOttMode);
      room.revealIndex = 0; // Show first pair immediately
      
      await redis.set(`room:${roomId}`, room);
      return NextResponse.json(room);
    }

    if (action === 'revealNext') {
      const room = await redis.get(`room:${roomId}`);
      if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
      
      if (room.results && room.revealIndex < room.results.length - 1) {
        room.revealIndex++;
        await redis.set(`room:${roomId}`, room);
      }
      return NextResponse.json(room);
    }

    if (action === 'leave') {
      const room = await redis.get(`room:${roomId}`);
      if (!room) return NextResponse.json({ success: true }); // Already gone

      if (isHost) {
        // Delete room if host leaves
        await redis.del(`room:${roomId}`);
        await redis.srem('rooms_list', roomId);
        return NextResponse.json({ success: true, closed: true });
      } else {
        // Remove participant
        if (room.participants) {
          room.participants = room.participants.filter(p => p.id !== participantId);
          // Re-index remaining participants to keep gift indices consistent? 
          // User said "index of their gift will be the time they join", 
          // usually it's better to keep them stable but if they leave we might want to fill the gap.
          // However, keeping it simple: just remove them.
          await redis.set(`room:${roomId}`, room);
        }
        return NextResponse.json({ success: true, room });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json({ error: 'Data store error' }, { status: 500 });
  }
}

function generatePairs(participants, randomMode, ottMode) {
  if (!participants || participants.length < 2) return null;

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
      const giver = participants[i];
      const receiver = shuffled[i];
      const assignedGiftIndex = ottMode ? availableGiftIndices[i] : giver.giftIndex;

      if (randomMode && assignedGiftIndex === receiver.giftIndex) {
        valid = false;
        break;
      }
      if (giver.name === receiver.name) {
        valid = false;
        break;
      }
      result.push({ 
        giver: giver.name, 
        receiver: receiver.name, 
        giftNumber: randomMode ? assignedGiftIndex : null,
        giftOwner: participants.find(p => p.giftIndex === assignedGiftIndex).name
      });
    }
  }

  if (!valid) return null;

  // Shuffle reveals
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
