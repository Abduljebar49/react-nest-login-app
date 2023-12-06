import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SignUpSchema, { SignUpModel } from "../schema/SignUpSchema";
import useComponent from "../hooks/useComponent";

const SignUpPage = () => {
  const {
    isLoading,
    error,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    sumbitData,
  } = useComponent();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpModel>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (values: FieldValues) => {
    const data: SignUpModel = {
      password: values.password,
      email: values.email,
      name: values.name,
      confirmPassword: values.password,
    };
    sumbitData<SignUpModel>("/auth/signup", data, "/");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl font-bold mb-8">Sign up</h1>
          <p className="my-3 text-orange-500">{error.length > 0 && error}</p>
          <form onSubmit={handleSubmit(onSubmit)} id="form">
            <div className="relative z-0 w-full mb-5">
              <input
                {...register("name")}
                type="text"
                id="name"
                placeholder="Enter name"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                {...register("email")}
                type="email"
                name="email"
                placeholder="Enter email address"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <div
                className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </div>
            </div>
            <div className="relative z-0 w-full mb-5">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
              <div
                className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </div>
            </div>
            <div className="flex w-full justify-end my-4 text-base">
              Already have an account &nbsp;
              <Link to="/login" className="text-right text-blue-400">
                login
              </Link>
            </div>
            <button
              id="button"
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
