import { useState, useEffect } from 'react';
import useDeleteCategory from '../../../../features/category/hooks/useDeleteCategory';

const DeleteCategoryButton = ({ categoryId }: { categoryId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useDeleteCategory(categoryId);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const handleDelete = () => {
    mutate(categoryId);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg border cursor-pointer border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-100"
      >
        Delete
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-2xl text-center font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h2>
            <p className="mb-6 text-base text-center font-medium text-neutral-600 sm:text-lg">
              Are you sure you want to delete this category?
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer px-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="cursor-pointer px-3 rounded-lg border bg-red-500 border-gray-100 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-red-600"
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteCategoryButton;
