export function SplitHeroTitle({ name }: { name: string }) {
  const space = name.lastIndexOf(" ");
  if (space === -1) return name;

  return (
    <>
      {name.slice(0, space)}
      <br />
      <span className="f-display-it" style={{ color: "var(--cargo)" }}>
        {name.slice(space + 1)}
      </span>
    </>
  );
}
