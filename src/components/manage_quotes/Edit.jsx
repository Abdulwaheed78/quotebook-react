import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";

function Edit({ quoteId, onCancel, onUpdated }) {
  const [formData, setFormData] = useState({
    quote: "",
    category_id: "",
    visibility: "public",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quote details + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("quoteApiToken");

        // fetch categories
        const catRes = await axios.get("http://127.0.0.1:8000/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(catRes.data || []);

        // fetch quote details
        const quoteRes = await axios.get(
          `http://127.0.0.1:8000/api/edit_quotes/${quoteId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFormData({
          quote: quoteRes.data.quote,
          category_id: quoteRes.data.category_id || "",
          visibility: quoteRes.data.visibility || "public",
        });
      } catch (err) {
        console.error("Error fetching quote details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [quoteId]);

  // Handle change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("quoteApiToken");
      await axios.put(
        `http://127.0.0.1:8000/api/update_quotes/${quoteId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Quote updated successfully!");
      onUpdated();
    } catch (err) {
      console.error("Error updating quote:", err);
      alert("Failed to update quote");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-4">
      <form
        className="card p-3 bg-transparent"
        style={{ border: "1px solid black" }}
        onSubmit={handleSubmit}
      >
        <h5>Edit Quote</h5>
        <div className="mb-3">
          <textarea
            placeholder="Quote ..."
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          />
        </div>
        <div className="row">
          <div className=" col-12 col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6 mb-3">
            <label className="form-label">Visibility</label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="form-select"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div className="mt-2 text-end gap-2">
          <button
            type="button"
            className="btn btn-sm btn-outline-danger m-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-sm btn-outline-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
