import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OneRoom = () => {
  const { id } = useParams(); // A terem ID-je a paraméterekből
  const [rooms, setRooms] = useState([]); // Több terem adatait tároljuk itt
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms`);
        if (!response.ok) {
          throw new Error('Hiba történt a terem adatainak betöltésekor.');
        }
        const data = await response.json();
        setRooms(data); // Az összes terem adatát eltároljuk
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRoomData();
  }, []); // A fetch nem függ a terem ID-jától

  // Szűrés az összes terem adatai közül a megfelelő ID-jú teremre
  const room = rooms.find((r) => r.id === parseInt(id));

  if (error) {
    return <div>Hiba: {error}</div>;
  }

  if (!room) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="one-room">
      <h2>{room.name}</h2>
      <p><strong>Méret:</strong> {room.size}</p>
      <p><strong>Óradíj:</strong> {room.price_per_hour} Ft</p>
      <p><strong>Leírás:</strong> {room.description}</p>

      <h3>Felszerelés</h3>

      {/* Mikrofonok */}
      {room.equipment?.microphones && (
        <div>
          <h4>Mikrofonok</h4>
          <p><strong>Márka:</strong> {room.equipment.microphones.brand}</p>
          <p><strong>Modellek:</strong> {room.equipment.microphones.models.join(', ')}</p>
          <p>{room.equipment.microphones.description}</p>
        </div>
      )}

      {/* Dobok */}
      {room.equipment?.drums && (
        <div>
          <h4>Dobok</h4>
          <p><strong>Cintányérok</strong></p>
          <p><strong>Márka:</strong> {room.equipment.drums.cymbals.brand}</p>
          <p><strong>Modellek:</strong> {room.equipment.drums.cymbals.models.join(', ')}</p>
          <p>{room.equipment.drums.cymbals.description}</p>
          <p><strong>Pergő:</strong> {room.equipment.drums.snare.brand} {room.equipment.drums.snare.model}, {room.equipment.drums.snare.size}</p>
          <p>{room.equipment.drums.snare.description}</p>
          <p><strong>Basszusdob:</strong> {room.equipment.drums.bass_drum.brand} {room.equipment.drums.bass_drum.model}, {room.equipment.drums.bass_drum.size}</p>
          <p>{room.equipment.drums.bass_drum.description}</p>
        </div>
      )}

      {/* Gitárerősítő */}
      {room.equipment?.guitar_amp && (
        <div>
          <h4>Gitárerősítő</h4>
          <p><strong>Márka:</strong> {room.equipment.guitar_amp.brand}</p>
          <p><strong>Modell:</strong> {room.equipment.guitar_amp.model}</p>
          <p><strong>Teljesítmény:</strong> {room.equipment.guitar_amp.power}</p>
          <p>{room.equipment.guitar_amp.description}</p>
        </div>
      )}

      {/* Basszusgitár erősítő */}
      {room.equipment?.bass_amp && (
        <div>
          <h4>Basszusgitár erősítő</h4>
          <p><strong>Márka:</strong> {room.equipment.bass_amp.brand}</p>
          <p><strong>Modell:</strong> {room.equipment.bass_amp.model}</p>
          <p><strong>Teljesítmény:</strong> {room.equipment.bass_amp.power}</p>
          <p>{room.equipment.bass_amp.description}</p>
        </div>
      )}

      {/* PA rendszer */}
      {room.equipment?.pa_system && (
        <div>
          <h4>PA rendszer</h4>
          <p><strong>Márka:</strong> {room.equipment.pa_system.brand}</p>
          <p><strong>Modell:</strong> {room.equipment.pa_system.model}</p>
          <p><strong>Teljesítmény:</strong> {room.equipment.pa_system.power}</p>
          <p>{room.equipment.pa_system.description}</p>
        </div>
      )}
    </div>
  );
}

export default OneRoom;
