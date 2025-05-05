import { Image, X } from "lucide-react";

export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 3,
  accept,
  imagePreview,
  removeImage,
}) {
  return (
    <div>
      {type === "file" ? (
        <>
          {imagePreview ? (
            <div className="relative w-fit rounded-2xl">
              <img
                src={imagePreview}
                alt="preview"
                className="max-h-50 overflow-hidden rounded-2xl object-contain"
              />
              <X
                onClick={removeImage}
                className="absolute top-1 right-1 cursor-pointer text-gray-500 hover:text-red-500"
              />
            </div>
          ) : (
            <label htmlFor="image" className="inline-block w-fit">
              <span className="cursor-pointer text-sm text-gray-500 hover:text-blue-500">
                <Image />
              </span>
            </label>
          )}
          <input
            type={type}
            id={name}
            name={name}
            onChange={onChange}
            accept={accept}
            // onChange={(e) =>
            //   setFormData((prev) => ({
            //     ...prev,
            //     image: e.target.files[0],
            //   }))
            // }
            className="hidden"
          />
        </>
      ) : (
        <>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              className="mt-1 w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={placeholder}
              required={required}
              rows={rows}
            ></textarea>
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder={placeholder}
              required={required}
            />
          )}
        </>
      )}
    </div>
  );
}
