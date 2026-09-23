import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import {
  type CategoryDataType,
  categorySchema,
} from '../../../../features/category/schemas/category';

import useGetCategory from '../../../../features/category/hooks/useGetCategory';
import usePatchCategory from '../../../../features/category/hooks/usePatchCategory';

import PageLoader from '../../../ui/PageLoader';

const EditCategory = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryDataType>({
    resolver: zodResolver(categorySchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { id } = useParams();

  const { category, isLoading, isError } = useGetCategory({
    categoryId: id || '',
  });

  const { mutate, isPending } = usePatchCategory({
    setError,
    categoryId: id || '',
  });

  const onSubmit = (data: CategoryDataType) => {
    mutate({ categoryData: data, categoryId: id || '' });
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4">
        <div className="mt-8 p-6 flex flex-col items-center overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            categories
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Edit category
          </h1>

          <div className="divide-y mt-8 divide-stone-200">
            <p className="text-xl px-4 py-1.5 text-red-600">
              Failed to load category.
            </p>
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
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <h2 className="mb-6 text-2xl font-semibold text-neutral-900">
          Edit Category
        </h2>

        <div className="mb-5 flex flex-col gap-2">
          <label
            htmlFor="categoryName"
            className="text-sm font-medium text-neutral-700"
          >
            Name
          </label>
          <input
            id="categoryName"
            type="text"
            defaultValue={category?.name}
            placeholder="Enter category name"
            aria-invalid={Boolean(errors.categoryName)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition focus:border-neutral-500 aria-[invalid=true]:border-red-500"
            {...register('categoryName')}
          />
          {errors.categoryName && (
            <p className="text-sm text-red-600">
              {errors.categoryName.message}
            </p>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label
            htmlFor="categoryType"
            className="text-sm font-medium text-neutral-700"
          >
            Type
          </label>
          <select
            id="categoryType"
            disabled
            defaultValue={category?.type === 'INCOME' ? 'INCOME' : 'EXPENSE'}
            className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm text-neutral-500 line-through opacity-70 cursor-not-allowed"
            {...register('categoryType')}
          >
            <option value="INCOME">INCOME</option>
            <option value="EXPENSE">EXPENSE</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          {isPending ? 'Saving changes ...' : 'Save changes'}
        </button>
      </form>
    </main>
  );
};

export default EditCategory;
