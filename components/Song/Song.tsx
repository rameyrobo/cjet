export default function Song() {
  return (
    <iframe
      data-testid="embed-iframe"
      style={{ borderRadius: 12 }}
      src="https://open.spotify.com/embed/album/7kUuNjLxJYEtUNm0KdrDBv?utm_source=generator"
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}