import { useEffect, useRef } from "preact/hooks"
import { useSignal } from "@preact/signals"

const BatteryInfo = (_props) => {
  // const batteryData = useSignal({
  //   charging: false,
  //   level: 0,
  //   chargingTime: 0,
  //   dischargingTime: 0,
  // })
  const charging = useSignal(false)
  const level = useSignal(0)
  const chargingTime = useSignal(0)
  const dischargingTime = useSignal(0)

  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        function updateAllBatteryInfo() {
          updateChargeInfo()
          updateLevelInfo()
          updateChargingInfo()
          updateDischargingInfo()
        }
        updateAllBatteryInfo()

        battery.addEventListener("chargingchange", () => {
          updateChargeInfo()
        })
        function updateChargeInfo() {
          console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`)
          charging.value = battery.charging
        }

        battery.addEventListener("levelchange", () => {
          updateLevelInfo()
        })
        function updateLevelInfo() {
          console.log(`Battery level: ${battery.level * 100}%`)
          level.value = battery.level
        }

        battery.addEventListener("chargingtimechange", () => {
          updateChargingInfo()
        })
        function updateChargingInfo() {
          console.log(`Battery charging time: ${battery.chargingTime} seconds`)
          chargingTime.level = battery.chargingTime
        }

        battery.addEventListener("dischargingtimechange", () => {
          updateDischargingInfo()
        })
        function updateDischargingInfo() {
          console.log(
            `Battery discharging time: ${battery.dischargingTime} seconds`,
          )
          dischargingTime.level = battery.dischargingTime
        }
      })
    }
  }, [])
  return <>
    <p>Battery Charging: {charging.value ? "Yes" : "No"}</p>
    <p>Battery Level: {level.value * 100}%</p>
  </>
  // <pre>{JSON.stringify(charging.value, null, 2)}</pre>
}

export default BatteryInfo
