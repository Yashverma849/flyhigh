export type ThemePalette = {
  ink: string;
  ink2: string;
  ink3: string;
  bone: string;
  cargo: string;
  brass: string;
  ash: string;
  rust: string;
  sage: string;
  line: string;
  lineSubtle: string;
  axisStroke: string;
  gridStroke: string;
};

const light: ThemePalette = {
  ink: "#FAF8F5",
  ink2: "#F5F2EC",
  ink3: "#EAE3D8",
  bone: "#1C1814",
  cargo: "#C85A17",
  brass: "#8E754C",
  ash: "#665E54",
  rust: "#963E1B",
  sage: "#566C57",
  line: "rgba(28,24,20,0.08)",
  lineSubtle: "rgba(28,24,20,0.04)",
  axisStroke: "rgba(28,24,20,0.55)",
  gridStroke: "rgba(28,24,20,0.08)",
};

export function useThemePalette(): ThemePalette {
  return light;
}

