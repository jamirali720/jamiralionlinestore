

const NotFound = () => {
    return (
      <div className="w-full h-full flex justify-center justify-items-center">
        <div className="md:h-[80vh] flex justify-center justify-items-center">
          <div className="w-full h-full  content-center ">
            <h1 className="text-red-600 text-3xl font-medium">Oops! Route Not Found or Invalid Route!</h1>
          </div>
        </div>
      </div>
    );
};

export default NotFound;