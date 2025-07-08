import React from 'react';
import Select from 'react-select';

const InputForm = ({ fields, values, setters, onSubmit, title, isDisabled = false }) => {
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
                  disabled={isDisabled}
                  className={`w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  {options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : type === 'multi-select' ? (
                <Select
                  isMulti
                  options={options}
                  placeholder="Select Scopes"
                  value={options.filter(opt => value.includes(opt.value))}
                  onChange={selectedOptions => {
                    const selectedIds = selectedOptions.map(opt => opt.value);
                    setValue(selectedIds);
                  }}
                  isDisabled={isDisabled}
                />
              ) : type === 'textarea' ? (
                <textarea
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  className={`w-full p-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  rows={rows || 4}
                />
              ) : (
                <input
                  type={type}
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  className={`w-full p-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                />
              )}
            </div>
          );
        })}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isDisabled}
            className={`bg-gray-800 text-white font-medium py-1.5 px-4 rounded-md transition duration-200 text-sm ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
