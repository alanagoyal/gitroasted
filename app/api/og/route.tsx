import { ImageResponse } from 'next/og';
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          color: 'white',
          background: 'black',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          🔥 GitRoasted
        </div>
        <div style={{
          fontSize: 24,
          color: '#9CA3AF',
          position: 'absolute',
          bottom: 40,
        }}>
          built by basecase 🤝🏼 powered by browserbase
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}