// @ts-ignore
import image from './test.jpeg';

export default function ClipPath() {
  return (
    <div style={{position: 'relative'}}>
      <div
        id="svg-resources"
        style={{height: 0, width: 0, overflow: 'hidden', position: 'absolute'}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{position: 'absolute', width: 0, height: 0}}
          id="avatar_rich_svg_graphics_wrapper"
        >
          <defs>
            <clipPath id="svg_clip" clipPathUnits="objectBoundingBox">
              <path d="M 0.316 0.0391 A 0.1164 0.1164 90 0 1 0.4285 0.0089 l 0.3784 0.1014 a 0.1164 0.1164 90 0 1 0.0823 0.0823 l 0.1014 0.3784 a 0.1164 0.1164 90 0 1 -0.0302 0.1125 L 0.6836 0.9605 a 0.1164 0.1164 90 0 1 -0.1125 0.0302 l -0.3784 -0.1014 a 0.1164 0.1164 90 0 1 -0.0823 -0.0823 L 0.0089 0.4285 a 0.1164 0.1164 90 0 1 0.0302 -0.1125 L 0.316 0.0391 Z"></path>
            </clipPath>
            <linearGradient id="underlay_fill" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2EE6A8" />
              <stop offset="0.34375" stop-color="#3399FF" />
              <stop offset="0.692708" stop-color="#9933FF" />
              <stop offset="1" stop-color="#FF3399" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="216"
      >
        <path
          d="M 15.0864 1.656 A 5.6496 5.6496 90 0 1 20.544 0.192 l 18.3504 4.9152 a 5.6496 5.6496 90 0 1 3.9936 3.9936 l 4.9152 18.3504 a 5.6496 5.6496 90 0 1 -1.464 5.4576 L 32.9136 46.344 a 5.6496 5.6496 90 0 1 -5.4576 1.464 l -18.3504 -4.9152 a 5.6496 5.6496 90 0 1 -3.9936 -3.9936 L 0.192 20.544 a 5.6496 5.6496 90 0 1 1.464 -5.4576 L 15.0864 1.656 Z"
          fill="url(#underlay_fill)"
        />
      </svg>

      <img
        src={image}
        width={200}
        height={200}
        style={{
          position: 'absolute',
          left: '8px',
          top: '8px',
          clipPath: `url(#svg_clip)`,
          objectFit: 'cover',
          objectPosition: 'left',
        }}
      />
    </div>
  );
}