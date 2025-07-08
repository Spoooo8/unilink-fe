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

    if (currentValue.some((v) => v.value === val.value)) {
      setter(currentValue.filter((v) => v.value !== val.value));
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

  const isCurrentStepValid = () => {
    return fieldsPerStep[activeStep].every((field) => {
      const value = values[field.name];
      if (field.type === 'multiselect') {
        return Array.isArray(value) && value.length > 0;
      }
      return value !== '' && value !== null && value !== undefined;
    });
  };

  const handleNext = () => {
    if (isCurrentStepValid()) {
      setActiveStep((prev) => prev + 1);
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <div className="min-h-[95vh] flex flex-col items-center justify-center bg-white p-12 rounded-lg shadow-lg">
      {/* Stepper */}
      <div className="flex justify-between mb-10 w-[900px] max-w-lg">
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

      <form onSubmit={onSubmit} className="flex flex-col items-center w-full">
        {fieldsPerStep[activeStep].map((field) => {
          const { name, label, options = [], placeholder } = field;
          const value = values[name] || [];
          const setter = getSetter(name);
          if (!setter) return null;

          // Multiselect Dropdown
          if (field.type === 'multiselect') {
            const isOpen = dropdownStates[name] || false;

            return (
              <div key={name} className="mb-5 relative w-full max-w-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  {label}
                </label>
                <div
                  onClick={() => toggleDropdown(name)}
                  className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {value.length > 0 ? value.map((v) => v.label).join(', ') : 'Select options'}
                </div>

                {isOpen && (
                  <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow z-10 max-h-60 overflow-y-auto">
                    {options.map((opt) => (
                      <div
                        key={opt.value}
                        className={`px-4 py-2 hover:bg-indigo-100 cursor-pointer ${value.some((v) => v.value === opt.value) ? 'bg-indigo-50' : ''}`}
                        onClick={() => toggleMultiOption(name, opt)}
                      >
                        <input
                          type="checkbox"
                          checked={value.some((v) => v.value === opt.value)}
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

          // Textarea for Description
          if (name === 'description') {
            return (
              <div key={name} className="mb-5 w-full max-w-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  {label}
                </label>
                <textarea
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            );
          }

          // Select Dropdown
          if (field.type === 'select') {
            return (
              <div key={name} className="mb-5 w-full max-w-lg">
                <label className="block text-gray-700 font-medium mb-2">
                  {label}
                </label>
                <select
                  name={name}
                  value={value}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" disabled>Select {label}</option>
                  {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          // All other fields as Input Text
          return (
            <div key={name} className="mb-5 w-full max-w-lg">
              <label className="block text-gray-700 font-medium mb-2">
                {label}
              </label>
              <input
                type={field.type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          );
        })}

        <div className="flex justify-end gap-3 mt-6 w-full max-w-lg">
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
              disabled={!isCurrentStepValid()}
              className={`px-6 py-2 rounded text-sm font-medium ${isCurrentStepValid() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isCurrentStepValid()}
              className={`px-6 py-2 rounded text-sm font-medium ${isCurrentStepValid() ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
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
