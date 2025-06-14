import React, { useState } from 'react';

const StepForm = ({
  steps,
  fieldsPerStep,
  values,
  setters,
  onSubmit,
  successOpen,
  setSuccessOpen,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [dropdownStates, setDropdownStates] = useState({});

  const getSetter = (name) =>
    setters[`set${name[0].toUpperCase() + name.slice(1)}`];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const setter = getSetter(name);
    if (setter) setter(value);
  };

  const toggleMultiOption = (fieldName, val) => {
    const setter = getSetter(fieldName);
    const currentValue = values[fieldName] || [];
    if (!setter) return;

    if (currentValue.includes(val)) {
      setter(currentValue.filter((v) => v !== val));
    } else {
      setter([...currentValue, val]);
    }
  };

  const toggleDropdown = (fieldName) => {
    setDropdownStates((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <div className="w-4/5 min-h-[85vh] mx-auto bg-white p-12 rounded-lg shadow-lg">
      {/* Stepper */}
      <div className="flex justify-between mb-10">
        {steps.map((label, idx) => (
          <div key={label} className="flex-1 text-center relative">
            <div
              className={`w-8 h-8 mx-auto rounded-full text-white flex items-center justify-center 
              ${idx <= activeStep ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              {idx + 1}
            </div>
            <div className="text-sm mt-2">{label}</div>
            {idx < steps.length - 1 && (
              <div className="absolute top-4 right-0 w-full border-t-2 border-gray-300 z-[-1]"></div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        {fieldsPerStep[activeStep].map((field) => {
          const {
            name,
            label,
            type,
            options = [],
            multiline,
            rows,
            placeholder,
          } = field;
          const value = values[name] || [];
          const setter = getSetter(name);
          if (!setter) return null;

          if (type === 'select') {
            return (
              <div key={name} className="mb-5">
                <label className="block text-gray-700 font-medium mb-2">
                  {label}
                </label>
                <select
                  name={name}
                  value={value}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select an option</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (type === 'multiselect') {
            const isOpen = dropdownStates[name] || false;

            return (
              <div key={name} className="mb-5 relative">
                <label className="block text-gray-700 font-medium mb-2">
                  {label}
                </label>
                <div
                  onClick={() => toggleDropdown(name)}
                  className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {value.length > 0 ? value.join(', ') : 'Select options'}
                </div>

                {isOpen && (
                  <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow z-10 max-h-60 overflow-y-auto">
                    {options.map((opt) => (
                      <div
                        key={opt.value}
                        className={`px-4 py-2 hover:bg-indigo-100 cursor-pointer ${
                          value.includes(opt.value) ? 'bg-indigo-50' : ''
                        }`}
                        onClick={() => toggleMultiOption(name, opt.value)}
                      >
                        <input
                          type="checkbox"
                          checked={value.includes(opt.value)}
                          readOnly
                          className="mr-2"
                        />
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={name} className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">
                {label}
              </label>
              <textarea
                rows={rows || 3}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  multiline ? '' : 'resize-none'
                }`}
              />
            </div>
          );
        })}

        <div className="flex justify-end gap-3 mt-6">
          {activeStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm font-medium"
            >
              Back
            </button>
          )}
          {activeStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-medium"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-medium"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {successOpen && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-3 rounded shadow-lg z-50">
          Project Hosted Successfully!
          <button
            onClick={() => setSuccessOpen(false)}
            className="ml-4 font-bold text-white"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default StepForm;
