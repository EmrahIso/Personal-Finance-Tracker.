import { Link } from 'react-router-dom';

import useGetCategories from '../../features/category/hooks/useGetCategories';

import DeleteCategoryButton from './forms/category/DeleteCategoryButton';

import PageLoader from '../ui/PageLoader';

const MAX_CATEGORIES = 30;

import { Plus } from 'lucide-react';

const ManageCategories = () => {
  const { categories, isError, isLoading } = useGetCategories();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-stone-50 p-6 font-noto text-neutral-900 sm:p-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-8 shadow-sm shadow-stone-200/60">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            categories
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Manage categories
          </h1>
          <p className="mt-3 text-base text-neutral-600">
            Add, edit, or review your categories.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
            <div className="divide-y divide-stone-200">
              <p className="text-xl px-4 py-1.5 text-red-600">
                Failed to load categories.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 p-6 font-noto text-neutral-900 sm:p-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-8 shadow-sm shadow-stone-200/60">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
          Categories
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Manage categories
        </h1>
        <p className="mt-3 text-base text-neutral-600">
          Organize your categories to keep reporting clear.
        </p>

        <div className="mt-3">
          <span className="text-neutral-500 font-semibold uppercase pl-3">
            {categories?.length} / {MAX_CATEGORIES}
          </span>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
          <div className="hidden grid-cols-[1.5fr_1fr_auto] items-center gap-4 border-b border-stone-200 bg-stone-100 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 sm:grid">
            <span>category</span>
            <span>type</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-stone-200">
            {categories?.map((category) => (
              <div
                key={category.id}
                className="grid gap-3 px-4 py-4 sm:grid-cols-[1.8fr_1fr_auto] sm:items-center sm:gap-4 sm:px-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-sm font-semibold text-white">
                    {category.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {category.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Personal category
                    </p>
                  </div>
                </div>

                <div
                  className={
                    category.type === 'INCOME'
                      ? `text-green-600`
                      : `text-red-600` +
                        ` text-base font-medium uppercase sm:text-left`
                  }
                >
                  {category.type}
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <a
                    href={'/edit-category/' + category.id}
                    className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-stone-100"
                  >
                    Edit
                  </a>
                  <DeleteCategoryButton categoryId={category.id} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Back to dashboard
          </Link>

          <a
            href="/category"
            className="inline-flex items-center gap-2 justify-center px-4 py-2.5 text-sm font-medium rounded-xl border border-stone-200 bg-stone-50  text-neutral-900 transition hover:bg-stone-100"
          >
            <Plus size={17} />
            Add category
          </a>
        </div>
      </div>
    </main>
  );
};

export default ManageCategories;
