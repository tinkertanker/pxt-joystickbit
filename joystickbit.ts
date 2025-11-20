
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */




//% weight=0 color=#0fbc11  icon="\uf11b" block="Joystickbit"
namespace joystickbit {

    export enum JoystickBitPin {
        //% block="C"
        P12 = DAL.MICROBIT_ID_IO_P12,
        //% block="D"
        P13 = DAL.MICROBIT_ID_IO_P13,
        //% block="E"
        P14 = DAL.MICROBIT_ID_IO_P14,
        //% block="F"
        P15 = DAL.MICROBIT_ID_IO_P15
    }

    export enum rockerType {
        //% block="X"
        X,
        //% block="Y"
        Y
    }


    export enum ButtonType {
        //% block="pressed"
        down = PulseValue.High,
        //% block="released"
        up = PulseValue.Low
    }


    // 全局变量用于轮询检测
    let lastStableStates: { [key: number]: boolean } = {};
    let currentStates: { [key: number]: boolean } = {};
    let debounceCounters: { [key: number]: number } = {};
    let buttonHandlers: { [key: string]: Action } = {};
    let pollingStarted = false;
    
    // 防抖参数
    const DEBOUNCE_THRESHOLD = 3; // 连续检测到相同状态的次数
    const POLL_INTERVAL = 10; // 轮询间隔(ms)
    

    /**
    * initialization joystick:bit
    */
    //% blockId=initJoystickBit block="initialization joystick:bit"
    export function initJoystickBit(): void {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.setPull(DigitalPin.P12, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        pins.digitalWritePin(DigitalPin.P16, 1)

        // 初始化按钮状态
        const buttons = [DigitalPin.P12, DigitalPin.P13, DigitalPin.P14, DigitalPin.P15];
        for (let button of buttons) {
            lastStableStates[button] = (pins.digitalReadPin(<number>button) == 0);
            currentStates[button] = lastStableStates[button];
            debounceCounters[button] = 0;
        }
    }


    /**
    * 开始轮询检测
    */
    function startPolling(): void {
        if (pollingStarted) return;
        pollingStarted = true;
        
        control.inBackground(() => {
            while (true) {
                pollButtons();
                basic.pause(POLL_INTERVAL);
            }
        });
    }

    /**
    * 轮询检测按钮状态
    */
    function pollButtons(): void {
        const buttons = [DigitalPin.P12, DigitalPin.P13, DigitalPin.P14, DigitalPin.P15];
        
        for (let button of buttons) {
            // 读取当前物理状态
            const physicalState = (pins.digitalReadPin(<number>button) == 0);
            
            // 更新当前状态
            currentStates[button] = physicalState;
            
            // 检查状态是否与稳定状态不同
            if (physicalState !== lastStableStates[button]) {
                // 状态可能变化，增加计数器
                debounceCounters[button]++;
                
                // 如果连续多次检测到新状态，确认状态变化
                if (debounceCounters[button] >= DEBOUNCE_THRESHOLD) {
                    // 确认状态变化
                    const oldStableState = lastStableStates[button];
                    lastStableStates[button] = physicalState;
                    debounceCounters[button] = 0;
                    
                    // 触发相应的事件
                    const eventType = physicalState ? ButtonType.down : ButtonType.up;
                    const key = `${button}_${eventType}`;
                    const handler = buttonHandlers[key];
                    if (handler) {
                        // 将handler放入后台队列执行，不阻塞当前轮询
                        control.inBackground(() => {
                            handler(); // 这个handler会在后台按顺序执行
                        });
                    }
                }
            } else {
                // 状态与稳定状态相同，重置计数器
                debounceCounters[button] = 0;
            }
        }
    }




    /**
    * get Button
    */
    //% blockId=getButton block="button %button is pressed"
    export function getButton(button: JoystickBitPin): boolean {
        return (pins.digitalReadPin(<number>button) == 0 ? true : false)
        // return lastStableStates[<number>button]; // 返回稳定状态
    }


    /**
    * Registers code to run when a joystick:bit event is detected.
    */
    //% blockId=onButtonEvent block="on button %button|is %event" blockExternalInputs=false
    export function onButtonEvent(button: JoystickBitPin, event: ButtonType, handler: Action): void {
        const key = `${button}_${event}`;
        buttonHandlers[key] = handler;
        
        // 确保轮询开始
        startPolling();
    }
    


    /**
    * Reads rocker value for the defined axis.
    * @param rocker rocker axis to read
    */
    //% blockId=getRockerValue block="rocker value of %rocker"
    export function getRockerValue(rocker: rockerType): number {
        switch (rocker) {
            case rockerType.X: return pins.analogReadPin(AnalogPin.P1);
            case rockerType.Y: return pins.analogReadPin(AnalogPin.P2);
            default: return 0;
        }
    }




    /**
    * vibration motor
    * @param time describe parameter here, eg: 100
    */
    //% blockId=Vibration_Motor block="motor vibrate for %time ms"
    export function Vibration_Motor(time: number): void {
        pins.digitalWritePin(DigitalPin.P16, 0)
        basic.pause(time)
        pins.digitalWritePin(DigitalPin.P16, 1)
    }










}
 
