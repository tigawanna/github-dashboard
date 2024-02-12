import { hotToast } from "@/components/wrappers/toast";
import { ErrorBoundary, Redirect, useLocation, Link, navigate } from "rakkasjs";

interface ViewerErrorBoundaryComponentProps {
  children: React.ReactNode;
}

export default function ViewerErrorBoundaryComponent({
  children,
}: ViewerErrorBoundaryComponentProps) {
  const { current, rendered } = useLocation();
  return (
    <ErrorBoundary
      fallbackRender={({
        error,
        resetErrorBoundary,
      }: {
        error: Error;
        resetErrorBoundary: () => void;
      }) => {
        console.log("err in viewer error boundary  === ",error)
        // if(error.message){
        //   hotToast({
        //     title: "Error",
        //     type:"error",
        //     description: error.message
        //   })
        // }
        if (
          error.message &&
          error.message.includes(
            "Could not resolve to a User with the login of",
          )
        ) {
          //  resetErrorBoundary();
          // console.log(" ===  current url  ==== ", current);
          // console.log(" === rendered url  ==== ", rendered);
          // return <Redirect href={"/viewer"} />;
          // Splits the current URL pathname by "/" and removes the last segment, then joins the remaining segments with "/" to create a new URL.

          const url = current.pathname.split("/").slice(0, -1).join("/");
          navigate(url, { replace: true });
          // window.location.href = url.toString();
          // history.back();
          return (
            <div className="w-full h-full  flex flex-col gap-5 justify-center items-center">
              <h1 className="text-2xl text-error">Something went wrong</h1>
            </div>
          );
        }
        return (
          <div className="w-full h-full  flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl text-error">Something went wrong</h1>

            <p className="p-5 text-error bg-error/10 rounded-lg">
              {error.message}
            </p>
            {/* {error.message==="MIssingToken"&&
            <div className="">

            </div>
            } */}
            <button
              className="btn btn-wide"
              onClick={() => {
                resetErrorBoundary();
              }}
            >
              Try again
            </button>
          </div>
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

interface MIssingTokenErrorBoundaryComponentProps {}

export function MIssingTokenErrorBoundaryComponent({}: MIssingTokenErrorBoundaryComponentProps) {
  return <div className="w-full h-full flex items-center justify-center"></div>;
}
