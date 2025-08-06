export default function CharacterSelector({ character, setCharacter }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Επέλεξε χαρακτήρα:</label>
      <select value={character} onChange={(e) => setCharacter(e.target.value)}>
        <option value="FunnyGuy">😄 Αστείος</option>
        <option value="GossipGirl">🗣 Κουτσομπόλα</option>
        <option value="AngryMan">😡 Νευρικός</option>
        <option value="ColdRealist">🧊 Ψυχρός Ρεαλιστής</option>
        <option value="LoverGirl">💋 Ερωτική</option>
        <option value="LazyDude">🛋 Τεμπέλης</option>
        <option value="IronicLady">😏 Ειρωνική</option>
      </select>
    </div>
  );
}