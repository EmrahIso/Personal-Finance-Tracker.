import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import usePostCategory from '../../../../features/category/hooks/usePostCategory';

import {
  categorySchema,
  type CategoryDataType,
} from '../../../../features/category/schemas/category';

import { zodResolver } from '@hookform/resolvers/zod';

const AddCategory = () => {
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

  const { mutate, isPending } = usePostCategory(setError);

  const onSubmit = (data: CategoryDataType) => {
    mutate(data);
  };

  return (
    <main className="min-h-screen flex">
      <article className="bg-transparent flex-1 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-5">
          Create Category
        </h2>
        <p className="text-neutral-500 mb-8 tracking-wide text-center text-base font-medium">
          A category represents what you spent your money on, <br /> such as
          food, transport, shopping, or entertainment.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-4 items-stretch"
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoryName"
              className="tracking-wide flex items-center gap-1.5 text-sm text-gray-500"
            >
              Name <span className="text-[10px]">(required)</span>
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="e.g. Food, Transport ..."
              aria-invalid={Boolean(errors.categoryName)}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-[invalid=true]:border-red-500"
              {...register('categoryName')}
            />
            {errors.categoryName && (
              <p
                id="accountName-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.categoryName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="categoryType"
              className="tracking-wide flex items-center gap-1.5 text-sm text-gray-500"
            >
              Type <span className="text-[10px]">(required)</span>
            </label>
            <select
              id="categoryType"
              aria-invalid={Boolean(errors.categoryType)}
              className="border w-82.5 bg-white border-neutral-300 py-2 px-2.5 rounded-md aria-[invalid=true]:border-red-500"
              defaultValue=""
              {...register('categoryType')}
            >
              <option value="" disabled>
                Select category type
              </option>
              <option value="INCOME">INCOME</option>
              <option value="EXPENSE">EXPENSE</option>
            </select>
            {errors.categoryType && (
              <p
                id="categoryType-error"
                role="alert"
                className="text-sm text-red-600"
              >
                {errors.categoryType.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer text-base font-medium w-full py-2 rounded-lg bg-neutral-900 text-white hover:shadow-lg transition"
            >
              {isPending ? 'Creating category...' : 'Create category'}
            </button>
          </div>
          <div className="flex items-center gap-3 my-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="flex items-center justify-center ">
            <Link
              to="/dashboard"
              className="underline underline-offset-3 text-sm text-neutral-600 "
            >
              Back to Dashboard
            </Link>
          </div>
        </form>
      </article>
    </main>
  );
};

export default AddCategory;
