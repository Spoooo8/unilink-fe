const InputForm = ({ fields, values, setters, onSubmit, title }) => {
  return (
    <div className="w-2/3 max-w-2xl">
      <h2 className="text-3xl font-semibold mb-6">{title}</h2>
      <form className="space-y-5" onSubmit={onSubmit}>
        {fields.map(({ name, label, type = 'text', options, placeholder, rows }) => {
          const value = values[name];
          const setValue = setters[`set${name.charAt(0).toUpperCase() + name.slice(1)}`];

          if (!setValue) return null;

          return (
            <div key={name}>
              <label className="block font-medium mb-2">{label}</label>

              {type === 'select' ? (
                <select
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : type === 'textarea' ? (
                <textarea
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  rows={rows || 4}
                />
              ) : (
                <input
                  type={type}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder={placeholder}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              )}
            </div>
          );
        })}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-gray-800 text-white font-medium py-1.5 px-4 rounded-md hover:bg-gray-700 transition duration-200 text-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
