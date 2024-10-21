import { SpinWheelV2 } from "../components/SpinWheelV2";
const winSound = new Audio('/sounds/win.mp3')

export function Test() {
    return (
        <div>
            <SpinWheelV2 confetti={() => winSound.play()} fetchBoolean={true} />
        </div>
    )
}