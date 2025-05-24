function Wrapper({ children, className }) {
  return (
    <main
      className={`${className ? className : ""} mx-auto max-w-5xl flex-1 space-y-6 p-4`}
    >
      {children}
    </main>
  );
}

export default Wrapper;
