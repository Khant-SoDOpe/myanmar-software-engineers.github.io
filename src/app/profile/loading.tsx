const loading = () => {
  return (
    <div className="text-center py-20">
      <div className="inline-block w-8 h-8 border-2 border-prism-violet/30 border-t-prism-violet rounded-full animate-spin" />
      <p className="mt-4 text-sm text-zinc-500 font-display">Loading profiles...</p>
    </div>
  );
};
export default loading;
