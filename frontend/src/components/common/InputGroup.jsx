const InputGroup = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input 
      className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 shadow-sm"
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
    />
  </div>
);

export default InputGroup;