import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="h-screen fixed inset-0 z-50 backdrop-blur-md bg-black/10 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
