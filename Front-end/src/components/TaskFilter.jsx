// components/TaskFilter.jsx
const TaskFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <section className="mb-16">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <label className="block font-bold text-gray-700 text-lg">Filter by Category</label>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 bg-white/80 backdrop-blur-sm appearance-none"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default TaskFilter;
