import "../styles/SearchBar.css";

const SearchBar = ({ input, setInput }) => {
  const handleInputChange = async (e) => {
    setInput(e.target.value); // Mise à jour du state avec la saisie utilisateur
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Veuillez entrer un produit"
        value={input}
        onChange={handleInputChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
