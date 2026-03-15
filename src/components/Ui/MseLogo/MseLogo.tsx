import MseLink from "../MseLink/MseLink";

const MseLogo = () => {
  return (
    <MseLink href="/">
      <span className="font-display font-bold text-xl bg-prism-gradient bg-clip-text text-transparent">
        MM
      </span>
      <span className="font-mono text-base text-zinc-300">
        SWE.com
      </span>
    </MseLink>
  );
};
export default MseLogo;
