import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";

function Create() {
  const [formData, setFormData] = useState({
    quote: "",
    category_id: "",
    visibility: "private",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("quoteApiToken");

    // Fetch categories
    axios
      .get("http://127.0.0.1:8000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem("quoteApiToken");

    try {
      await axios.post("http://127.0.0.1:8000/api/create_quotes", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Quote created successfully!");
      // Reset form
      setFormData({ quote: "", category_id: "", visibility: "private" });
    } catch (err) {
      if (err.response && err.response.data) {
        console.error("Validation errors:", err.response.data);
        alert(JSON.stringify(err.response.data.errors || err.response.data));
      } else {
        console.error("Error saving quote:", err);
        alert("Something went wrong while saving!");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading message="Please wait while loading ..." />;

  return (
    <div className="bg-transparent mt-4">
      <form
        onSubmit={handleSubmit}
        className="card p-3 bg-transparent"
        style={{ border: "1px solid black" }}
      >
        <h5>Create Quote</h5>

        {/* Quote Text */}
        <div className="mb-3">

          <textarea
          placeholder="Enter Quote..."
            className="form-control"
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        {/* Category + Visibility in one row */}
        <div className="row mb-3">
          {/* Category Select */}
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
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

          {/* Visibility Select */}
          <div className="col-md-6">
            <label className="form-label">Visibility</label>
            <select
              className="form-select"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="row text-end mt-2">
          <div>
            <button
              type="submit"
              className="btn btn-dark btn-sm"
              disabled={saving}
            >
              {saving ? "Saving..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
