import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

const categories = [
  { name: "All" },
  { name: "Vegetables" },
  { name: "Fruits" },
  { name: "DryFruits" },
];

const products = [
  { id: 1, category: "Vegetables", name: "Papaya", price: 50 },
  { id: 2, category: "Vegetables", name: "BottleGourd", price: 40 },
  { id: 3, category: "Vegetables", name: "RidgeGourd", price: 40 },
  { id: 4, category: "Vegetables", name: "Carrot", price: 30 },
  { id: 5, category: "Fruits", name: "Apple", price: 160 },
  { id: 6, category: "Fruits", name: "Guava", price: 50 },
  { id: 7, category: "Fruits", name: "Pomegranate", price: 180 },
  { id: 8, category: "DryFruits", name: "Dates", price: 200 },
  { id: 9, category: "DryFruits", name: "Almonds", price: 300 },
  { id: 10, category: "DryFruits", name: "Peanuts", price: 100 },
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    let filtered = products;

    // ✅ Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        item => item.category === selectedCategory
      );
    }

    // ✅ Filter by search
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    // ✅ Sort by price
    if (sortOrder === "low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredItems(filtered);
  }, [query, selectedCategory, sortOrder]);

  return (
    <div style={{ display: "flex", flexDirection: "column", margin:"0 auto" , }}>
      
      <div style={styles.toolbar}>
  
  {/*Search */}
  <input
    type="text"
    placeholder="Search products..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    style={styles.searchInput}
  />

  {/* 🔽 Sort */}
  <div style={styles.sortContainer}>
    <button 
      style={styles.sortButton} 
      onClick={() => setSortOrder("low")}
    >
      ↑ Price
    </button>
    <button 
      style={styles.sortButton} 
      onClick={() => setSortOrder("high")}
    >
      ↓ Price
    </button>
  </div>

  {/* Category Filter */}
  <div style={styles.categoryContainer}>
    {categories.map(category => (
      <button
        key={category.name}
        onClick={() => setSelectedCategory(category.name)}
        style={{
          ...styles.categoryButton,
          backgroundColor:
            selectedCategory === category.name ? "#2563eb" : "#f1f5f9",
          color:
            selectedCategory === category.name ? "#fff" : "#333",
        }}
      >
        {category.name}
      </button>
    ))}
  </div>

</div>

      {/* 🛒 Products */}
      <div style={{ display: "flex",justifyContent:"center", flexWrap: "wrap", gap: "15px" ,padding:"0 25px"}}>
        {filteredItems.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
};

export default Home;

const styles = {
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    padding: "15px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "20px",
  },

  searchInput: {
    flex: "1",
    minWidth: "200px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
  },

  sortContainer: {
    display: "flex",
    gap: "10px",
  },

  sortButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#e2e8f0",
    cursor: "pointer",
    fontWeight: "500",
  },

  categoryContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  categoryButton: {
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    transition: "0.2s",
  },
};