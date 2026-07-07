type Props = {
  fromCity: string;
  toCity: string;
};

export function RouteHeroTitle({ fromCity, toCity }: Props) {
  return (
    <>
      {fromCity}{" "}
      <span className="f-display-it" style={{ color: "var(--cargo)" }}>
        →
      </span>
      <br />
      {toCity}
    </>
  );
}
