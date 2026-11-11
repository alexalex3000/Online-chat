export function generateAvatar(name: string, bgColor = "#4C8EEB"): string {
    const initials = name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U";

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
      <circle cx="64" cy="64" r="64" fill="${bgColor}"/>
      <text 
        x="50%" 
        y="50%" 
        alignment-baseline="central" 
        dominant-baseline="central" 
        text-anchor="middle" 
        fill="#FFFFFF" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-size="48" 
        font-weight="700"
      >
        ${initials}
      </text>
    </svg>
  `.trim();

    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}