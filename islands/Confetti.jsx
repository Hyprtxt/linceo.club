import { useEffect } from "preact/hooks"
import { tsParticles } from "https://cdn.jsdelivr.net/npm/tsparticles-engine/+esm"
import { loadFull } from "https://cdn.jsdelivr.net/npm/tsparticles/+esm"
import TWindConfig from "@/utils/twind.config.ts"

async function loadParticles(options) {
  await loadFull(tsParticles)
  await tsParticles.load(options)
}

const configs = [
  {
    fullScreen: {
      enable: true,
      zIndex: 100,
    },
    particles: {
      color: {
        value: [
          TWindConfig.theme.colors.violet,
        ],
        animation: {
          enable: true,
          speed: 30,
        },
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          default: "out",
        },
        size: true,
        speed: {
          min: 1,
          max: 3,
        },
      },
      number: {
        value: 400,
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: 1,
        animation: {
          enable: false,
          startValue: "max",
          destroy: "min",
          speed: 0.3,
          sync: true,
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        move: true,
        animation: {
          enable: true,
          speed: 60,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
      },
      shape: {
        type: ["square"],
      },
      size: {
        value: {
          min: 3,
          max: 5,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 30,
        },
        enlighten: {
          enable: true,
          value: 30,
        },
        enable: true,
        speed: {
          min: 15,
          max: 25,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -15,
          max: 15,
        },
      },
    },
  },
]

export default function Confetti(props) {
  useEffect(() => {
    loadParticles(configs)
  }, [])
  return <div id="tsparticles"></div>
}
