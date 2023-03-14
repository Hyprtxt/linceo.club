import { useEffect, useRef } from "preact/hooks"
import { useSignal } from "@preact/signals"

const BatteryInfo = (_props) => {
  const active = useSignal(false)
  const charging = useSignal(false)
  const level = useSignal(0)
  const chargingTime = useSignal(0)
  const dischargingTime = useSignal(0)

  useEffect(() => {
    if (navigator.getBattery) {
      active.value = true
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
          chargingTime.value = battery.chargingTime
        }

        battery.addEventListener("dischargingtimechange", () => {
          updateDischargingInfo()
        })
        function updateDischargingInfo() {
          console.log(
            `Battery discharging time: ${battery.dischargingTime} seconds`,
          )
          dischargingTime.value = battery.dischargingTime
        }
      })
    }
  }, [])
  return (
    <>
      {active.value === true
        ? (
          <>
            <p>Battery Charging: {charging.value ? "Yes" : "No"}</p>
            <p>Battery Level: {level.value * 100}%</p>
            <p>Charging Time: {chargingTime.value} seconds</p>
            <p>Discharging Time: {dischargingTime.value} seconds</p>
          </>
        )
        : (
          <>
            <p>Battery API not available 🥲</p>
            <p></p>
            <p></p>
            <p></p>
          </>
        )}
    </>
  )
}

export default BatteryInfo
