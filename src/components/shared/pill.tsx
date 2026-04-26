type Kind = "default" | "cargo" | "brass" | "sage";

type Props = {
  children: React.ReactNode;
  kind?: Kind;
};

const classes: Record<Kind, string> = {
  default: "chip",
  cargo: "chip chip-cargo",
  brass: "chip chip-brass",
  sage: "chip chip-sage",
};

export function Pill({ children, kind = "default" }: Props) {
  return <span className={classes[kind]}>{children}</span>;
}
