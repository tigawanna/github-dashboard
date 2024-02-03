import { ErrorBoundary, Redirect, useLocation } from "rakkasjs";

interface ViewerErrorBoundaryComponentProps {
  children: React.ReactNode;
}

export default function ViewerErrorBoundaryComponent({children}: ViewerErrorBoundaryComponentProps) {
  const {current} = useLocation()
  return (
    <ErrorBoundary
      fallbackRender={({
        error,
        resetErrorBoundary,
      }: { error: Error;
    resetErrorBoundary: () => void;
      }) => {
        const url = new URL("/auth", current)
        return <Redirect href={url.toString()} />
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


interface MIssingTokenErrorBoundaryComponentProps {

}

export function MIssingTokenErrorBoundaryComponent({}:MIssingTokenErrorBoundaryComponentProps){
return (
 <div className='w-full h-full flex items-center justify-center'>

 </div>
);
}