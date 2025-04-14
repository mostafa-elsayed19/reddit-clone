function Wrapper({ children, className }) {
  return (
    <main className={`mx-auto max-w-3xl space-y-6 p-4 ${className}`}>
      {children}
    </main>
  );
}

export default Wrapper;
